## ExportPDF

Export content as a PDF file.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { ExportPDF } from '@vavt/rt-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/rt-extension/lib/asset/ExportPDF.css';

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      value={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<ExportPDF key="ExportPDF" value={value} />]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'Export as PDF' or '导出为 PDF' | Shown as a tooltip text when the mouse moves over |
| width | `string` | '870px' | Width of component `Modal` |
| height | `string` | '600px' | Height of component `Modal` |
| modalTitle | `string` | 'Export as PDF' or '导出为 PDF' | Title of component `Modal` |
| value | `string` | '' | Conten need to be exported |
| modelValue | `string` | '' | Deprecated since version 2.0.0, replace with `value` |
| fileName | `string` | 'md' | Exported file name |
| exportBtnText | `string` | 'Export' or '导出' |  |
| trigger | `string \| ReactElement` | `<span className="mee-iconfont icon-mee-pdf" />` | Content displayed in the toolbar |
| style | `CSSProperties` | `{ padding: '10mm' }` |  |
| onStart | `() => void` |  |  |
| onSuccess | `() => void` |  |  |
| onError | `(err: unknown) => void` |  |  |
| onProgess | `(progress: { val: number, state: string, n: number, stack: string[], ratio: number }) => void` |  |  |
| noIconfont | `boolean` |  | Not append iconfont script |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| options | `object` |  | [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) |
| customize | `(ins: unknown) => void` |  | configure [jsPDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html) |

## Demo

### Set Page Number

```jsx
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

export default ({ text }) => {
  return <ExportPDF value={text} customize={customizePdf} />;
};
```
