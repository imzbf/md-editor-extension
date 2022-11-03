# md-editor-extension

[English](https://github.com/imzbf/md-editor-extension) \| 中文

分享你关于[md-editor-v3](https://github.com/imzbf/md-editor-v3) 和 [md-editor-rt](https://github.com/imzbf/md-editor-rt)的公共配置。

语言

| 语言名称 | 描述 | 作者                               |
| -------- | ---- | ---------------------------------- |
| zh_TW    | 暂无 | [@imzbf](https://github.com/imzbf) |

预览主题

| 主题名称  | 描述                                                                                                                                                    | 作者                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| arknights | 来自[juejin-markdown-theme-arknights](https://github.com/viewweiwu/juejin-markdown-theme-arknights)，原作者：[@viewweiwu](https://github.com/viewweiwu) | [@imzbf](https://github.com/imzbf) |

## 使用

### md-editor-v3

1. 安装

```shell
yarn add md-editor-v3 @vavt/md-editor-extension
```

2. 配置

```vue
<template>
  <md-editor language="zh-TW" preview-theme="arknights" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
// 引入公共库中的预览主题
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';
// 引入公共库中的语言配置
import ZH_TW from '@vavt/md-editor-extension/dist/locale/zh-TW';

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW,
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
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';
// 引入公共库中的语言配置
import ZH_TW from '@vavt/md-editor-extension/dist/locale/zh-TW';

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW,
    },
  },
});

export default () => {
  return <MdEditor language="zh-TW" previewTheme="arknights" />;
};
```

## 贡献

- Fork 这个仓库；
- 按照仓库的模板编写你的配置代码；
- 提交 pull request 到本仓库。

### 语言

创建一个以`[语言名称].js`命名的文件，使用下面的模板修改你的语言设置：

```js
import type { StaticTextDefaultValue } from '../../index';

/**
 * @author imzbf
 * @email  zbfcqtl@gmail.com
 * @github https://github.com/imzbf
 *
 * 中文简体
 */
const ZH_CN: StaticTextDefaultValue = {
  toolbarTips: {
    bold: '加粗',
    underline: '下划线',
    italic: '斜体',
    strikeThrough: '删除线',
    title: '标题',
    sub: '下标',
    sup: '上标',
    quote: '引用',
    unorderedList: '无序列表',
    orderedList: '有序列表',
    task: '任务列表',
    codeRow: '行内代码',
    code: '块级代码',
    link: '链接',
    image: '图片',
    table: '表格',
    mermaid: 'mermaid图',
    katex: 'katex公式',
    revoke: '后退',
    next: '前进',
    save: '保存',
    prettier: '美化',
    pageFullscreen: '浏览器全屏',
    fullscreen: '屏幕全屏',
    preview: '预览',
    htmlPreview: 'html代码预览',
    catalog: '目录',
    github: '源码地址',
  },
  titleItem: {
    h1: '一级标题',
    h2: '二级标题',
    h3: '三级标题',
    h4: '四级标题',
    h5: '五级标题',
    h6: '六级标题',
  },
  imgTitleItem: {
    link: '添加链接',
    upload: '上传图片',
    clip2upload: '裁剪上传',
  },
  linkModalTips: {
    title: '添加',
    descLable: '链接描述：',
    descLablePlaceHolder: '请输入描述...',
    urlLable: '链接地址：',
    urlLablePlaceHolder: '请输入链接...',
    buttonOK: '确定',
  },
  clipModalTips: {
    title: '裁剪图片上传',
    buttonUpload: '上传',
  },
  copyCode: {
    text: '复制代码',
    successTips: '已复制！',
    failTips: '复制失败！',
  },
  mermaid: {
    flow: '流程图',
    sequence: '时序图',
    gantt: '甘特图',
    class: '类图',
    state: '状态图',
    pie: '饼图',
    relationship: '关系图',
    journey: '旅程图',
  },
  katex: {
    inline: '行内公式',
    block: '块级公式',
  },
  footer: {
    markdownTotal: '字数',
    scrollAuto: '同步滚动',
  },
};

export default ZH_CN;
```

### 预览主题

在 previewTheme 文件夹下新增你的预览主题，通过 `[name].scss` 导出

```css
.xxx-theme {
  color: red;
}
```

`xxx` 即是你的主题名称，通过 `previewTheme="xxx"` 来使用。

你可以充分的利用编辑器已提供的[css 变量](https://github.com/imzbf/md-editor-v3#change-styles)来设置你的主题。
