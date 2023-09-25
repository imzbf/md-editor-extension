import { defineComponent, reactive, ref } from 'vue';
import type { PropType } from 'vue';
import { MdPreview, ModalToolbar } from 'md-editor-v3';
import html2pdf from 'html2pdf.js';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { prefix } from '@vavt/utils/src/static';
import { commomProps } from '../../common/props';

const DEFAULT_TITLE = 'Export as PDF';
const DEFAULT_TITLE_CN = '导出为PDF';

const EXPORT_BTN_TEXT = 'Export';
const EXPORT_BTN_TEXT_CN = '导出';

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
    }
  },
  setup(props, ctx) {
    const content = ref();

    const state = reactive({
      visible: false
    });

    const opt = {
      margin: 10,
      filename: `${props.fileName}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      // 智能分页，防止图片被截断
      pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      // 支持文本中放链接，可点击跳转
      enableLinks: true
    };

    const onClick = () => {
      html2pdf(content.value, opt).then(console.log).catch(console.error);
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
          trigger={trigger}
        >
          <div class="export-pdf-content" ref={content}>
            <MdPreview
              editorId="export-pdf-preview"
              theme={props.theme}
              language={props.language}
              modelValue={props.modelValue}
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
