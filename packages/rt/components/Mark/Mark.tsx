import React, { useCallback } from 'react';
import { NormalToolbar, Insert } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';

interface MarkProps {
  insert?: Insert;
  trigger: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const Mark = ({ insert = () => {}, trigger }: MarkProps) => {
  const markHandler = useCallback(() => {
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
    <NormalToolbar title="mark" onClick={markHandler} trigger={trigger}></NormalToolbar>
  );
};

export default Mark;
