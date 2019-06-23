import React, { useCallback } from 'react';
import { Row, Col, Icon } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import { StyledContainer, StyledLogo } from './styles';
import { ISubProps } from './subs';

import {
  Buttons,
  IIconButtonsEvents,
  IIconButtonsProps,
  IIconButtons
} from './mods/IconButtons/index';
import {
  IconTexts,
  IIconText,
  IIconTextEvents,
  IIconTextProps
} from './mods/IconTexts/index';

export { IIconButtons, IIconText };

export interface IHeaderBarEvent extends IIconButtonsEvents, IIconTextEvents {}

// export interface IHeaderBarStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IHeaderBarTheme extends IBaseTheme {
  main: string;
  second: string;
}

export interface IHeaderBarIconText {
  title: string; // 按钮文案
  id: string; // id 标示
  icon: string; // antd icon 名
  isActive?: boolean; // 是否高亮显示
}

export interface IHeaderBarProps
  extends IHeaderBarEvent,
    IIconButtonsProps,
    IIconTextProps,
    ISubProps,
    IBaseComponentProps {
  /**
   * 网站 logo 图，建议尺寸 210*60
   */
  logo?: string;
}

export const DEFAULT_PROPS: IHeaderBarProps = {
  logo: 'https://img.alicdn.com/tfs/TB1ysi8SpXXXXcJXpXXXXXXXXXX-210-60.jpg',
  buttons: [
    {
      id: 'save',
      title: '保存',
      icon: 'save'
    }
  ],
  iconTexts: [
    {
      title: '选取元素',
      icon: 'select',
      id: 'selection',
      isActive: true
    },
    {
      title: '全屏',
      icon: 'scan',
      id: 'fullscreen'
    },
    {
      title: '预览页面',
      icon: 'eye',
      id: 'preview'
    },
    {
      title: '历史记录',
      icon: 'clock-circle',
      id: 'history'
    }
  ],
  theme: {
    main: '#25ab68',
    second: '#333'
  },
  styles: {
    container: {}
  }
};

export const HeaderBarCurrying: TComponentCurrying<
  IHeaderBarProps,
  ISubProps
> = subComponents => props => {
  const {
    logo,
    buttons,
    iconTexts,
    styles,
    onClickButton,
    onClickIconText
  } = props;

  return (
    <StyledContainer
      style={styles.container}
      className="ide-header-bar-container"
    >
      <Row type="flex" justify="space-between" align="middle">
        <Col span={6}>
          <Row type="flex" justify="center" align="middle">
            <StyledLogo style={styles.logo} src={logo} alt="logo" />
          </Row>
        </Col>
        <Col span={18}>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={14}>
              <Buttons buttons={buttons} onClickButton={onClickButton} />
            </Col>
            <Col span={10}>
              <IconTexts
                iconTexts={iconTexts}
                onClickIconText={onClickIconText}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledContainer>
  );
};
