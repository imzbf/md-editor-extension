import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const PUBLIC_PACKAGES = {
  common: '@vavt/cm-extension',
  v3: '@vavt/v3-extension',
  rt: '@vavt/rt-extension'
};

const PUBLIC_PACKAGE_NAMES = new Set(Object.values(PUBLIC_PACKAGES));
const PACKAGE_PREFIXES = [
  ['packages/common/', PUBLIC_PACKAGES.common],
  ['packages/v3/', PUBLIC_PACKAGES.v3],
  ['packages/rt/', PUBLIC_PACKAGES.rt]
];

const INTERNAL_SOURCE_CONSUMERS = [
  ['packages/data/src/', [PUBLIC_PACKAGES.v3, PUBLIC_PACKAGES.rt]],
  ['packages/utils/src/static/', [PUBLIC_PACKAGES.v3, PUBLIC_PACKAGES.rt]],
  ['packages/utils/src/vue-tsx/', [PUBLIC_PACKAGES.v3]],
  ['packages/utils/src/node/', [PUBLIC_PACKAGES.common, PUBLIC_PACKAGES.v3, PUBLIC_PACKAGES.rt]]
];

/**
 * 排除不会影响发布包内容的文件。
 * 包的构建脚本决定 npm 用户最终获取的文件，因此仍需纳入发布检查。
 */
export function isReleaseExempt(file) {
  const normalized = file.replaceAll('\\', '/');

  return (
    normalized.endsWith('.md') ||
    /(^|\/)(?:__tests__|tests?|fixtures?)(\/|$)/.test(normalized) ||
    /\.(?:spec|test)\.[cm]?[jt]sx?$/.test(normalized) ||
    /(^|\/)dev\//.test(normalized) ||
    /(^|\/)\.local\//.test(normalized) ||
    /\/scripts\/dev\.[cm]?[jt]s$/.test(normalized) ||
    /\/\.(?:eslint|prettier)\.[^/]+$/.test(normalized) ||
    // 只有 tsconfig.node.json 仅用于开发。主配置 tsconfig.json 会影响
    // tsc 和 vite-plugin-dts 的输出，因此需要纳入发布检查。
    /\/(?:eslint\.config\.mjs|tsconfig\.node\.json|index\.html)$/.test(normalized)
  );
}

/**
 * 将源码变更映射到发布产物受影响的公开包。
 * 私有工作区中的共享数据和工具也会影响公开包，必须为使用它们的包提供 Changeset，
 * 避免这类变更绕过发布检查。
 */
export function getAffectedPackages(files) {
  const affected = new Set();

  for (const file of files) {
    const normalized = file.replaceAll('\\', '/');
    if (isReleaseExempt(normalized)) continue;

    for (const [prefix, packageName] of PACKAGE_PREFIXES) {
      if (normalized.startsWith(prefix)) affected.add(packageName);
    }

    for (const [prefix, consumers] of INTERNAL_SOURCE_CONSUMERS) {
      if (!normalized.startsWith(prefix)) continue;
      for (const packageName of consumers) affected.add(packageName);
    }
  }

  return affected;
}

/**
 * 解析标准 Changeset 文件头部声明的包名和版本变更级别。
 * 这里接受所有格式正确的包名，包是否存在于工作区由 Changesets 自行校验；
 * 被忽略的私有包也可以出现在声明中。此处只负责读取声明，供后续检查变更覆盖范围。
 */
export function parseChangeset(content, filename = 'changeset.md') {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${filename} is missing a valid Changesets frontmatter block`);

  const packages = new Map();
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const entry = line.match(/^(['"]?)((?:@[^/'"\s:]+\/)?[^'"\s:]+)\1\s*:\s*(patch|minor|major)\s*$/);
    if (!entry) throw new Error(`${filename} contains an unsupported package entry: ${line}`);
    packages.set(entry[2], entry[3]);
  }

  if (!packages.size) throw new Error(`${filename} does not declare a publishable package`);
  if (!content.slice(match[0].length).trim()) throw new Error(`${filename} is missing a release summary`);

  return packages;
}

/**
 * 只读取本次变更新增或修改的 Changeset。
 * 如果读取目录内的全部记录，旧的待发布 Changeset 可能会让新的 PR 错误地通过检查。
 */
export function getDeclaredPackages(changesetDir = '.changeset', changedFiles) {
  if (!fs.existsSync(changesetDir)) return new Set();

  const filenames = changedFiles
    ? [...changedFiles]
        .map((file) => file.replaceAll('\\', '/'))
        .filter((file) => /^\.changeset\/[^/]+\.md$/.test(file))
        .map((file) => path.basename(file))
        .filter((filename) => filename !== 'README.md')
    : fs.readdirSync(changesetDir).filter((name) => name.endsWith('.md') && name !== 'README.md');

  const declared = new Set();
  for (const filename of filenames) {
    const fullPath = path.join(changesetDir, filename);
    if (!fs.existsSync(fullPath)) continue;

    for (const packageName of parseChangeset(fs.readFileSync(fullPath, 'utf8'), filename).keys()) {
      if (PUBLIC_PACKAGE_NAMES.has(packageName)) declared.add(packageName);
    }
  }
  return declared;
}

export function findMissingPackages(affected, declared) {
  return [...affected].filter((packageName) => !declared.has(packageName));
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function getChangedFiles(baseRef) {
  const mergeBase = git(['merge-base', baseRef, 'HEAD']);
  const changed = new Set();
  const collect = (args) => {
    const output = git(args);
    for (const file of output.split(/\r?\n/).filter(Boolean)) changed.add(file);
  };

  // 同时检查 PR 中已提交的变更，以及本地已暂存、未暂存和未跟踪的文件，
  // 让开发者在推送到 GitHub 之前就能获得完整的检查结果。
  collect(['diff', '--name-only', '--diff-filter=ACDMR', `${mergeBase}...HEAD`]);
  collect(['diff', '--name-only', '--diff-filter=ACDMR']);
  collect(['diff', '--cached', '--name-only', '--diff-filter=ACDMR']);
  collect(['ls-files', '--others', '--exclude-standard']);
  return changed;
}

export function validateChangesetCoverage(changedFiles, changesetDir = '.changeset') {
  const affected = getAffectedPackages(changedFiles);
  const declared = getDeclaredPackages(changesetDir, changedFiles);
  return { affected, declared, missing: findMissingPackages(affected, declared) };
}

function main() {
  const baseRef = process.env.CHANGESET_BASE_REF || process.argv[2] || 'origin/main';
  const result = validateChangesetCoverage(getChangedFiles(baseRef));

  if (result.missing.length) {
    console.error(`Changeset required for: ${result.missing.join(', ')}`);
    console.error('Run "npm run changeset" and include the affected publishable packages.');
    process.exitCode = 1;
    return;
  }

  console.log(
    result.affected.size
      ? `Changeset coverage passed for: ${[...result.affected].join(', ')}`
      : 'No publishable package changes detected; a changeset is not required.'
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
