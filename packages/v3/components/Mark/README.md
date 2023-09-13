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
      </Emoji>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { Mark } from '@vavt/v3-extension';
import MarkExtension from 'markdown-it-mark';

config({
  markdownItConfig(md) {
    md.use(MarkExtension);
  }
});

const text = ref('');
const toolbars = ['bold', 0, 'underline'];
</script>
```

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `Array<string \| VNode \| JSX.Element>` | '' | Content displayed in the toolbar |
