import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { NormalToolbar, Insert } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { getSlot } from '@vavt/utils/src/vue-tsx';

const Mark = defineComponent({
  props: {
    insert: {
      type: Function as PropType<Insert>,
      default: () => () => null
    },
    trigger: {
      type: [String, Object] as PropType<string | JSX.Element>,
      default: ''
    }
  },
  setup(props, ctx) {
    const markHandler = () => {
      const generator: InsertContentGenerator = (selectedText) => {
        return {
          targetValue: `==${selectedText}==`,
          select: true,
          deviationStart: 2,
          deviationEnd: -2
        };
      };

      props.insert(generator);
    };

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <NormalToolbar
          title="mark"
          onClick={markHandler}
          trigger={trigger}
        ></NormalToolbar>
      );
    };
  }
});

export default Mark;
