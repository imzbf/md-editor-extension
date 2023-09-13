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

| name  | description            | author                                       |
| ----- | ---------------------- | -------------------------------------------- |
| zh_TW | Chinese ( Traditional) | [@imzbf](https://github.com/imzbf)           |
| fr_FR | French                 | [@tofandel](https://github.com/tofandel)     |
| jp_JP | Japanese               | [@xj89959853](https://github.com/xj89959853) |

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

Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <Emoji>
        <template #trigger> Emoji </template>
      </Emoji>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { Emoji } from '@vavt/v3-extension';
// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/v3-extension/lib/asset/Emoji.css';

const text = ref('');

const toolbars = ['bold', 0, 'underline'];
</script>
```

More components and documentation: [TODO]()

### @vavt/rt-extension

This is the extension component library for `md-editor-rt`

```shell
yarn add @vavt/rt-extension
```

Usage

```jsx
import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { Emoji } from '@vavt/v3-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/rt-extension/lib/asset/Emoji.css';

const toolbars = ['bold', 0, 'underline'];

const App = () => {
  const [text, setText] = useState('');

  return (
    <MdEditor
      modelValue={text}
      onChange={setText}
      toolbars={toolbars}
      defToolbars={[<Emoji key="emoji" trigger={<span>Emoji</span>}></Emoji>]}
    />
  );
};

export default App;
```

More components and documentation: [TODO]()

## Contribute

- Fork the repository.
- Write code based on existing templates.
- Submit a pull request to the project owner.

> Please note that the development environment of `@vavt/cm-extension` has automatically introduced your language configuration and theme. You do not need to manually reference it in the 'dev' directory. Regardless of the production or development environment, you only need to pay attention to the content of the language configuration and theme itself.

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
