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
  <md-editor language="zh-tw" preview-theme="my-theme" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
// import theme css
import '@vavt/md-editor-extension/dist/css/my-theme.css';
// import existing language
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

1. Install

```shell
yarn add md-editor-rt @vavt/md-editor-extension
```

2. Config

```jsx
import React from 'react';
import MdEditor from 'md-editor-rt';
// import existing theme
import '@vavt/md-editor-extension/dist/css/my-theme.css';
// import existing language
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

## Contribute

- Fork the repository.
- Write code based on existing templates.
- Submit a pull request to the project owner.

### Language

Create a folder named in your language, and export with `index.ts`.

```js
export default {};
```

### PreviewTheme

Create a folder named in your theme, and export with `index.scss`

```css
.xxx-theme {
  color: red;
}
```

`xxx` is the name of your theme, use like `previewTheme="xxx"`.
