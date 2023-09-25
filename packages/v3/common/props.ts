import { Insert } from 'md-editor-v3';
import type { PropType } from 'vue';

export const commomProps = {
  /**
   * 这个默认注入，不用提供
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => null
  },
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
    type: [String, Object] as PropType<string | JSX.Element>,
    default: ''
  }
};
