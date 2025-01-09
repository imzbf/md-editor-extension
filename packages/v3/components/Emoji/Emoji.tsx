import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import { DropdownToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { Smile } from 'lucide-vue-next';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { emojis } from '@vavt/data/src/default-emojis';
import { prefix } from '@vavt/utils/src/static';

import { commomProps } from '../../common/props';

const Emoji = defineComponent({
  props: {
    ...commomProps,
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
          title={props.title || 'emoji'}
          visible={state.visible}
          onChange={onChange}
          disabled={props.disabled}
          overlay={
            <div class="emoji-container">
              <ol class="emojis">
                {props.emojis.map((emoji) => {
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
        >
          {trigger || <Smile class={`${prefix}-icon`} />}

          {props.showToolbarName && (
            <div class={`${prefix}-toolbar-item-name`}>{props.title || 'emoji'}</div>
          )}
        </DropdownToolbar>
      );
    };
  }
});

export default Emoji;
