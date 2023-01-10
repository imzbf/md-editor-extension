# md-editor-extension

English \| [中文](https://github.com/imzbf/md-editor-extension/blob/dev/README-CN.md)

Share your configuration of [md-editor-v3](https://github.com/imzbf/md-editor-v3) and [md-editor-rt](https://github.com/imzbf/md-editor-rt).

Language

| name  | description            | author                                       |
| ----- | ---------------------- | -------------------------------------------- |
| zh_TW | Chinese ( Traditional) | [@imzbf](https://github.com/imzbf)           |
| fr_FR | French                 | [@tofandel](https://github.com/tofandel)     |
| jp_JP | Japanese               | [@xj89959853](https://github.com/xj89959853) |

PreviewTheme

| name      | description                                                                                                                                              | author                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| arknights | From [juejin-markdown-theme-arknights](https://github.com/viewweiwu/juejin-markdown-theme-arknights), author: [@viewweiwu](https://github.com/viewweiwu) | [@imzbf](https://github.com/imzbf) |

## Usage

### md-editor-v3

1. Install

```shell
yarn add md-editor-v3 @vavt/md-editor-extension
```

2. Config

```vue
<template>
  <md-editor language="zh-TW" preview-theme="arknights" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
// import theme css
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';
// import existing language
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

1. Install

```shell
yarn add md-editor-rt @vavt/md-editor-extension
```

2. Config

```jsx
import React from 'react';
import MdEditor from 'md-editor-rt';
// import existing theme
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';
// import existing language
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

## Contribute

- Fork the repository.
- Write code based on existing templates.
- Submit a pull request to the project owner.

### Language

Create a file named as `[language name].js`, and export in the following template.

```js
import type { StaticTextDefaultValue } from '../../index';

/**
 * @author imzbf
 * @email  zbfcqtl@gmail.com
 * @github https://github.com/imzbf
 *
 * English
 */
const EN_US: StaticTextDefaultValue = {
  toolbarTips: {
    bold: 'bold',
    underline: 'underline',
    italic: 'italic',
    strikeThrough: 'strikeThrough',
    title: 'title',
    sub: 'subscript',
    sup: 'superscript',
    quote: 'quote',
    unorderedList: 'unordered list',
    orderedList: 'ordered list',
    task: 'task list',
    codeRow: 'inline code',
    code: 'block-level code',
    link: 'link',
    image: 'image',
    table: 'table',
    mermaid: 'mermaid',
    katex: 'formula',
    revoke: 'revoke',
    next: 'undo revoke',
    save: 'save',
    prettier: 'prettier',
    pageFullscreen: 'fullscreen in page',
    fullscreen: 'fullscreen',
    preview: 'preview',
    htmlPreview: 'html preview',
    catalog: 'catalog',
    github: 'source code',
  },
  titleItem: {
    h1: 'Lv1 Heading',
    h2: 'Lv2 Heading',
    h3: 'Lv3 Heading',
    h4: 'Lv4 Heading',
    h5: 'Lv5 Heading',
    h6: 'Lv6 Heading',
  },
  imgTitleItem: {
    link: 'Add Img Link',
    upload: 'Upload Img',
    clip2upload: 'Clip Upload',
  },
  linkModalTips: {
    title: 'Add ',
    descLabel: 'Desc:',
    descLabelPlaceHolder: 'Enter a description...',
    urlLabel: 'Link:',
    urlLabelPlaceHolder: 'Enter a link...',
    buttonOK: 'OK',
  },
  clipModalTips: {
    title: 'Crop Image',
    buttonUpload: 'Upload',
  },
  copyCode: {
    text: 'Copy',
    successTips: 'Copied!',
    failTips: 'Copy failed!',
  },
  mermaid: {
    flow: 'flow',
    sequence: 'sequence',
    gantt: 'gantt',
    class: 'class',
    state: 'state',
    pie: 'pie',
    relationship: 'relationship',
    journey: 'journey',
  },
  katex: {
    inline: 'inline',
    block: 'block',
  },
  footer: {
    markdownTotal: 'Word Count',
    scrollAuto: 'Scroll Auto',
  },
};

export default EN_US;
```

### PreviewTheme

Create a file named as `[theme name].scss`, then write your theme code:

```css
.xxx-theme {
  color: red;
}
```

`xxx` is the name of your theme, use like `previewTheme="xxx"`.

You can make full use of the existing [css variables](https://github.com/imzbf/md-editor-v3#change-styles) to generate your theme.
