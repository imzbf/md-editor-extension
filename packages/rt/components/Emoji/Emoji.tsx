import React, { useCallback, useState } from 'react';
import { DropdownToolbar } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';
import { emojis as defaultEmoji } from '@vavt/data/src/default-emojis';
import { CommomProps } from '../../common/props';

interface Props extends CommomProps {
  /**
   * 可选的表情
   */
  emojis?: Array<string>;
  /**
   * 插入后是否选中内容
   */
  selectAfterInsert?: boolean;
}

const Emoji = (props: Props) => {
  const {
    title = 'emoji',
    emojis = defaultEmoji,
    insert = () => null,
    trigger,
    selectAfterInsert = true
  } = props;

  const [visible, setVisible] = useState(false);

  const onClick = useCallback(
    (emoji: string) => {
      const generator: InsertContentGenerator = () => {
        return {
          targetValue: emoji,
          select: selectAfterInsert,
          deviationStart: 0,
          deviationEnd: 0
        };
      };

      insert(generator);
    },
    [insert, selectAfterInsert]
  );

  return (
    <DropdownToolbar
      title={title}
      visible={visible}
      onChange={setVisible}
      trigger={trigger}
      overlay={
        <div className="emoji-container">
          <ol className="emojis">
            {emojis.map((emoji) => {
              return (
                <li
                  key={`emoji-${emoji}`}
                  onClick={() => {
                    onClick(emoji);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: emoji
                  }}
                />
              );
            })}
          </ol>
        </div>
      }
    />
  );
};

export default Emoji;
