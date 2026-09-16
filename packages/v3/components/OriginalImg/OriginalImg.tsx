import { ImagePlus } from '@lucide/vue';
import { prefix } from '@vavt/utils/src/static';
import { getSlot } from '@vavt/utils/src/vue-tsx';
import { NormalToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';
import { defineComponent } from 'vue';

import { commomProps } from '../../common/props';

const OriginalImg = defineComponent({
  props: {
    ...commomProps
  },
  setup(props, ctx) {
    const onClick = () => {
      const generator: InsertContentGenerator = () => {
        // 保留原生 HTML 以支持 width 等属性；v7 需由使用方显式开启 markdown-it 的 html 解析。
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
        <NormalToolbar title={props.title || 'image'} onClick={onClick} disabled={props.disabled}>
          {trigger || <ImagePlus class={`${prefix}-icon`} />}

          {props.showToolbarName && <div class={`${prefix}-toolbar-item-name`}>{props.title || 'image'}</div>}
        </NormalToolbar>
      );
    };
  }
});

export default OriginalImg;
