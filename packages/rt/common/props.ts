import { Insert, PreviewThemes, Themes } from 'md-editor-rt';
import { JSXElementConstructor, ReactElement } from 'react';

export interface CommomProps {
  /**
   * ==这个默认注入，不用提供
   */
  insert?: Insert;
  theme?: Themes;
  codeTheme?: string;
  previewTheme?: PreviewThemes;
  language?: string;
  /**
   * ==结束
   */
  /**
   * hover显示，或者开启工具栏描述时展示在图标下方
   */
  title?: string;
  /**
   * 显示在工具栏上的内容
   */
  trigger?: string | ReactElement<any, string | JSXElementConstructor<any>>;
}
