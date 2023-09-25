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
      modelValue={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[
        <ExportPDF key="ExportPDF" modelValue={value} trigger={<span>pdf</span>} />
      ]}
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
| modelValue | `string` | '' | Conten need to be exported |
| fileName | `string` | 'md' | Exported file name |
| exportBtnText | `string` | 'Export' or '导出' |  |
| trigger | `string \| VNode \| JSX.Element` | '' | Content displayed in the toolbar |
