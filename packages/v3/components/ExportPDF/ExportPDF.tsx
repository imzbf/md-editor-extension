/* eslint-disable vue/require-default-prop */
import { defineComponent, reactive, ref, CSSProperties } from 'vue';
import type { PropType } from 'vue';
import { MdPreview, ModalToolbar, ExposePreviewParam } from 'md-editor-v3';
// import html2pdf from 'html3pdf';
import { Printer } from 'lucide-vue-next';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { prefix } from '@vavt/utils/src/static';
import { commomProps } from '../../common/props';

const DEFAULT_TITLE = 'Export as PDF';
const DEFAULT_TITLE_CN = '导出为PDF';

const EXPORT_BTN_TEXT = 'Export';
const EXPORT_BTN_TEXT_CN = '导出';

const EDITOR_ID = 'export-pdf-preview';

const ExportPDF = defineComponent({
  props: {
    ...commomProps,
    width: {
      type: String as PropType<string>,
      default: '870px'
    },
    height: {
      type: String as PropType<string>,
      default: '600px'
    },
    modalTitle: {
      type: String as PropType<string>,
      default: undefined
    },
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    fileName: {
      type: String as PropType<string>,
      default: 'md'
    },
    exportBtnText: {
      type: String as PropType<string>,
      default: undefined
    },
    style: {
      type: [Object, String] as PropType<string | CSSProperties>,
      default: () => ({
        padding: '10mm'
      })
    },
    onStart: {
      type: Function as PropType<() => void>,
      default: undefined
    },
    onSuccess: {
      type: Function as PropType<() => void>,
      default: undefined
    },
    onError: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type: Function as PropType<(err: unknown) => void>,
      default: undefined
    },
    onProgress: {
      type: Function as PropType<
        (progress: {
          val: number;
          state: string;
          n: number;
          stack: string[];
          ratio: number;
        }) => void
      >,
      default: undefined
    },
    noIconfont: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    noHighlight: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    noImgZoomIn: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    noKatex: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    noMermaid: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    /**
     * html2pdf配置项，它会覆盖默认配置！
     *
     * https://ekoopmans.github.io/html2pdf.js/
     */
    options: {
      type: Object as PropType<object>,
      default: () => {}
    },
    /**
     * 自定义pdf
     *
     * @param ins html3pdf实例
     * @returns
     */
    customize: {
      type: Function as PropType<(ins: unknown) => void>
    }
  },
  emits: ['onStart', 'onSuccess', 'onError', 'onProgress'],
  setup(props, ctx) {
    const content = ref();

    const previewRef = ref<ExposePreviewParam>();

    const state = reactive({
      visible: false
    });

    const progressCallback = (progress: {
      val: number;
      state: string;
      n: number;
      stack: string[];
      ratio: number;
    }) => {
      if (props.onProgress) {
        props.onProgress(progress);
      } else {
        ctx.emit('onProgress', progress);
      }
    };
    /**
     * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
     *
     * @see https://github.com/imzbf/md-editor-v3/issues/207
     **/
    const headingId = (_text: string, _level: number, index: number) =>
      `pdf-ex-heading-${index}`;

    const onClick = () => {
      // https://ekoopmans.github.io/html2pdf.js/
      const opt = {
        // margin: 10,
        filename: `${props.fileName}.pdf`,
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
        ...props.options
      };

      props.onStart ? props.onStart() : ctx.emit('onStart');
      import('html3pdf').then((ins) => {
        const pdf = ins.default().set(opt).from(content.value);

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
                props.onSuccess ? props.onSuccess() : ctx.emit('onSuccess');
              })
              .catch((error: unknown) => {
                props.onError ? props.onError(error) : ctx.emit('onError', error);
              })
              .finally(() => {
                previewRef.value?.rerender();
              });
          });
      });
    };

    ctx.expose({
      trigger: onClick
    });

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <ModalToolbar
          width={props.width}
          height={props.height}
          visible={state.visible}
          disabled={props.disabled}
          title={
            props.title || (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)
          }
          modalTitle={
            props.modalTitle ||
            (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)
          }
          onClick={() => {
            state.visible = true;
          }}
          onClose={() => {
            state.visible = false;
          }}
          trigger={
            <>
              {trigger || <Printer class={`${prefix}-icon`} />}
              {props.showToolbarName && (
                <div class={`${prefix}-toolbar-item-name`}>
                  {props.title ||
                    (props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE)}
                </div>
              )}
            </>
          }
        >
          <div class="export-pdf-content" ref={content}>
            <MdPreview
              ref={previewRef}
              id={EDITOR_ID}
              theme={props.theme}
              codeTheme={props.codeTheme}
              previewTheme={props.previewTheme}
              language={props.language}
              modelValue={props.modelValue}
              mdHeadingId={headingId}
              style={props.style}
              codeFoldable={false}
              showCodeRowNumber={false}
              noHighlight={props.noHighlight}
              noImgZoomIn={props.noImgZoomIn}
              noKatex={props.noKatex}
              noMermaid={props.noMermaid}
            />
          </div>

          <div class={`${prefix}-form-item`}>
            <button class={`${prefix}-btn`} type="button" onClick={onClick}>
              {props.exportBtnText ||
                (props.language === 'zh-CN' ? EXPORT_BTN_TEXT_CN : EXPORT_BTN_TEXT)}
            </button>
          </div>
        </ModalToolbar>
      );
    };
  }
});

export default ExportPDF;
