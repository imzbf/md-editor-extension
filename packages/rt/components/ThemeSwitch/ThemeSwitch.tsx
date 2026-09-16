import { prefix } from '@vavt/utils/src/static';
import { Moon, Sun } from 'lucide-react';
import { NormalToolbar, Themes } from 'md-editor-rt';
import React, { ReactNode, useCallback } from 'react';

import { CommomProps } from '../../common/props';

interface Props extends CommomProps {
  value: string;
  onChange: (value: Themes) => void;
  children?: ReactNode;
}

const ThemeSwitch = (props: Props) => {
  const onClick = useCallback(() => {
    const value = props.value === 'light' ? 'dark' : 'light';
    props.onChange?.(value);
  }, [props]);

  return (
    <NormalToolbar title={props.title || props.value} onClick={onClick} disabled={props.disabled}>
      {/* 自定义内容优先；只在未提供 children 时根据主题选择默认图标。 */}
      {props.children ||
        (props.value === 'light' ? <Moon className={`${prefix}-icon`} /> : <Sun className={`${prefix}-icon`} />)}

      {props.showToolbarName && <div className={`${prefix}-toolbar-item-name`}>{props.title || props.value}</div>}
    </NormalToolbar>
  );
};

export default ThemeSwitch;
