import React, { useState, StrictMode, useCallback, useRef } from 'react';
import { MdEditor, Themes, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { message } from '@vavt/message';

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

let updateRatio: ((str: string) => void) | undefined;
let closrRatio = () => {};

const onProgress = ({ ratio }: any) => {
  if (updateRatio) {
    updateRatio(`Progress: ${ratio * 100}%`);
  } else {
    const { close, update } = message.info(`Progress: ${ratio * 100}%`, {
      zIndex: 999999,
      duration: 0
    });

    updateRatio = update;
    closrRatio = close;
  }
};

const onSuccess = () => {
  closrRatio();

  setTimeout(() => {
    updateRatio = undefined;
  }, 100);

  message.success('导出成功！', {
    zIndex: 999999
  });
};

const App = () => {
  const pdfRef = useRef<any>();
  const [text, setText] = useState(data);
  const [theme, setTheme] = useState<Themes>('light');

  const changeTheme = useCallback(() => {
    setTheme((_theme) => (_theme === 'dark' ? 'light' : 'dark'));
  }, []);

  const customizePdf = useCallback((pdfIns: any) => {
    // 获取总页数
    const totalPages = pdfIns.internal.getNumberOfPages();
    const pageWidth = pdfIns.internal.pageSize.getWidth();
    const pageHeight = pdfIns.internal.pageSize.getHeight();

    // 遍历每页并添加页码
    for (let i = 1; i <= totalPages; i++) {
      // 设置当前页
      pdfIns.setPage(i);
      // 设置字体大小
      pdfIns.setFontSize(10);
      pdfIns.text(
        // 页码格式
        `Page ${i}, Total ${totalPages}`,
        // 居中
        pageWidth / 2,
        // 底部距离
        pageHeight - 1,
        { align: 'center' }
      );
    }
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
        value={text}
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
            customize={customizePdf}
            onProgress={onProgress}
            onStart={() => {
              console.log('onStart');
            }}
            onSuccess={onSuccess}
          />
        ]}
      />
    </StrictMode>
  );
};

export default App;
