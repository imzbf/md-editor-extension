import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { getReleasePackages, syncGitHubReleases } from './github-releases.mjs';

const PACKAGE_NAME = '@vavt/v3-extension';
const TAG = `${PACKAGE_NAME}@1.1.0`;
const OLD_TAG = `${PACKAGE_NAME}@1.0.0`;

/** 使用真实 Git 历史和本地裸仓库，验证重试后标签仍指向正确的提交。 */
function createFixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'github-releases-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const cwd = path.join(directory, 'checkout');
  const remote = path.join(directory, 'remote.git');
  fs.mkdirSync(cwd);
  const git = (args, gitCwd = cwd) =>
    execFileSync('git', args, { cwd: gitCwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const write = (filename, content) => {
    const fullPath = path.join(cwd, filename);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  };
  const commit = (message) => {
    git(['add', '.']);
    git(['commit', '-m', message]);
    return git(['rev-parse', 'HEAD']);
  };
  const setVersion = (version) => {
    write('packages/v3/package.json', JSON.stringify({ name: PACKAGE_NAME, version }));
  };

  git(['init', '--bare', remote]);
  git(['init', '--initial-branch=main']);
  git(['config', 'user.name', 'Release Test']);
  git(['config', 'user.email', 'release-test@example.com']);
  git(['config', 'commit.gpgSign', 'false']);
  git(['config', 'tag.gpgSign', 'false']);
  git(['remote', 'add', 'origin', remote]);
  setVersion('1.0.0');
  const firstChangelog = `# ${PACKAGE_NAME}\n\n## 1.0.0\n\n### Minor Changes\n\n- First release.\n`;
  write('packages/v3/CHANGELOG.md', firstChangelog);
  const firstCommit = commit('release 1.0.0');
  setVersion('1.1.0');
  write('packages/v3/CHANGELOG.md', firstChangelog.replace('## 1.0.0', '## 1.1.0\n\n- New feature.\n\n## 1.0.0'));
  const releaseCommit = commit('release 1.1.0');
  // 重试时 main 可能已有新提交；标签仍须指向原始发布提交，
  // 不能指向后续无关的文档变更。
  write('README.md', 'Updated after the release.\n');
  commit('update documentation');
  git(['push', 'origin', 'main']);

  return { cwd, remote, git, write, commit, setVersion, firstCommit, releaseCommit };
}

/** 仅模拟网络请求，不执行真实的 npm 发布或 GitHub 写入操作。 */
function createAPI({ versions = ['1.0.0', '1.1.0'], releases = [] } = {}) {
  const existing = [...releases];
  const created = [];
  const requests = [];
  const fetchImpl = async (url, options) => {
    requests.push(url);
    if (url.startsWith('https://registry.npmjs.org/')) {
      assert.equal(options.headers.Authorization, undefined);
      assert.equal(url, `https://registry.npmjs.org/${encodeURIComponent(PACKAGE_NAME)}`);
      return Response.json({ versions: Object.fromEntries(versions.map((version) => [version, {}])) });
    }

    assert.equal(options.headers.Authorization, 'Bearer test-token');
    if (options.method === 'POST') {
      assert.equal(url, 'https://api.github.com/repos/example/extensions/releases');
      const body = JSON.parse(options.body);
      assert.ok(!existing.some((release) => release.tag_name === body.tag_name), 'must not create duplicates');
      created.push(body);
      existing.push(body);
      return Response.json(body, { status: 201 });
    }

    const page = Number(new URL(url).searchParams.get('page'));
    return Response.json(existing.slice((page - 1) * 100, page * 100));
  };
  return { created, requests, fetchImpl };
}

function sync(fixture, api) {
  return syncGitHubReleases({
    cwd: fixture.cwd,
    repository: 'example/extensions',
    token: 'test-token',
    apiUrl: 'https://api.github.com',
    serverUrl: 'https://github.com',
    fetchImpl: api.fetchImpl
  });
}

test('only reads public packages with Changesets changelogs', (t) => {
  const fixture = createFixture(t);
  fixture.write('packages/data/package.json', JSON.stringify({ name: '@vavt/data', version: '0.0.0', private: true }));
  fixture.write('packages/data/CHANGELOG.md', '## 0.0.0\n');
  fixture.write('packages/common/package.json', JSON.stringify({ name: '@vavt/cm-extension', version: '1.0.0' }));
  fixture.write('packages/documentation/README.md', 'No package here.');

  assert.deepEqual(getReleasePackages(fixture.cwd), [
    { name: PACKAGE_NAME, version: '1.1.0', versions: ['1.1.0', '1.0.0'], changelog: 'packages/v3/CHANGELOG.md' }
  ]);
  fixture.setVersion('2.0.0');
  assert.throws(() => getReleasePackages(fixture.cwd), /missing the entry.*2\.0\.0/);
});

test('does nothing before any package has a Changesets changelog', async (t) => {
  const fixture = createFixture(t);
  fs.unlinkSync(path.join(fixture.cwd, 'packages/v3/CHANGELOG.md'));
  const api = createAPI();
  assert.deepEqual(await sync(fixture, api), []);
  assert.deepEqual(api.requests, []);
});

test('pushes package tags and links each Release to its own changelog commit', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI();
  // Changesets 会为刚发布的包创建本地标签，此处验证该标签可以直接复用。
  fixture.git(['tag', '-a', TAG, '-m', TAG, fixture.releaseCommit]);
  const originalTag = fixture.git(['rev-parse', `refs/tags/${TAG}`]);

  assert.deepEqual(await sync(fixture, api), [TAG, OLD_TAG]);
  assert.equal(fixture.git(['rev-parse', `refs/tags/${TAG}`], fixture.remote), originalTag);
  for (const [index, commit, anchor] of [
    [0, fixture.releaseCommit, '110'],
    [1, fixture.firstCommit, '100']
  ]) {
    const release = api.created[index];
    assert.equal(fixture.git(['rev-parse', `${release.tag_name}^{commit}`], fixture.remote), commit);
    assert.equal(release.name, release.tag_name);
    assert.equal(
      release.body,
      `See the [changelog](https://github.com/example/extensions/blob/${commit}/packages/v3/CHANGELOG.md#${anchor}) for details.`
    );
    assert.equal(release.draft, false);
    assert.equal(release.prerelease, false);
  }
  assert.equal(api.created[0].make_latest, 'true');
  assert.equal(api.created[1].make_latest, 'false');
});

