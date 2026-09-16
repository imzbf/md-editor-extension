import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  PUBLIC_PACKAGES,
  findMissingPackages,
  getAffectedPackages,
  getDeclaredPackages,
  parseChangeset,
  validateChangesetCoverage
} from './check-changeset.mjs';

test('maps public package source files to their own package', () => {
  assert.deepEqual([...getAffectedPackages(['packages/v3/components/Emoji/Emoji.tsx'])], [PUBLIC_PACKAGES.v3]);
});

test('ignores documentation, tests and development-only files', () => {
  assert.equal(
    getAffectedPackages([
      'packages/v3/components/Emoji/README.md',
      'packages/v3/components/Emoji/Emoji.test.tsx',
      'packages/v3/dev/App.vue',
      'packages/v3/scripts/dev.ts'
    ]).size,
    0
  );
});

test('maps shared source changes to every published consumer', () => {
  assert.deepEqual(
    [...getAffectedPackages(['packages/data/src/default-emojis.ts', 'packages/utils/src/vue-tsx/index.ts'])].sort(),
    [PUBLIC_PACKAGES.rt, PUBLIC_PACKAGES.v3].sort()
  );
});

test('treats a package tsconfig as release-relevant but not its node variant', () => {
  assert.deepEqual([...getAffectedPackages(['packages/common/tsconfig.json'])], [PUBLIC_PACKAGES.common]);
  assert.equal(getAffectedPackages(['packages/v3/tsconfig.node.json']).size, 0);
});

test('parses standard Changesets frontmatter and validates its summary', () => {
  const packages = parseChangeset(`---\n'@vavt/v3-extension': minor\n---\n\nAdd a new component.`, 'feature.md');
  assert.equal(packages.get(PUBLIC_PACKAGES.v3), 'minor');
});

test('reads any well-formed package entry without crashing', () => {
  // 工作区中不存在的包名由 Changesets 自行校验，被忽略的私有包也允许声明，
  // 因此这两类包名都不应在解析阶段导致异常。
  const packages = parseChangeset(`---\n'@vavt/new-extension': patch\n"@vavt/utils": minor\n---\n\nSummary.`);
  assert.deepEqual([...packages], [
    ['@vavt/new-extension', 'patch'],
    ['@vavt/utils', 'minor']
  ]);
  assert.equal(getDeclaredPackages(new URL('../.changeset-missing', import.meta.url).pathname).size, 0);
});

test('does not let an older pending changeset satisfy the current change', () => {
  const changesetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'changeset-check-'));

  try {
    fs.writeFileSync(
      path.join(changesetDir, 'older.md'),
      `---\n'${PUBLIC_PACKAGES.common}': patch\n---\n\nOlder change.`
    );
    fs.writeFileSync(
      path.join(changesetDir, 'current.md'),
      `---\n'${PUBLIC_PACKAGES.rt}': patch\n---\n\nCurrent change.`
    );

    const result = validateChangesetCoverage(
      ['packages/common/src/index.ts', '.changeset/current.md'],
      changesetDir
    );

    assert.deepEqual([...result.declared], [PUBLIC_PACKAGES.rt]);
    assert.deepEqual(result.missing, [PUBLIC_PACKAGES.common]);
  } finally {
    fs.rmSync(changesetDir, { recursive: true, force: true });
  }
});

test('still rejects malformed entries and changesets without a summary', () => {
  assert.throws(() => parseChangeset(`---\n'@vavt/v3-extension': huge\n---\n\nSummary.`), /unsupported package entry/);
  assert.throws(() => parseChangeset(`---\n'@vavt/v3-extension': patch\n---\n\n   `), /missing a release summary/);
  assert.throws(() => parseChangeset(`no frontmatter`), /missing a valid Changesets frontmatter/);
});

test('reports exactly the affected packages missing from changesets', () => {
  const result = validateChangesetCoverage(
    ['packages/common/src/index.ts', 'packages/rt/styles/style.scss'],
    new URL('../.changeset-does-not-exist', import.meta.url).pathname
  );
  assert.deepEqual(findMissingPackages(result.affected, new Set([PUBLIC_PACKAGES.common])), [PUBLIC_PACKAGES.rt]);
});
