## ExportPDF

Export content as a PDF file.

## Usage

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <ExportPDF :modelValue="text" @onProgress="handleProgress" />
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
// Or individual style for Emoji
import '@vavt/v3-extension/lib/asset/ExportPDF.css';

const text = ref('# PDF');
const toolbars = ['bold', 0, 'underline'];

const handleProgress = (progress) => {
  console.log(`Export progress: ${progress.ratio * 100}%`);
};
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
| fileName | `string` | 'md' | Exported file name |
| exportBtnText | `string` | 'Export' or '导出' |  |
| style | `string \| CSSProperties` | `{ padding: '10mm' }` |  |
| noIconfont | `boolean` |  | Not append iconfont script |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| options | `object` |  | [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) |
| customize | `(ins: unknown) => void` |  | configure [jsPDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html) |

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| trigger | `string \| VNode \| JSX.Element` | `<span class="mee-iconfont icon-mee-pdf" />` | Content displayed in the toolbar |

## Events

| name | type |  | description |
| --- | --- | --- | --- |
| onStart | `() => void` |  |  |
| onSuccess | `() => void` |  |  |
| onError | `(err: unknown) => void` |  |  |
| onProgess | `(progress: { val: number, state: string, n: number, stack: string[], ratio: number }) => void` |  |  |

## Demo

### Set Page Number

```vue
<script setup>
const customizePdf = (pdfIns) => {
  const totalPages = pdfIns.internal.getNumberOfPages();
  const pageWidth = pdfIns.internal.pageSize.getWidth();
  const pageHeight = pdfIns.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    pdfIns.setPage(i);
    pdfIns.setFontSize(10);
    // Using Chinese will result in garbled text
    // refer to [this](https://github.com/parallax/jsPDF?tab=readme-ov-file#use-of-unicode-characters--utf-8) for font configuration.
    pdfIns.text(`Page ${i}, Total ${totalPages}`, pageWidth / 2, pageHeight - 1, {
      align: 'center'
    });
  }
};
</script>

<template>
  <ExportPDF modelValue="text" :customize="customizePdf" />
</template>
```
