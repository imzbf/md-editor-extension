## OriginalImg

Append `<img >`.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { OriginalImg } from '@vavt/rt-extension';

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      modelValue={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<OriginalImg key="OriginalImg" trigger={<span>mark</span>} />]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'emoji' | Shown as a tooltip text when the mouse moves over |
| trigger | `string \| VNode \| JSX.Element` | '' | Content displayed in the toolbar |
