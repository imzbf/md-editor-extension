## OriginalImg

Insert `<img src="" alt="" width="100%">` and select the image URL for editing.

## md-editor v7

v7 defaults to `html: false`, so the inserted tag appears as text in `MdEditor`, `MdPreview`, and `ExportPDF`. To render it as an image, explicitly enable HTML in `markdownItConfig` before mounting the components, as shown below. `OriginalImg` does not change parser settings automatically.

For untrusted content, also pass an HTML sanitizer to every preview, including `ExportPDF`. To keep `html: false`, use the editor's built-in Markdown image tool instead.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { OriginalImg } from '@vavt/rt-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for OriginalImg
import '@vavt/rt-extension/lib/asset/OriginalImg.css';

// Enable raw HTML for trusted content; merge this into any existing plugin configuration.
config({
  markdownItConfig(md) {
    md.set({ html: true });
  }
});

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      value={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<OriginalImg key="OriginalImg" trigger={<span>img</span>} />]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'image' | Shown as a tooltip text when the mouse moves over |
| trigger | `string \| ReactElement` | `<ImagePlus className="md-editor-icon" />` | Content displayed in the toolbar |
