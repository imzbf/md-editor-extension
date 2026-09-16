import { Moon, Sun } from '@lucide/vue';
import { prefix } from '@vavt/utils/src/static';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { NormalToolbar, Themes } from 'md-editor-v3';
import { defineComponent, PropType } from 'vue';

import { commomProps } from '../../common/props';

const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  props: {
    ...commomProps,
    /**
     * 当前选中值
     */
    modelValue: {
      type: String as PropType<Themes>,
      default: 'light'
    },
    onChange: {
      type: Function as PropType<(value: Themes) => void>,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const onClick = () => {
      const value = props.modelValue === 'light' ? 'dark' : 'light';
      props.onChange?.(value);
      ctx.emit('update:modelValue', value);
    };

    return () => {
      // 自定义内容优先；只在未提供插槽时根据主题选择默认图标。
      const trigger = getSlot({ props, ctx });

      return (
        <NormalToolbar title={props.title || props.modelValue} disabled={props.disabled} onClick={onClick}>
          {trigger ||
            (props.modelValue === 'light' ? <Moon class={`${prefix}-icon`} /> : <Sun class={`${prefix}-icon`} />)}

          {props.showToolbarName && <div class={`${prefix}-toolbar-item-name`}>{props.title || props.modelValue}</div>}
        </NormalToolbar>
      );
    };
  }
});

export default ThemeSwitch;
