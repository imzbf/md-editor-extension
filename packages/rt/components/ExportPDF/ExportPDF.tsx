import React, {
  useCallback,
  CSSProperties,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef
} from 'react';
import { MdPreview, ModalToolbar, ExposePreviewParam } from 'md-editor-rt';
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
  /**
   * @deprecated replace with value
   */
  modelValue?: string;
  fileName?: string;
  exportBtnText?: string;
  style?: CSSProperties;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
  onProgress?: (progress: {
    val: number;
    state: string;
    n: number;
    stack: string[];
    ratio: number;
  }) => void;
  noIconfont?: boolean;
  noHighlight?: boolean;
  noImgZoomIn?: boolean;
  noKatex?: boolean;
  noMermaid?: boolean;
  /**
   * html2pdf配置项，它会覆盖默认配置！
   *
   * https://ekoopmans.github.io/html2pdf.js/
   */
  options?: object;
  /**
   * 自定义pdf
   *
   * @param ins html3pdf实例
   * @returns
   */
  customize?: (ins: unknown) => void;
}

/**
 * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
 *
 * @see https://github.com/imzbf/md-editor-v3/issues/207
 **/
const headingId = (_text: string, _level: number, index: number) =>
  `pdf-ex-heading-${index}`;

const ExportPDF = forwardRef((props: Props, ref: ForwardedRef<unknown>) => {
  const {
    width = '870px',
    height = '600px',
    trigger,
    fileName = 'md',
    style = {
      padding: '10mm'
    },
    options = {}
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

  const progressCallback = useCallback(
    (progress: {
      val: number;
      state: string;
      n: number;
      stack: string[];
      ratio: number;
    }) => {
      props.onProgress?.(progress);
    },
    [props]
  );

  const onClick = useCallback(() => {
    // https://ekoopmans.github.io/html2pdf.js/
    const opt = {
      // margin: 10,
      filename: `${fileName}.pdf`,
      // https://html2canvas.hertzen.com/configuration
      html2canvas: {
        scale: 3,
        useCORS: true
      },
      // tested Firefox max 9 pages, Chromium max 19 pages
      pagesPerCanvas: navigator.userAgent.includes('Chrome') ? 19 : 9,
      // 智能分页，防止图片被截断
      pagebreak: { mode: 'avoid-all' },
      // 支持文本中放链接，可点击跳转，默认true
      // enableLinks: true
      ...options
    };

    props.onStart?.();
    import('html3pdf').then((ins) => {
      const pdf = ins.default().set(opt).from(content.current);

      pdf
        .toPdf()
        .get('pdf')
        .then((pdfInstance: any) => {
          props.customize?.(pdfInstance);
        })
        .then(() => {
          pdf
            .save()
            .listen(progressCallback)
            .then(() => {
              props.onSuccess?.();
            })
            .catch((error: unknown) => {
              props.onError?.(error);
            })
            .finally(() => {
              previewRef.current?.rerender();
            });
        });
    });
  }, [fileName, options, progressCallback, props]);

  useImperativeHandle(
    ref,
    () => {
      return {
        trigger: onClick
      };
    },
    [onClick]
  );

  return (
    <ModalToolbar
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
      trigger={trigger || <Printer className={`${prefix}-icon`} />}
    >
      <div className="export-pdf-content" ref={content}>
        <MdPreview
          ref={previewRef}
          id={EDITOR_ID}
          theme={props.theme}
          codeTheme={props.codeTheme}
          previewTheme={props.previewTheme}
          language={props.language}
          value={props.value || props.modelValue || ''}
          mdHeadingId={headingId}
          style={style}
          codeFoldable={false}
          showCodeRowNumber={false}
          noHighlight={props.noHighlight}
          noImgZoomIn={props.noImgZoomIn}
          noKatex={props.noKatex}
          noMermaid={props.noMermaid}
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
