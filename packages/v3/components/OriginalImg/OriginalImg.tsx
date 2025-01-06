import { defineComponent } from 'vue';
import { NormalToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { ImagePlus } from 'lucide-vue-next';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { prefix } from '@vavt/utils/src/static';

import { commomProps } from '../../common/props';

const OriginalImg = defineComponent({
  props: {
    ...commomProps
  },
  setup(props, ctx) {
    const onClick = () => {
      const generator: InsertContentGenerator = () => {
        return {
          targetValue: '<img src="" alt="" width="100%">',
          select: true,
          deviationStart: 10,
          deviationEnd: -22
        };
      };

      props.insert(generator);
    };

    return () => {
      const trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <NormalToolbar title={props.title || 'image'} onClick={onClick}>
          {trigger || <ImagePlus class={`${prefix}-icon`} />}
        </NormalToolbar>
      );
    };
  }
});

export default OriginalImg;
