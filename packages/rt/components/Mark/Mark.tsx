import React, { useCallback } from 'react';
import { NormalToolbar } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';
import { Highlighter } from 'lucide-react';
import { prefix } from '@vavt/utils/src/static';

import { CommomProps } from '../../common/props';

interface Props extends CommomProps {}

const Mark = ({ title = 'mark', insert = () => {}, trigger }: Props) => {
  const onClick = useCallback(() => {
    const generator: InsertContentGenerator = (selectedText) => {
      return {
        targetValue: `==${selectedText}==`,
        select: true,
        deviationStart: 2,
        deviationEnd: -2
      };
    };

    insert(generator);
  }, [insert]);

  return (
    <NormalToolbar title={title} onClick={onClick}>
      {trigger || <Highlighter className={`${prefix}-icon`} />}
    </NormalToolbar>
  );
};

export default Mark;
