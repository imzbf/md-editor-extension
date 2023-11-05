## Mark

Text markers

## Usage

First

```shell
yarn add markdown-it-mark
```

Second

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <Mark>
        <template #trigger> mark </template>
      </Mark>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { Mark } from '@vavt/v3-extension';
import MarkExtension from 'markdown-it-mark';

// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/v3-extension/lib/asset/Mark.css';

config({
  markdownItConfig(md) {
    md.use(MarkExtension);
  }
});

const text = ref('');
const toolbars = ['bold', 0, 'underline'];
</script>
```

## Props

| name  | type     | default | description                                       |
| ----- | -------- | ------- | ------------------------------------------------- |
| title | `string` | 'mark'  | Shown as a tooltip text when the mouse moves over |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<span className="mee-iconfont icon-mee-mark" />` | Content displayed in the toolbar |
