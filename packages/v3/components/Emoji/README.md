## Emoji

Insert emoji into the editor.

## Usage

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

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'emoji' | Shown as a tooltip text when the mouse moves over |
| emojis | `Array<string>` | emojis | Alternative emojis |
| selectAfterInsert | `boolean` | true | Select content after inserting it |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<span class="mee-iconfont icon-mee-emoji" />` | Content displayed in the toolbar |
