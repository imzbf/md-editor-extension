# md-editor-extension

分享你关于[md-editor-v3](https://github.com/imzbf/md-editor-v3) 和 [md-editor-rt](https://github.com/imzbf/md-editor-rt)的公共配置。

## 使用

### md-editor-v3

1. 安装

```shell
yarn add md-editor-v3 @vavt/md-editor-extension
```

2. 配置

```vue
<template>
  <md-editor language="zh-tw" preview-theme="my-theme" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
// 引入公共库中的预览主题
import '@vavt/md-editor-extension/dist/css/my-theme.css';
// 引入公共库中的语言配置
import zhTW from '@vavt/md-editor-extension/dist/language/zh-TW';

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'zh-tw': zhTW,
    },
  },
});
</script>
```

### md-editor-rt

1. 安装

```shell
yarn add md-editor-rt @vavt/md-editor-extension
```

2. 配置

```jsx
import React from 'react';
import MdEditor from 'md-editor-rt';
// 引入公共库中的预览主题
import '@vavt/md-editor-extension/dist/css/my-theme.css';
// 引入公共库中的语言配置
import zhTW from '@vavt/md-editor-extension/dist/language/zh-TW';

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'zh-tw': zhTW,
    },
  },
});

export default () => {
  return <MdEditor language="zh-tw" previewTheme="my-theme" />;
};
```

## 贡献

- Fork 这个仓库；
- 按照仓库的模板编写你的配置代码；
- 提交 pull request 到本仓库。

### 语言

在 locale 文件夹下新建你的语言文件夹，通过 `index.ts` 导出配置对象

```js
export default {};
```

### 预览主题

在 previewTheme 文件夹下新增你的预览主题，通过 `index.scss` 导出

```css
.xxx-theme {
  color: red;
}
```

`xxx` 即是你的主题名称，通过 `previewTheme="xxx"` 来使用。
