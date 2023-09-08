import React, { useState, StrictMode } from 'react';
import { MdEditor, Themes, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import data from '@vavt/data/src/markdown-demo.md';

import Mark from '../components/Mark';
import Emoji from '../components/Emoji';

import './style.scss';

const toolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  '-',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  0,
  1,
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'prettier',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
  'github'
];

const App = () => {
  const [text, setText] = useState(data);
  const [theme, setTheme] = useState<Themes>('light');

  const changeTheme = () => {
    setTheme((_theme) => (_theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <StrictMode>
      <button onClick={changeTheme}>{theme}</button>
      <MdEditor
        theme={theme}
        modelValue={text}
        onChange={setText}
        toolbars={toolbars}
        defToolbars={[
          <Mark key="mark" trigger={<span>标记</span>}></Mark>,
          <Emoji key="emoji" trigger={<span>表情</span>}></Emoji>
        ]}
      />
    </StrictMode>
  );
};

export default App;
