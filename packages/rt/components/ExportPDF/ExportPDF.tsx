import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MdPreview, ModalToolbar } from 'md-editor-rt';
import html2pdf from 'html2pdf.js';
import { prefix } from '@vavt/utils/src/static';
import { CommomProps } from '../../common/props';

const DEFAULT_TITLE = 'Export as PDF';
const DEFAULT_TITLE_CN = '导出为PDF';

const EXPORT_BTN_TEXT = 'Export';
const EXPORT_BTN_TEXT_CN = '导出';

interface Props extends CommomProps {
  width?: string;
  height?: string;
  modalTitle?: string;
  modelValue: string;
  fileName?: string;
  exportBtnText?: string;
}

/**
 * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
 *
 * @see https://github.com/imzbf/md-editor-v3/issues/207
 **/
const headingId = (_text: string, _level: number, index: number) =>
  `pdf-ex-heading-${index}`;

const ExportPDF = (props: Props) => {
  const { width = '870px', height = '600px', fileName = 'md' } = props;

  const [visible, setVisible] = useState(false);
  const content = useRef<HTMLDivElement>(null);

  const opt = useMemo(() => {
    return {
      margin: 10,
      filename: `${fileName}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      // 智能分页，防止图片被截断
      pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      // 支持文本中放链接，可点击跳转
      enableLinks: true
    };
  }, [fileName]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const onClick = useCallback(() => {
    html2pdf(content.current, opt).then(console.log).catch(console.error);
  }, [opt]);

  return (
    <ModalToolbar
      width={width}
      height={height}
      visible={visible}
      title={props.title || props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE}
      modalTitle={
        props.modalTitle || props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE
      }
      onClick={open}
      onClose={close}
      trigger={props.trigger}
    >
      <div className="export-pdf-content" ref={content}>
        <MdPreview
          editorId="export-pdf-preview"
          theme={props.theme}
          language={props.language}
          modelValue={props.modelValue}
          mdHeadingId={headingId}
        />
      </div>

      <div className={`${prefix}-form-item`}>
        <button className={`${prefix}-btn`} type="button" onClick={onClick}>
          {props.exportBtnText || props.language === 'zh-CN'
            ? EXPORT_BTN_TEXT_CN
            : EXPORT_BTN_TEXT}
        </button>
      </div>
    </ModalToolbar>
  );
};

export default ExportPDF;
