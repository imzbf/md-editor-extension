import React, { ReactNode, useCallback } from 'react';
import { NormalToolbar, Themes } from 'md-editor-rt';
import { Moon, Sun } from 'lucide-react';
import { prefix } from '@vavt/utils/src/static';

import { CommomProps } from '../../common/props';

interface Props extends CommomProps {
  value: string;
  onChange: (value: Themes) => void;
  children?: ReactNode;
}

const Mark = (props: Props) => {
  const onClick = useCallback(() => {
    const value = props.value === 'light' ? 'dark' : 'light';
    props.onChange?.(value);
  }, [props]);

  return (
    <NormalToolbar
      title={props.title || props.value}
      onClick={onClick}
      disabled={props.disabled}
    >
      {props.children || props.value === 'light' ? (
        <Moon className={`${prefix}-icon`} />
      ) : (
        <Sun className={`${prefix}-icon`} />
      )}

      {props.showToolbarName && (
        <div className={`${prefix}-toolbar-item-name`}>{props.title || props.value}</div>
      )}
    </NormalToolbar>
  );
};

export default Mark;
