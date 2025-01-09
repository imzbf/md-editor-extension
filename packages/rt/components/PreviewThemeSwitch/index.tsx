import React, { ReactNode, useState } from 'react';
import { DropdownToolbar, PreviewThemes } from 'md-editor-rt';
import { SwatchBook } from 'lucide-react';

import { prefix } from '@vavt/utils/src/static';
import { DEFAULT_EXTRA_OPTIONS, DEFAULT_OPTIONS } from '@vavt/data/src';
import { CommomProps } from '../../common/props';

interface Props extends CommomProps {
  value: string;
  onChange: (value: PreviewThemes) => void;
  options?: Array<{ value: string; label: string }>;
  extraOptions?: Array<{ value: string; label: string }>;
  closeAfterSelect?: boolean;
  children?: ReactNode;
}

const ThemeDropdown = (props: Props) => {
  const { options = DEFAULT_OPTIONS, extraOptions = DEFAULT_EXTRA_OPTIONS } = props;
  const [visible, setVisible] = useState(false);

  return (
    <DropdownToolbar
      title={props.title || props.value}
      visible={visible}
      onChange={setVisible}
      disabled={props.disabled}
      overlay={
        <ul className={`${prefix}-menu`} role="menu">
          {options.concat(extraOptions).map((option) => (
            <li
              className={`${prefix}-menu-item${option.value === props.value ? ' active' : ''}`}
              role="menuitem"
              tabIndex={0}
              key={option.value}
              onClick={() => {
                if (props.closeAfterSelect) {
                  setVisible(false);
                }
                props.onChange(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      }
    >
      {props.children || <SwatchBook className={`${prefix}-icon`} />}

      {props.showToolbarName && (
        <div className={`${prefix}-toolbar-item-name`}>{props.title || props.value}</div>
      )}
    </DropdownToolbar>
  );
};

export default ThemeDropdown;
