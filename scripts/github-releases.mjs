import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

/**
 * 从 Changesets 维护的包级更新日志中读取版本标题。
 * 即使 main 已有新提交，后续发布仍可据此补齐历史版本缺失的标签和 GitHub Release。
 * 没有更新日志的包尚未接入此流程，直接跳过。
 */
export function getReleasePackages(cwd) {
  const packages = [];
  for (const entry of fs.readdirSync(path.join(cwd, 'packages'), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const manifestPath = path.join(cwd, 'packages', entry.name, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const changelog = `packages/${entry.name}/CHANGELOG.md`;
    if (manifest.private || !fs.existsSync(path.join(cwd, changelog))) continue;

    const content = fs.readFileSync(path.join(cwd, changelog), 'utf8');
    const versions = [...content.matchAll(/^## (\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?)\r?$/gm)].map(
      (match) => match[1]
    );
    if (!versions.includes(manifest.version)) {
      throw new Error(`${changelog} is missing the entry for ${manifest.name}@${manifest.version}`);
    }

    packages.push({ name: manifest.name, version: manifest.version, versions, changelog });
  }
  return packages;
}

/**
 * 在 `changeset publish` 之后运行，以 npm 上的实际版本为准判断是否已发布。
 * 保留已有 GitHub Release，包括维护者手动编辑的说明。
 * 仅允许替换网络请求函数，测试可在本地仓库中验证真实的标签和推送操作，
 * 同时避免向外部服务执行实际发布。
 */
export async function syncGitHubReleases({
  cwd = process.cwd(),
  repository = process.env.GITHUB_REPOSITORY,
  token = process.env.GITHUB_TOKEN,
  apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com',
  serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com',
  fetchImpl = globalThis.fetch
} = {}) {
  if (!repository || !token) throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required.');

  const packages = getReleasePackages(cwd);
  if (!packages.length) return [];

  const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const github = async (resource, body) => {
    const method = body ? 'POST' : 'GET';
    const response = await fetchImpl(`${apiUrl}/repos/${repository}/${resource}`, {
      method,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30_000)
    });
    if (!response.ok) {
      throw new Error(`GitHub ${method} ${resource} failed (${response.status}): ${await response.text()}`);
    }
    return response.json();
  };

  // 每页只读取一次，避免每次推送都逐个查询所有历史版本。
  // 接口或身份验证失败必须上报，不能误判为发行记录不存在。
  const existingReleases = new Set();
  for (let page = 1; ; page += 1) {
    const releases = await github(`releases?per_page=100&page=${page}`);
    for (const release of releases) existingReleases.add(release.tag_name);
    if (releases.length < 100) break;
  }

  const localTags = new Set(git(['tag', '--list']).split(/\r?\n/));
  const created = [];
  for (const pkg of packages) {
    // 读取 npm 公共仓库时不携带 GitHub 凭据。
    // 历史更新日志中可能包含未成功发布到 npm 的版本，需核实后再处理。
    const response = await fetchImpl(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
      headers: { Accept: 'application/vnd.npm.install-v1+json' },
      signal: AbortSignal.timeout(30_000)
    });
    if (!response.ok) throw new Error(`npm metadata for ${pkg.name} failed (${response.status}).`);
    const metadata = await response.json();
    if (!metadata.versions?.[pkg.version]) {
      throw new Error(`${pkg.name}@${pkg.version} is not available on npm yet. Rerun the release workflow.`);
    }

    for (const version of pkg.versions) {
      const tag = `${pkg.name}@${version}`;
      if (!metadata.versions[version] || existingReleases.has(tag)) continue;

      if (!localTags.has(tag)) {
        // HEAD 可能已经包含其他版本或无关变更，因此要定位首次引入该版本标题的提交。
        // 补建已发布版本丢失的标签时，必须指向原始提交，避免将当前代码标记为旧版本。
        const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const commit = git([
          'log',
          '--format=%H',
          '--reverse',
          '-G',
          `^## ${escapedVersion}\r?$`,
          '--',
          pkg.changelog
        ]).split(/\r?\n/)[0];
        if (!commit) throw new Error(`Cannot find the changelog commit for ${tag}. Fetch the full Git history.`);
        git(['tag', '-a', tag, '-m', tag, commit]);
        localTags.add(tag);
      }

      const commit = git(['rev-parse', `refs/tags/${tag}^{commit}`]);
      // 只推送当前包的标签，不强制覆盖已有远程标签。
      // 出现冲突或推送失败时，必须在创建 GitHub Release 前停止。
      git(['push', 'origin', `refs/tags/${tag}`]);

      const anchor = version.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const changelogUrl = `${serverUrl}/${repository}/blob/${commit}/${pkg.changelog}#${anchor}`;
      const prerelease = /^\d+\.\d+\.\d+-/.test(version);
      await github('releases', {
        tag_name: tag,
        name: tag,
        body: `See the [changelog](${changelogUrl}) for details.`,
        draft: false,
        prerelease,
        // 补建历史版本时，不应覆盖最新发行版标记。
        make_latest: version === pkg.version && !prerelease ? 'true' : 'false'
      });
      existingReleases.add(tag);
      created.push(tag);
    }
  }
  return created;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncGitHubReleases()
    .then((created) => {
      console.log(
        created.length ? `Created GitHub Releases: ${created.join(', ')}` : 'GitHub Releases are up to date.'
      );
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
