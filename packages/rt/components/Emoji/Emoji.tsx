import React, { useCallback, useState } from 'react';
import { DropdownToolbar, Insert } from 'md-editor-rt';
import type { InsertContentGenerator } from 'md-editor-rt';
import { emojis as defaultEmoji } from '@md-editor-extension/data/src/default-emojis';

interface EmojiProps {
  /**
   * 可选的表情
   */
  emojis?: Array<string>;
  /**
   * 插入后是否选中内容
   */
  selectAfterInsert?: boolean;
  /**
   * 这个默认注入，不用提供
   */
  insert?: Insert;
  /**
   * 触发的组件
   */
  trigger: string | JSX.Element;
}

const Emoji = (props: EmojiProps) => {
  const {
    emojis = defaultEmoji,
    insert = () => null,
    trigger,
    selectAfterInsert = true
  } = props;

  const [visible, setVisible] = useState(false);

  const emojiHandler = useCallback(
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
      title="emoji"
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
                    emojiHandler(emoji);
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
    ></DropdownToolbar>
  );
};

export default Emoji;
