## OriginalImg

Insert `<img src="" alt="" width="100%">` and select the image URL for editing.

## md-editor v7

v7 defaults to `html: false`, so the inserted tag appears as text in `MdEditor`, `MdPreview`, and `ExportPDF`. To render it as an image, explicitly enable HTML in `markdownItConfig` before mounting the components, as shown below. `OriginalImg` does not change parser settings automatically.

For untrusted content, also pass an HTML sanitizer to every preview, including `ExportPDF`. To keep `html: false`, use the editor's built-in Markdown image tool instead.

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
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { OriginalImg } from '@vavt/v3-extension';

// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for OriginalImg
import '@vavt/v3-extension/lib/asset/OriginalImg.css';

// Enable raw HTML for trusted content; merge this into any existing plugin configuration.
config({
  markdownItConfig(md) {
    md.set({ html: true });
  }
});

const text = ref('');
const toolbars = ['bold', 0, 'underline'];
</script>
```

## Props

| name  | type     | default | description                                       |
| ----- | -------- | ------- | ------------------------------------------------- |
| title | `string` | 'image' | Shown as a tooltip text when the mouse moves over |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<ImagePlus class="md-editor-icon" />` | Content displayed in the toolbar |
