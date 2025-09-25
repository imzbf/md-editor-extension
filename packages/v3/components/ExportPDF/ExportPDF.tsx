/* eslint-disable vue/require-default-prop */
import { defineComponent, reactive, ref, CSSProperties } from 'vue';
import type { PropType } from 'vue';
import { MdPreview, ModalToolbar, ExposePreviewParam, MdHeadingId } from 'md-editor-v3';
import { Printer } from 'lucide-vue-next';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { prefix } from '@vavt/utils/src/static';
import { commomProps } from '../../common/props';

const DEFAULT_TITLE = 'Export as PDF';
const DEFAULT_TITLE_CN = '导出为PDF';

const EXPORT_BTN_TEXT = 'Export';
const EXPORT_BTN_TEXT_CN = '导出';

const EDITOR_ID = 'export-pdf-preview';

/**
 * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
 *
 * @see https://github.com/imzbf/md-editor-v3/issues/207
 **/
const headingId: MdHeadingId = ({ index }) => `pdf-ex-heading-${index}`;

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
    exportBtnText: {
      type: String as PropType<string>,
      default: undefined
    },
    style: {
      type: [Object, String] as PropType<string | CSSProperties>,
      default: () => ({})
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
    noEcharts: {
      type: Boolean as PropType<boolean>,
      default: undefined
    }
  },
  emits: ['onStart', 'onSuccess', 'onError'],
  setup(props, ctx) {
    const content = ref();

    const previewRef = ref<ExposePreviewParam>();

    const state = reactive({
      visible: false
    });

    const onClick = () => {
      const target = document.querySelector('#export-pdf-preview');
      if (!target) {
        const error = new Error('No target element found for PDF export.');
        props.onError?.(error);
        ctx.emit('onError', error);
        return;
      }

      props.onStart?.();
      ctx.emit('onStart');

      window.onafterprint = () => {
        window.onafterprint = null;
        props.onSuccess?.();
        ctx.emit('onSuccess');
      };

      window.print();
    };

    ctx.expose({
      trigger: onClick
    });

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <ModalToolbar
          class="export-pdf-modal"
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
              noEcharts={props.noEcharts}
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
