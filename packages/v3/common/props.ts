import { Insert, PreviewThemes, Themes } from 'md-editor-v3';
import type { PropType, VNode } from 'vue';

export const commomProps = {
  /**
   * ==这个默认注入，不用提供
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => null
  },
  language: {
    type: String as PropType<string>,
    default: ''
  },
  theme: {
    type: String as PropType<Themes>,
    default: undefined
  },
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: undefined
  },
  codeTheme: {
    type: String as PropType<string>,
    default: undefined
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  showToolbarName: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  /**
   * ==结束
   */
  /**
   * hover显示，或者开启工具栏描述时展示在图标下方
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * 显示在工具栏上的内容
   */
  trigger: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  }
};
