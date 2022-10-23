const sass = require('sass');
const fs = require('fs');
const path = require('path');

// 主题存放文件夹
const themeFileFolder = path.resolve(__dirname, '../src/previewTheme');
// 所有主题包
const themeEntryList = fs.readdirSync(themeFileFolder);
// dist文件夹
const distFolder = path.resolve(__dirname, '../dist');
// 创建dist文件夹
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder);
}
// 获取构建文件存放目录
const targetDir = path.resolve(__dirname, '../dist/css');
if (!fs.existsSync(targetDir)) {
  // removeDir(targetDir);
  fs.mkdirSync(targetDir);
}

themeEntryList.forEach((themeName) => {
  const scssFilePath = `${themeFileFolder}/${themeName}`;
  // 只处理文件
  if (fs.lstatSync(scssFilePath).isFile()) {
    const result = sass.compile(scssFilePath);

    fs.writeFileSync(
      `${targetDir}/${themeName.replace(/\.scss$/, '')}.css`,
      result.css
    );
  }
});
