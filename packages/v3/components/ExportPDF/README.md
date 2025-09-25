## ExportPDF

Export content as a PDF file.

## Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <ExportPDF :modelValue="text" />
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { ExportPDF } from '@vavt/v3-extension';
// All CSS for this extension library
// import '@vavt/v3-extension/lib/asset/style.css';
// Or individual style for ExportPDF
import '@vavt/v3-extension/lib/asset/ExportPDF.css';

const text = ref('# PDF');
const toolbars = ['bold', 0, 'underline'];
</script>
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'Export as PDF' or '导出为 PDF' | Shown as a tooltip text when the mouse moves over |
| width | `string` | '870px' | Width of component `Modal` |
| height | `string` | '600px' | Height of component `Modal` |
| modalTitle | `string` | 'Export as PDF' or '导出为 PDF' | Title of component `Modal` |
| modelValue | `string` | '' | Conten need to be exported |
| exportBtnText | `string` | 'Export' or '导出' |  |
| style | `string \| CSSProperties` | `{ padding: '10mm' }` |  |
| noIconfont | `boolean` |  | Not append iconfont script |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| noEcharts | `boolean` |  | Use echarts or not |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<span class="mee-iconfont icon-mee-pdf" />` | Content displayed in the toolbar |

## Events

| name      | type                     | description |
| --------- | ------------------------ | ----------- |
| onStart   | `() => void`             |             |
| onSuccess | `() => void`             |             |
| onError   | `(err: unknown) => void` |             |

## Expose

| name    | type         | description                                            |
| ------- | ------------ | ------------------------------------------------------ |
| trigger | `() => void` | The method to trigger export，`pdfRef.value.trigger()` |
