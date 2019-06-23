import React, { Component, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Icon } from 'antd';

import { StyledIconText } from './styles';
import { debugInteract, debugRender } from '../../../lib/debug';

export interface IIconTextEvents {
  /**
   * 点击 icon text 的回调函数
   */
  onClickIconText?: (iconText: IIconText) => void;
}

export interface IIconText {
  title: string; // 按钮文案
  id: string; // id 标示
  icon: string; // antd icon 名
  isActive?: boolean; // 是否高亮显示
}

export interface IIconTextProps extends IIconTextEvents {
  /**
   * 图标按钮区域
   */
  iconTexts?: IIconText[];
}

/**
 * icon texts 子组件
 */
export const IconTexts: React.FunctionComponent<IIconTextProps> = observer(
  props => {
    const { iconTexts, onClickIconText } = props;

    const onClick = useCallback(
      (iconText: IIconText) => () => {
        debugInteract(
          `[icon text 点击] id: ${iconText.id}, title: ${iconText.title}`
        );
        onClickIconText && onClickIconText(iconText);
      },
      [props.onClickIconText]
    );
    return (
      <Row type="flex" justify="space-around" align="middle">
        {(iconTexts.length > 0 &&
          iconTexts.map((iconText: IIconText) => {
            const { id, title, isActive, icon } = iconText;
            return (
              <Col key={id}>
                <StyledIconText
                  active={isActive}
                  onClick={onClick(iconText)}
                  className="oper-wrap"
                >
                  <Icon className="oper-icon" type={icon} />
                  <span className="oper-name">{title}</span>
                </StyledIconText>
              </Col>
            );
          })) ||
          null}
      </Row>
    );
  }
);
