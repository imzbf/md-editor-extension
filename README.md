# md-editor-extension

English \| [中文](https://github.com/imzbf/md-editor-extension/blob/develop/README-CN.md)

Share your configuration of [md-editor-v3](https://github.com/imzbf/md-editor-v3) and [md-editor-rt](https://github.com/imzbf/md-editor-rt). And the extension components of the editor.

## Usage

### @vavt/cm-extension

This is a public configuration library that includes languages and themes.

```shell
yarn add @vavt/cm-extension
```

Language

| name  | description            | author                                             |
| ----- |------------------------| -------------------------------------------------- |
| zh-TW | Chinese (Traditional)  | [@imzbf](https://github.com/imzbf)                 |
| fr-FR | French                 | [@tofandel](https://github.com/tofandel)           |
| jp-JP | Japanese               | [@xj89959853](https://github.com/xj89959853)       |
| id-ID | Bahasa Indonesia       | [@vallerydelexy](https://github.com/vallerydelexy) |
| jv-ID | Basa Jawa              | [@vallerydelexy](https://github.com/vallerydelexy) |
| ru    | Russian                | [@gorgulenkozxc](https://github.com/gorgulenkozxc) |
| pt-BR | Brazilian Portuguese   | [@kleberMRocha](https://github.com/kleberMRocha)   |
| de-DE | German                 | [@JehtJanich](https://github.com/JehtJanich)       |
| it-IT | Italien                | [@JehtJanich](https://github.com/JehtJanich)       |
| es-ES | Spanish                | [@mreysei](https://github.com/mreysei)             |
| pl-PL | Polish                 | [@pperzyna](https://github.com/pperzyna)           |

PreviewTheme

| name | description | author |
| --- | --- | --- |
| arknights | From [juejin-markdown-theme-arknights](https://github.com/viewweiwu/juejin-markdown-theme-arknights), author: [@viewweiwu](https://github.com/viewweiwu) | [@imzbf](https://github.com/imzbf) |

### md-editor-v3

```vue
<template>
  <MdEditor language="zh-TW" preview-theme="arknights" />
</template>

<script setup>
import { MdEditor, config } from 'md-editor-v3';
// import theme css
import '@vavt/cm-extension/dist/previewTheme/arknights.css';
// import existing language
import ZH_TW from '@vavt/cm-extension/dist/locale/zh-TW';

config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW
    }
  }
});
</script>
```

### md-editor-rt

```jsx
import React from 'react';
import { MdEditor, config } from 'md-editor-rt';
// import existing theme
import '@vavt/cm-extension/dist/previewTheme/arknights.css';
// import existing language
import ZH_TW from '@vavt/cm-extension/dist/locale/zh-TW';

config({
  editorConfig: {
    languageUserDefined: {
      'zh-TW': ZH_TW
    }
  }
});

export default () => {
  return <MdEditor language="zh-TW" previewTheme="arknights" />;
};
```

### @vavt/v3-extension

This is the extension component library for `md-editor-v3`

```shell
yarn add @vavt/v3-extension
```

#### components

| Name | Description |
| --- | --- |
| [Emoji](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/Emoji/README.md) | Insert emoji into the editor |
| [Mark](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/Mark/README.md) | Text markers`<mark>` |
| [OriginalImg](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/OriginalImg/README.md) | Insert `<img src="" alt="" width="100%">` |
| [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ExportPDF/README.md) | Export content as a PDF file |

### @vavt/rt-extension

This is the extension component library for `md-editor-rt`

```shell
yarn add @vavt/rt-extension
```

#### components

| Name | Description |
| --- | --- |
| [Emoji](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/Emoji/README.md) | Insert emoji into the editor |
| [Mark](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/Mark/README.md) | Text markers`<mark>` |
| [OriginalImg](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/OriginalImg/README.md) | Insert `<img src="" alt="" width="100%">` |
| [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/rt/components/ExportPDF/README.md) | Export content as a PDF file |

## Contribute

- Fork the repository.
- Write code based on existing templates.
- Submit a pull request to the project owner.

> Please note that the development environment of `@vavt/cm-extension` has automatically introduced your language configuration and theme. You do not need to manually reference it in the 'dev' directory. Regardless of the production or development environment, you only need to pay attention to the content of the language configuration and theme itself.

### Language

Create a file named as `[language name].js`, and export in the following template.

```ts
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
    previewOnly: 'preview only',
    htmlPreview: 'html preview',
    catalog: 'catalog',
    github: 'source code'
  },
  titleItem: {
    h1: 'Lv1 Heading',
    h2: 'Lv2 Heading',
    h3: 'Lv3 Heading',
    h4: 'Lv4 Heading',
    h5: 'Lv5 Heading',
    h6: 'Lv6 Heading'
  },
  imgTitleItem: {
    link: 'Add Img Link',
    upload: 'Upload Img',
    clip2upload: 'Clip Upload'
  },
  linkModalTips: {
    title: 'Add ',
    descLabel: 'Desc:',
    descLabelPlaceHolder: 'Enter a description...',
    urlLabel: 'Link:',
    urlLabelPlaceHolder: 'Enter a link...',
    buttonOK: 'OK'
  },
  clipModalTips: {
    title: 'Crop Image',
    buttonUpload: 'Upload'
  },
  copyCode: {
    text: 'Copy',
    successTips: 'Copied!',
    failTips: 'Copy failed!'
  },
  mermaid: {
    flow: 'flow',
    sequence: 'sequence',
    gantt: 'gantt',
    class: 'class',
    state: 'state',
    pie: 'pie',
    relationship: 'relationship',
    journey: 'journey'
  },
  katex: {
    inline: 'inline',
    block: 'block'
  },
  footer: {
    markdownTotal: 'Word Count',
    scrollAuto: 'Scroll Auto'
  }
};

export default EN_US;
```

### PreviewTheme

Create a file named as `[theme name].scss`, then write your theme code:

```scss
@import '../../common/index.scss';

.xxx-theme {
  @include common-style;
  color: red;
}
```

`xxx` is the name of your theme, use like `previewTheme="xxx"`.

You can make full use of the existing [css variables](https://github.com/imzbf/md-editor-v3#change-styles) to generate your theme.
