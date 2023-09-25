import React, { useState, StrictMode } from 'react';
import { MdEditor, Themes, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import data from '@vavt/data/src/markdown-demo.md';

import { Mark, Emoji, OriginalImg, ExportPDF } from '../components';

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
  2,
  3,
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
          <Mark key="mark" trigger={<span>标记</span>} />,
          <Emoji key="emoji" trigger={<span>表情</span>} />,
          <OriginalImg key="originalImg" trigger={<span>图片</span>} />,
          <ExportPDF key="exportPDF" modelValue={text} trigger={<span>pdf</span>} />
        ]}
      />
    </StrictMode>
  );
};

export default App;
