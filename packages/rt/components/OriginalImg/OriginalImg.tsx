import React, { useCallback } from 'react';
import { NormalToolbar } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';
import { ImagePlus } from 'lucide-react';
import { prefix } from '@vavt/utils/src/static';

import { CommomProps } from '../../common/props';

interface Props extends CommomProps {}

const OriginalImg = ({ title = 'mark', insert = () => {}, trigger }: Props) => {
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
    <NormalToolbar title={title} onClick={onClick}>
      {trigger || <ImagePlus className={`${prefix}-icon`} />}
    </NormalToolbar>
  );
};

export default OriginalImg;
