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
| exportBtnText | `string` | 'Export' or '导出' |  |
| trigger | `string \| ReactElement` | `<span className="mee-iconfont icon-mee-pdf" />` | Content displayed in the toolbar |
| style | `CSSProperties` | `{ padding: '10mm' }` |  |
| onStart | `() => void` |  |  |
| onSuccess | `() => void` |  |  |
| onError | `(err: unknown) => void` |  |  |
| noIconfont | `boolean` |  | Not append iconfont script |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| noEcharts | `boolean` |  | Use echarts or not |

## Expose

| name    | type         | description                                              |
| ------- | ------------ | -------------------------------------------------------- |
| trigger | `() => void` | The method to trigger export，`pdfRef.current.trigger()` |
