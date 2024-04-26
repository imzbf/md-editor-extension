import { defineComponent } from 'vue';
import { NormalToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { getSlot } from '@vavt/utils/src/vue-tsx';

import { commomProps } from '../../common/props';

const Mark = defineComponent({
  props: {
    ...commomProps
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
          title={props.title || 'mark'}
          onClick={markHandler}
          trigger={trigger || <span class="mee-iconfont icon-mee-mark" />}
        />
      );
    };
  }
});

export default Mark;
