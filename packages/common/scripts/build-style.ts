import sass from 'sass';
import fs from 'fs';
import path from 'path';

import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

import packageJson from '../package.json';

import folder from '@vavt/utils/src/node/folder';
const { removeDir } = folder;

const themeFolder = '../src/previewTheme/themes';

// 获取到所有的主题文件夹
const themeEntryList = fs.readdirSync(path.resolve(__dirname, themeFolder));

// 处理生产环境目录
const targetDir = path.resolve(__dirname, '../dist/previewTheme');
if (fs.existsSync(targetDir)) {
  removeDir(targetDir);
}

themeEntryList.forEach((themeName) => {
  // 目标主题目录不是目录是文件，退出
  if (fs.lstatSync(path.resolve(__dirname, `${themeFolder}/${themeName}`)).isFile()) {
    return false;
  }

  const result = sass.compile(
    path.resolve(__dirname, `${themeFolder}/${themeName}/index.scss`),
    {
      charset: false,
      style: 'compressed'
    }
  );

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  fs.writeFileSync(`${targetDir}/${themeName}.css`, result.css);
});

// 移除package.json中的workspace
const devDependencies = Object.keys(packageJson.devDependencies).reduce((p, key) => {
  if (/^workspace:/.test(packageJson.devDependencies[key])) {
    return p;
  }

  return {
    ...p,
    [key]: packageJson.devDependencies[key]
  };
}, {});

const newPackageJson = {
  ...packageJson,
  devDependencies
};

writeFile(
  path.resolve(__dirname, '../package.json'),
  new Uint8Array(Buffer.from(JSON.stringify(newPackageJson, null, 2))),
  (err) => {
    console.log(err);
  }
);
