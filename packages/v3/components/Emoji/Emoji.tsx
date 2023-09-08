import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import { DropdownToolbar, Insert } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { emojis } from '@vavt/data/src/default-emojis';

const Emoji = defineComponent({
  props: {
    /**
     * 可选的表情
     */
    emojis: {
      type: Array as PropType<Array<string>>,
      default: emojis
    },
    /**
     * 插入后选中内容
     */
    selectAfterInsert: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 这个默认注入，不用提供
     */
    insert: {
      type: Function as PropType<Insert>,
      default: () => () => null
    },
    /**
     * 触发的组件
     */
    trigger: {
      type: [String, Object] as PropType<string | JSX.Element>,
      default: ''
    }
  },
  setup(props, ctx) {
    const state = reactive({
      visible: false
    });

    const emojiHandler = (emoji: string) => {
      const generator: InsertContentGenerator = () => {
        return {
          targetValue: emoji,
          select: props.selectAfterInsert,
          deviationStart: 0,
          deviationEnd: 0
        };
      };

      props.insert(generator);
    };

    const onChange = (visible: boolean) => {
      state.visible = visible;
    };

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <DropdownToolbar
          title="emoji"
          visible={state.visible}
          onChange={onChange}
          trigger={trigger}
          overlay={
            <div class="emoji-container">
              <ol class="emojis">
                {emojis.map((emoji) => {
                  return (
                    <li
                      key={`emoji-${emoji}`}
                      onClick={() => {
                        emojiHandler(emoji);
                      }}
                      innerHTML={emoji}
                    />
                  );
                })}
              </ol>
            </div>
          }
        ></DropdownToolbar>
      );
    };
  }
});

export default Emoji;
