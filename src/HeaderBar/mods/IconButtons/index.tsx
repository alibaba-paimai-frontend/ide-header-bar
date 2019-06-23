import React, { Component, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { StyledButton } from './styles';

export interface IIconButtonsEvents {
  /**
   * 点击按钮的回调函数
   */
  onClickButton?: (
    button: IIconButtons,
  ) => void;
}

export interface IIconButtons {
  title: string; // 按钮文案
  id: string; // 对应的 id,
  icon?: string; // 对应的图标
}

export interface IIconButtonsProps extends IIconButtonsEvents {
  /**
   * 按钮区域
   */
  buttons?: IIconButtons[];
}

/**
 * buttons 子组件
 */
export const Buttons: React.FunctionComponent<
  IIconButtonsProps
> = observer(props => {
  const { buttons, onClickButton } = props;

  if (!buttons || !buttons.length) return null;

  const onClick = useCallback(
    button => () => {
      onClickButton && onClickButton(button);
    },
    [onClickButton]
  );
  return (
    <>
      {buttons.map(button => {
        const { title, id, icon } = button;
        return (
          <StyledButton
            key={id}
            type="primary"
            className="btnSave"
            onClick={onClick(button)}
            icon={icon}
          >
            {title}
          </StyledButton>
        );
      })}
    </>
  );
});
