## OriginalImg

Append `<img >`.

## Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <OriginalImg>
        <template #trigger>
          <span>img</span>
        </template>
      </OriginalImg>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { OriginalImg } from '@vavt/v3-extension';

// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/v3-extension/lib/asset/OriginalImg.css';

const text = ref('');
const toolbars = ['bold', 0, 'underline'];
</script>
```

## Props

| name  | type     | default | description                                       |
| ----- | -------- | ------- | ------------------------------------------------- |
| title | `string` | 'img'   | Shown as a tooltip text when the mouse moves over |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<span className="mee-iconfont icon-mee-tupian" />` | Content displayed in the toolbar |
