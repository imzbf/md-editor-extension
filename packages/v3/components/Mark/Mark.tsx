import { prefix } from '@vavt/utils/src/static';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { Highlighter } from 'lucide-vue-next';
import { NormalToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { defineComponent } from 'vue';

import { commomProps } from '../../common/props';

const Mark = defineComponent({
  name: 'VavtMark',
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
        <NormalToolbar title={props.title || 'mark'} onClick={markHandler} disabled={props.disabled}>
          {trigger || <Highlighter class={`${prefix}-icon`} />}

          {props.showToolbarName && <div class={`${prefix}-toolbar-item-name`}>{props.title || 'mark'}</div>}
        </NormalToolbar>
      );
    };
  }
});

export default Mark;
