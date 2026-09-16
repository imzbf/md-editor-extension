## ExportPDF

Open the browser's print dialog to save content as a PDF file.

## md-editor v7

If the editor uses `sanitize`, explicitly pass the same function with `<ExportPDF value={value} sanitize={sanitize} />`; the prop is forwarded to the export preview. When configuring Markdown plugins by `editorId`, also handle `export-pdf-preview`. See [OriginalImg](../OriginalImg/README.md) for HTML opt-in configuration.

Code folding and line numbers are disabled for export. v7 code line highlighting remains available.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { ExportPDF } from '@vavt/rt-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for ExportPDF
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
| value | `string` | '' | Content to export |
| exportBtnText | `string` | 'Export' or '导出' |  |
| trigger | `string \| ReactElement` | `<Printer className="md-editor-icon" />` | Content displayed in the toolbar |
| style | `CSSProperties` | `{}` | Style of the export preview |
| sanitize | `(html: string) => string` | Editor's identity function | Filter the export preview HTML; pass the same function used by the editor |
| onStart | `() => void` |  | Before opening the print dialog |
| onSuccess | `() => void` |  | On `afterprint`, including cancellation; does not confirm that a file was saved |
| onError | `(err: unknown) => void` |  | The export preview element could not be found |
| noIconfont | `boolean` |  | Legacy prop with no effect; icons no longer use iconfont |
| noHighlight | `boolean` |  | Highlight code or not |
| noImgZoomIn | `boolean` |  | Enable the function of enlarging images |
| noKatex | `boolean` |  | Use katex or not |
| noMermaid | `boolean` |  | Use mermaid or not |
| noEcharts | `boolean` |  | Use echarts or not |

## Expose

| name    | type         | description                                              |
| ------- | ------------ | -------------------------------------------------------- |
| trigger | `() => void` | The method to trigger export，`pdfRef.current.trigger()` |
