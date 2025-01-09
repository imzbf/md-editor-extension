## PreviewThemeSwitch

Dropdown menu tool for switching the editor's preview theme.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { PreviewThemeSwitch } from '@vavt/rt-extension';

// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for PreviewThemeSwitch
import '@vavt/rt-extension/lib/asset/PreviewThemeSwitch.css';

const toolbars = ['bold', 0, '=', 'github'];

export default () => {
  const [theme, setTheme] = useState('light');

  return (
    <MdEditor
      value="content"
      toolbars={toolbars}
      defToolbars={[
        <PreviewThemeSwitch
          value={previewTheme}
          onChange={setPreviewTheme}
          closeAfterSelect={false}
          key="PreviewThemeSwitch"
        />
      ]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | `props.value` | Shown as a tooltip text when the mouse moves over |
| value | `string` | 'light' | Editor's preview theme |
| options | `Array<{ value: string; label: string }>` | [DEFAULT_OPTIONS](https://github.com/imzbf/md-editor-extension/blob/develop/packages/data/src/index.ts#L1) | Option; defaults to a list of preview theme names within the editor |
| extraOptions | `Array<{ value: string; label: string }>` | `[]` | Extra options that will be appended to the default list |
| closeAfterSelect | `boolean` | `true` | Whether to close the dropdown menu after selection |
| children | `ReactNode` | `<SwatchBook class="md-editor-icon" />` | Content displayed in the toolbar |

## Events

| name     | type                             | default   | description |
| -------- | -------------------------------- | --------- | ----------- |
| onChange | `(value: PreviewThemes) => void` | undefined |             |
