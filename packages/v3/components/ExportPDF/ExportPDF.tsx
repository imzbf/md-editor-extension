/* eslint-disable vue/require-default-prop */
import { defineComponent, reactive, ref, CSSProperties } from 'vue';
import type { PropType } from 'vue';
import { MdPreview, ModalToolbar, ExposePreviewParam } from 'md-editor-v3';
import html2pdf from 'html2pdf.js';
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
      type: Function as PropType<() => void>
    },
    onSuccess: {
      type: Function as PropType<() => void>
    },
    onError: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type: Function as PropType<(err: unknown) => void>
    }
  },
  emits: ['onStart', 'onSuccess', 'onError'],
  setup(props, ctx) {
    const content = ref();

    const previewRef = ref<ExposePreviewParam>();

    const state = reactive({
      visible: false
    });

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
          scale: 2,
          useCORS: true
        },
        // 智能分页，防止图片被截断
        pagebreak: { mode: 'avoid-all' }
        // 支持文本中放链接，可点击跳转，默认true
        // enableLinks: true
      };

      props.onStart ? props.onStart() : ctx.emit('onStart');
      html2pdf()
        .set(opt)
        .from(content.value)
        .save()
        .then(() => {
          props.onSuccess ? props.onSuccess() : ctx.emit('onSuccess');
        })
        .catch((error: unknown) => {
          props.onError ? props.onError(error) : ctx.emit('onError', error);
        })
        .finally(() => {
          previewRef.value?.rerender();
        });
    };

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <ModalToolbar
          width={props.width}
          height={props.height}
          visible={state.visible}
          title={
            props.title || props.language === 'zh-CN' ? DEFAULT_TITLE_CN : DEFAULT_TITLE
          }
          modalTitle={
            props.modalTitle || props.language === 'zh-CN'
              ? DEFAULT_TITLE_CN
              : DEFAULT_TITLE
          }
          onClick={() => {
            state.visible = true;
          }}
          onClose={() => {
            state.visible = false;
          }}
          trigger={trigger || <span className="mee-iconfont icon-mee-pdf" />}
        >
          <div class="export-pdf-content" ref={content}>
            <MdPreview
              ref={previewRef}
              editorId={EDITOR_ID}
              theme={props.theme}
              previewTheme={props.previewTheme}
              language={props.language}
              modelValue={props.modelValue}
              mdHeadingId={headingId}
              style={props.style}
            />
          </div>

          <div class={`${prefix}-form-item`}>
            <button class={`${prefix}-btn`} type="button" onClick={onClick}>
              {props.exportBtnText || props.language === 'zh-CN'
                ? EXPORT_BTN_TEXT_CN
                : EXPORT_BTN_TEXT}
            </button>
          </div>
        </ModalToolbar>
      );
    };
  }
});

export default ExportPDF;
