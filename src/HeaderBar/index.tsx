import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button, Icon } from 'antd';
import { ThemeProvider } from 'styled-components';

import { debugInteract, debugRender } from '../lib/debug';
import { pick } from '../lib/util';
import {
  StyledContainer,
  StyledLogo,
  StyledIconText,
  StyledButton
} from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { THeaderBarControlledKeys, CONTROLLED_KEYS } from './schema/index';

export interface IHeaderBarEvent {
  /**
   * 点击按钮的回调函数
   */
  onClickButton?: (
    button: IHeaderBarButton,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;

  /**
   * 点击 icon text 的回调函数
   */
  onClickIconText?: (iconText: IHeaderBarIconText) => void;
}

export interface IStyles {
  [propName: string]: React.CSSProperties;
}

export interface IHeaderBarStyles extends IStyles {
  container?: React.CSSProperties;
  logo?: React.CSSProperties;
}

export interface IHeaderBarTheme {
  main: string;
  second: string;
  [prop: string]: any;
}

export interface IHeaderBarButton {
  title: string; // 按钮文案
  id: string; // 对应的 id,
  icon?: string; // 对应的图标
}

export interface IHeaderBarIconText {
  title: string; // 按钮文案
  id: string; // id 标示
  icon: string; // antd icon 名
  isActive?: boolean; // 是否高亮显示
}

export interface IHeaderBarProps extends IHeaderBarEvent {
  /**
   * 网站 logo 图，建议尺寸 210*60
   */
  logo?: string;

  /**
   * 按钮区域
   */
  buttons?: IHeaderBarButton[];

  /**
   * 图标按钮区域
   */
  iconTexts?: IHeaderBarIconText[];

  /**
   * 设置主题
   */
  theme?: IHeaderBarTheme;

  /**
   * 样式集合，方便外部控制
   */
  styles?: IHeaderBarStyles;
}

/**
 * buttons 子组件
 *
 * @export
 * @class HeaderBarButtons
 * @extends {(Component<Pick<IHeaderBarProps, 'buttons' | 'onClickButton'>>)}
 */
@observer
export class HeaderBarButtons extends Component<
  Pick<IHeaderBarProps, 'buttons' | 'onClickButton'>
> {
  onClickButton = (button: IHeaderBarButton) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { onClickButton } = this.props;
    debugInteract(`[按钮点击] id: ${button.id}, title: ${button.title}`);
    onClickButton && onClickButton(button, e);
  };
  render() {
    const { buttons } = this.props;
    return (
      <React.Fragment>
        {(buttons.length > 0 &&
          buttons.map(button => {
            const { title, id, icon } = button;
            return (
              <StyledButton
                key={id}
                type="primary"
                className="btnSave"
                onClick={this.onClickButton(button)}
                icon={icon}
              >
                {title}
              </StyledButton>
            );
          })) ||
          null}
      </React.Fragment>
    );
  }
}

/**
 * icon texts 子组件
 *
 * @export
 * @class HeaderBarIconTexts
 * @extends {(Component<Pick<IHeaderBarProps, 'iconTexts' | 'onClickIconText'>>)}
 */
@observer
export class HeaderBarIconTexts extends Component<
  Pick<IHeaderBarProps, 'iconTexts' | 'onClickIconText'>
> {
  onClickIconText = (iconText: IHeaderBarIconText) => () => {
    const { onClickIconText } = this.props;
    debugInteract(
      `[icon text 点击] id: ${iconText.id}, title: ${iconText.title}`
    );
    onClickIconText && onClickIconText(iconText);
  };
  render() {
    const { iconTexts } = this.props;
    return (
      <Row type="flex" justify="space-around" align="middle">
        {(iconTexts.length > 0 &&
          iconTexts.map((iconText: IHeaderBarIconText) => {
            const { id, title, isActive, icon } = iconText;
            return (
              <Col key={id}>
                <StyledIconText
                  active={isActive}
                  onClick={this.onClickIconText(iconText)}
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
// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class HeaderBar extends Component<IHeaderBarProps> {
  public static defaultProps = DEFAULT_PROPS;
  // private root: React.RefObject<HTMLDivElement>;
  constructor(props: IHeaderBarProps) {
    super(props);
    // this.state = {};
    // this.root = React.createRef();
  }

  render() {
    const {
      logo,
      buttons,
      theme,
      iconTexts,
      styles,
      onClickButton,
      onClickIconText
    } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledContainer
          style={styles.container}
          // ref={this.root}
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
                  <HeaderBarButtons
                    buttons={buttons}
                    onClickButton={onClickButton}
                  />
                </Col>
                <Col span={10}>
                  <HeaderBarIconTexts
                    iconTexts={iconTexts}
                    onClickIconText={onClickIconText}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </StyledContainer>
      </ThemeProvider>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * 科里化创建 HeaderBarWithStore 组件
 * @param stores - store 模型实例
 */
export const HeaderBarAddStore = (stores: IStoresModel) => {
  return observer(function HeaderBarWithStore(
    props: Omit<IHeaderBarProps, THeaderBarControlledKeys>
  ) {
    const { ...otherProps } = props;
    const { model } = stores;
    const controlledProps = pick(model, CONTROLLED_KEYS);
    debugRender(`[${stores.id}] rendering`);
    return <HeaderBar {...controlledProps} {...otherProps} />;
  });
};
/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 HeaderBarWithStore 的上下文
 */
export const HeaderBarFactory = () => {
  const stores = StoresFactory(); // 创建 model
  const app = AppFactory(stores); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    HeaderBarWithStore: HeaderBarAddStore(stores)
  };
};
