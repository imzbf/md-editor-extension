## Emoji

Insert emoji into the editor.

## Usage

```jsx
import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { Emoji } from '@vavt/rt-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/rt-extension/lib/asset/Emoji.css';

export default () => {
  const [value, setValue] = useState('');

  return (
    <MdEditor
      modelValue={value}
      onChange={setValue}
      toolbars={['bold', 0, '=', 'github']}
      defToolbars={[<Emoji trigger={<span>emoji</span>} />]}
    />
  );
};
```

## Props

| name | type | default | description |
| --- | --- | --- | --- |
| emojis | `Array<string>` | emojis | Alternative emojis |
| selectAfterInsert | `boolean` | true | Select content after inserting it |
| trigger | `Array<string \| JSX.Element>` | '' | Content displayed in the toolbar |
