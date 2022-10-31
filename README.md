# md-editor-extension

Share your configuration of [md-editor-v3](https://github.com/imzbf/md-editor-v3) and [md-editor-rt](https://github.com/imzbf/md-editor-rt).

## Usage

### md-editor-v3

1. Install

```shell
yarn add md-editor-v3 @vavt/md-editor-extension
```

2. Config

```vue
<template>
  <md-editor language="zh-tw" preview-theme="devui-blue" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
// import theme css
import '@vavt/md-editor-extension/dist/previewTheme/devui-blue.css';
// import existing language
import zhTW from '@vavt/md-editor-extension/dist/locale/zh-TW';

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

1. Install

```shell
yarn add md-editor-rt @vavt/md-editor-extension
```

2. Config

```jsx
import React from 'react';
import MdEditor from 'md-editor-rt';
// import existing theme
import '@vavt/md-editor-extension/dist/previewTheme/devui-blue.css';
// import existing language
import zhTW from '@vavt/md-editor-extension/dist/locale/zh-TW';

MdEditor.config({
  editorConfig: {
    languageUserDefined: {
      'zh-tw': zhTW,
    },
  },
});

export default () => {
  return <MdEditor language="zh-tw" previewTheme="devui-blue" />;
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
    descLable: 'Desc:',
    descLablePlaceHolder: 'Enter a description...',
    urlLable: 'Link:',
    UrlLablePlaceHolder: 'Enter a link...',
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
