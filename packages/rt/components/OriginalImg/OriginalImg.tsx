import { prefix } from '@vavt/utils/src/static';
import { ImagePlus } from 'lucide-react';
import { NormalToolbar } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';
import React, { useCallback } from 'react';

import { CommomProps } from '../../common/props';

type Props = CommomProps;

const OriginalImg = ({ title = 'image', insert = () => {}, trigger, disabled, showToolbarName }: Props) => {
  const onClick = useCallback(() => {
    const generator: InsertContentGenerator = () => {
      return {
        targetValue: '<img src="" alt="" width="100%">',
        select: true,
        deviationStart: 10,
        deviationEnd: -22
      };
    };

    insert(generator);
  }, [insert]);

  return (
    <NormalToolbar title={title} onClick={onClick} disabled={disabled}>
      {trigger || <ImagePlus className={`${prefix}-icon`} />}
      {showToolbarName && <div className={`${prefix}-toolbar-item-name`}>{title}</div>}
    </NormalToolbar>
  );
};

export default OriginalImg;
