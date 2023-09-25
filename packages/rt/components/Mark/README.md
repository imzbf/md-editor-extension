## Mark

Text markers

## Usage

First

```shell
yarn add markdown-it-mark
```

Second

```jsx
import { useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { Mark } from '@vavt/rt-extension';
import MarkExtension from 'markdown-it-mark';

config({
  markdownItConfig(md) {
    md.use(MarkExtension);
  }
});

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      modelValue={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<Mark key="Mark" trigger={<span>mark</span>} />]}
    />
  );
};
```

## Slots

| name | type | default | description |
| --- | --- | --- | --- |
| title | `string` | 'emoji' | Shown as a tooltip text when the mouse moves over |
| trigger | `string \| VNode \| JSX.Element` | '' | Content displayed in the toolbar |
