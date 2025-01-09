## ThemeSwitch

Standard tool for toggling the editor's theme.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { ThemeSwitch } from '@vavt/rt-extension';

// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for ThemeSwitch
import '@vavt/rt-extension/lib/asset/ThemeSwitch.css';

const toolbars = ['bold', 0, '=', 'github'];

export default () => {
  const [theme, setTheme] = useState('light');

  return (
    <MdEditor
      value="content"
      toolbars={toolbars}
      defToolbars={[<ThemeSwitch value={theme} onChange={setTheme} key="ThemeSwitch" />]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | `props.value` | Shown as a tooltip text when the mouse moves over |
| value | `string` | 'light' | Editor's theme |
| children | `ReactNode` | `<Moon  class="md-editor-icon" /> \| <Sun  class="md-editor-icon" />` | Content displayed in the toolbar |

## Events

| name     | type                      | default   | description |
| -------- | ------------------------- | --------- | ----------- |
| onChange | `(value: Themes) => void` | undefined |             |