test('recovers a partial GitHub failure and preserves existing Release notes on reruns', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI();
  const fetchImpl = api.fetchImpl;
  api.fetchImpl = async (url, options) => {
    if (options.method === 'POST' && JSON.parse(options.body).tag_name === OLD_TAG) {
      return new Response('Temporary failure', { status: 503 });
    }
    return fetchImpl(url, options);
  };
  await assert.rejects(sync(fixture, api), /GitHub POST releases failed \(503\)/);
  assert.equal(fixture.git(['rev-parse', `${OLD_TAG}^{commit}`], fixture.remote), fixture.firstCommit);

  api.created[0].body = 'Maintainer-edited notes.';
  api.fetchImpl = fetchImpl;
  assert.deepEqual(await sync(fixture, api), [OLD_TAG]);
  assert.deepEqual(await sync(fixture, api), []);
  assert.equal(api.created[0].body, 'Maintainer-edited notes.');
  assert.equal(api.created.length, 2);
});

test('a failed tag push stops Release creation and can be retried', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI();
  fixture.git(['remote', 'set-url', 'origin', path.join(fixture.cwd, 'missing-remote.git')]);
  await assert.rejects(sync(fixture, api), /git push/);
  assert.deepEqual(api.created, []);

  fixture.git(['remote', 'set-url', 'origin', fixture.remote]);
  assert.deepEqual(await sync(fixture, api), [TAG, OLD_TAG]);
});

test('does not tag or announce older versions that never reached npm', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI({ versions: ['1.1.0'] });
  assert.deepEqual(await sync(fixture, api), [TAG]);
  assert.equal(fixture.git(['tag', '--list'], fixture.remote), TAG);
});

test('requires the current package version to be available on npm', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI({ versions: ['1.0.0'] });
  await assert.rejects(sync(fixture, api), /1\.1\.0 is not available on npm yet/);
  assert.equal(fixture.git(['tag', '--list'], fixture.remote), '');
  assert.deepEqual(api.created, []);
});

test('fails visibly on GitHub authorization errors before mutating tags', async (t) => {
  const fixture = createFixture(t);
  await assert.rejects(
    sync(fixture, { fetchImpl: async () => new Response('Forbidden', { status: 403 }) }),
    /GitHub GET .* failed \(403\)/
  );
  assert.equal(fixture.git(['tag', '--list']), '');
});

test('does not treat a registry outage as successful publication', async (t) => {
  const fixture = createFixture(t);
  const api = createAPI();
  const fetchImpl = api.fetchImpl;
  api.fetchImpl = (url, options) =>
    url.startsWith('https://registry.npmjs.org/')
      ? Promise.resolve(new Response('Unavailable', { status: 503 }))
      : fetchImpl(url, options);
  await assert.rejects(sync(fixture, api), /npm metadata .* failed \(503\)/);
  assert.equal(fixture.git(['tag', '--list']), '');
});

test('checks all GitHub Release pages before deciding a version is missing', async (t) => {
  const fixture = createFixture(t);
  const releases = Array.from({ length: 100 }, (_, index) => ({ tag_name: `unrelated-${index}` }));
  releases.push({ tag_name: TAG, body: 'Existing release on page two.' });
  const api = createAPI({ releases });

  assert.deepEqual(await sync(fixture, api), [OLD_TAG]);
  assert.ok(api.requests.some((url) => new URL(url).searchParams.get('page') === '2'));
  assert.equal(releases[100].body, 'Existing release on page two.');
});

test('marks prereleases correctly and links their version heading', async (t) => {
  const fixture = createFixture(t);
  const version = '2.0.0-beta.1';
  fixture.setVersion(version);
  fixture.write('packages/v3/CHANGELOG.md', `# ${PACKAGE_NAME}\n\n## ${version}\n\n- Preview.\n`);
  const commit = fixture.commit('release preview');
  const api = createAPI({ versions: [version] });

  assert.deepEqual(await sync(fixture, api), [`${PACKAGE_NAME}@${version}`]);
  assert.equal(api.created[0].prerelease, true);
  assert.equal(api.created[0].make_latest, 'false');
  assert.ok(api.created[0].body.includes(`/blob/${commit}/packages/v3/CHANGELOG.md#200-beta1`));
});
