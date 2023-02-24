import { createApp } from 'vue';
import App from './App.vue';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

// ===自动导入所有语言===
const localeFiles = import.meta.glob('../src/locale/*.ts', {
  eager: true,
  query: '?inline',
});
const languageSet = Object.keys(localeFiles).reduce((lset, fileName) => {
  lset[fileName.replace(/\.\.\/src\/locale\/([\w-]*)\.ts/, '$1')] =
    localeFiles[fileName].default;
  return lset;
}, {});
// ===自动导入所有语言===

// ===自动导入所有主题===
const themeFiles = import.meta.glob('../src/previewTheme/themes/*/index.scss', {
  eager: true,
  query: '?inline',
});

Object.keys(themeFiles).forEach((fileName) => {
  const id = fileName.replace(
    /\.\.\/src\/previewTheme\/themes\/([\w-]*)\/index\.scss/,
    '$1'
  );

  const styleEle = document.createElement('style');
  styleEle.id = id;

  styleEle.innerHTML = themeFiles[fileName].default;

  document.head.appendChild(styleEle);
});
// ===自动导入所有语言===

MdEditor.config({
  editorConfig: {
    languageUserDefined: languageSet,
  },
});

createApp(App).use(MdEditor).mount('#app');
