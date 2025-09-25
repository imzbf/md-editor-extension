import React, {
  useCallback,
  CSSProperties,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef
} from 'react';
import { MdPreview, ModalToolbar, ExposePreviewParam, MdHeadingId } from 'md-editor-rt';
import { Printer } from 'lucide-react';
import { prefix } from '@vavt/utils/src/static';
import { CommomProps } from '../../common/props';

const DEFAULT_TITLE = 'Export as PDF';
const DEFAULT_TITLE_CN = '导出为PDF';

const EXPORT_BTN_TEXT = 'Export';
const EXPORT_BTN_TEXT_CN = '导出';

const EDITOR_ID = 'export-pdf-preview';

interface Props extends CommomProps {
  width?: string;
  height?: string;
  modalTitle?: string;
  value?: string;
  exportBtnText?: string;
  style?: CSSProperties;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
  noIconfont?: boolean;
  noHighlight?: boolean;
  noImgZoomIn?: boolean;
  noKatex?: boolean;
  noMermaid?: boolean;
  noEcharts?: boolean;
}

/**
 * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
 *
 * @see https://github.com/imzbf/md-editor-v3/issues/207
 **/
const headingId: MdHeadingId = ({ index }) => `pdf-ex-heading-${index}`;

const ExportPDF = forwardRef((props: Props, ref: ForwardedRef<unknown>) => {
  const {
    width = '870px',
    height = '600px',
    trigger,
    style = {},
    disabled,
    showToolbarName
  } = props;

  const [visible, setVisible] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const previewRef = useRef<ExposePreviewParam>(null);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const onClick = useCallback(() => {
    const target = document.querySelector('#export-pdf-preview');
    if (!target) {
      const error = new Error('No target element found for PDF export.');
      props.onError?.(error);
      return;
    }

    props.onStart?.();

    window.onafterprint = () => {
      window.onafterprint = null;
      props.onSuccess?.();
    };

    window.print();
  }, [props]);

  useImperativeHandle(ref, () => {
    return {
      trigger: onClick
    };
  }, [onClick]);

  return (
    <ModalToolbar
      className="export-pdf-modal"
      width={width}
      height={height}
      visible={visible}
      title={
        props.title || (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)
      }
      modalTitle={
        props.modalTitle ||
        (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)
      }
      onClick={open}
      onClose={close}
      trigger={
        <>
          {trigger || <Printer className={`${prefix}-icon`} />}
          {showToolbarName && (
            <div className={`${prefix}-toolbar-item-name`}>
              {props.title ||
                (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)}
            </div>
          )}
        </>
      }
      disabled={disabled}
    >
      <div className="export-pdf-content" ref={content}>
        <MdPreview
          ref={previewRef}
          id={EDITOR_ID}
          theme={props.theme}
          codeTheme={props.codeTheme}
          previewTheme={props.previewTheme}
          language={props.language}
          value={props.value || ''}
          mdHeadingId={headingId}
          style={style}
          codeFoldable={false}
          showCodeRowNumber={false}
          noHighlight={props.noHighlight}
          noImgZoomIn={props.noImgZoomIn}
          noKatex={props.noKatex}
          noMermaid={props.noMermaid}
          noEcharts={props.noEcharts}
        />
      </div>
      <div className={`${prefix}-form-item`}>
        <button className={`${prefix}-btn`} type="button" onClick={onClick}>
          {props.exportBtnText ||
            (props.language === 'zh-CN' ? EXPORT_BTN_TEXT_CN : EXPORT_BTN_TEXT)}
        </button>
      </div>
    </ModalToolbar>
  );
});

export default ExportPDF;
