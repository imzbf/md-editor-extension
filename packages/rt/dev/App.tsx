import data from '@vavt/data/src/markdown-demo.md';
import { message } from '@vavt/message';
import { MdEditor, PreviewThemes, Themes, ToolbarNames } from 'md-editor-rt';
import React, { useState, StrictMode, useCallback, useRef } from 'react';

import 'md-editor-rt/lib/style.css';

import { Mark, Emoji, OriginalImg, ExportPDF, ThemeSwitch, PreviewThemeSwitch } from '../components';

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
  4,
  5,
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

const onSuccess = () => {
  message.success('导出成功！', {
    zIndex: 999999
  });
};

const App = () => {
  const pdfRef = useRef<any>();
  const [text, setText] = useState(data);
  const [theme, setTheme] = useState<Themes>('light');
  const [previewTheme, setPreviewTheme] = useState<PreviewThemes>('default');

  const changeTheme = useCallback(() => {
    setTheme((_theme) => (_theme === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <StrictMode>
      <button onClick={changeTheme}>{theme}</button>
      <button
        onClick={() => {
          pdfRef.current?.trigger();
        }}
      >
        导出
      </button>
      <MdEditor
        theme={theme}
        previewTheme={previewTheme}
        value={text}
        showToolbarName
        onChange={setText}
        toolbars={toolbars}
        defToolbars={[
          <Mark key="mark" />,
          <Emoji key="emoji" />,
          <OriginalImg key="originalImg" />,
          <ExportPDF
            key="exportPDF"
            ref={pdfRef}
            value={text}
            onStart={() => {
              console.log('onStart');
            }}
            onSuccess={onSuccess}
          />,

          <ThemeSwitch value={theme} onChange={setTheme} key="ThemeSwitch" />,

          <PreviewThemeSwitch
            value={previewTheme}
            onChange={setPreviewTheme}
            closeAfterSelect={false}
            key="PreviewThemeSwitch"
          />
        ]}
      />
    </StrictMode>
  );
};

export default App;
