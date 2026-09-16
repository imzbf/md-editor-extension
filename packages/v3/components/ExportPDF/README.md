## ExportPDF

Open the browser's print dialog to save content as a PDF file.

## md-editor v7

If the editor uses `sanitize`, explicitly pass the same function with `<ExportPDF :modelValue="text" :sanitize="sanitize" />`; the prop is forwarded to the export preview. When configuring Markdown plugins by `editorId`, also handle `export-pdf-preview`. See [OriginalImg](../OriginalImg/README.md) for HTML opt-in configuration.

Code folding and line numbers are disabled for export. v7 code line highlighting remains available.

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
| modelValue | `string` | '' | Content to export |
| exportBtnText | `string` | 'Export' or '导出' |  |
| style | `string \| CSSProperties` | `{}` | Style of the export preview |
| sanitize | `(html: string) => string` | Editor's identity function | Filter the export preview HTML; pass the same function used by the editor |
| noIconfont | `boolean` |  | Legacy prop with no effect; icons no longer use iconfont |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| noEcharts | `boolean` |  | Use echarts or not |

## Slots

| name    | type                             | default                              | description                      |
| ------- | -------------------------------- | ------------------------------------ | -------------------------------- |
| trigger | `string \| VNode \| JSX.Element` | `<Printer class="md-editor-icon" />` | Content displayed in the toolbar |

## Events

| name | type | description |
| --- | --- | --- |
| onStart | `() => void` | Before opening the print dialog |
| onSuccess | `() => void` | On `afterprint`, including cancellation; does not confirm that a file was saved |
| onError | `(err: unknown) => void` | The export preview element could not be found |

## Expose

| name    | type         | description                                            |
| ------- | ------------ | ------------------------------------------------------ |
| trigger | `() => void` | The method to trigger export，`pdfRef.value.trigger()` |
