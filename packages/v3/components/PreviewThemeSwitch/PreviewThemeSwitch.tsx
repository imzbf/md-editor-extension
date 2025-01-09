import { defineComponent, PropType, reactive } from 'vue';
import { DropdownToolbar } from 'md-editor-v3';
import { SwatchBook } from 'lucide-vue-next';

import { getSlot } from '@vavt/utils/src/vue-tsx';
import { prefix } from '@vavt/utils/src/static';
import { DEFAULT_EXTRA_OPTIONS, DEFAULT_OPTIONS } from '@vavt/data/src';
import { commomProps } from '../../common/props';

const ThemeDropdown = defineComponent({
  name: 'PreviewThemeSwitch',
  props: {
    ...commomProps,
    /**
     * 当前选中值
     */
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      default: undefined
    },
    /**
     * 待选项
     */
    options: {
      type: Array as PropType<
        Array<{
          value: string;
          label: string;
        }>
      >,
      default: () => DEFAULT_OPTIONS
    },
    /**
     * 额外的选项
     */
    extraOptions: {
      type: Array as PropType<
        Array<{
          value: string;
          label: string;
        }>
      >,
      default: () => DEFAULT_EXTRA_OPTIONS
    },
    /**
     * 选中后是否关闭
     */
    closeAfterSelect: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const state = reactive({
      visible: false
    });

    const onChange = (visible: boolean) => {
      state.visible = visible;
    };

    return () => {
      return (
        <DropdownToolbar
          title={props.title || props.modelValue}
          visible={state.visible}
          onChange={onChange}
          disabled={props.disabled}
          overlay={
            <ul class={`${prefix}-menu`} role="menu">
              {props.options.concat(props.extraOptions).map((option) => (
                <li
                  class={`${prefix}-menu-item${option.value === props.modelValue ? ' active' : ''}`}
                  role="menuitem"
                  tabindex="0"
                  key={option.value}
                  onClick={() => {
                    if (props.closeAfterSelect) {
                      state.visible = false;
                    }
                    props.onChange?.(option.value);
                    ctx.emit('update:modelValue', option.value);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          }
        >
          {getSlot({ props, ctx }) || <SwatchBook class={`${prefix}-icon`} />}

          {props.showToolbarName && (
            <div class={`${prefix}-toolbar-item-name`}>
              {props.title || props.modelValue}
            </div>
          )}
        </DropdownToolbar>
      );
    };
  }
});

export default ThemeDropdown;
