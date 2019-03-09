import React, { Component, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Icon } from 'antd';
import { pick } from 'ide-lib-utils';
import { based, Omit, IBaseTheme, IBaseComponentProps, IStoresEnv, useIndectedEvents } from 'ide-lib-base-component';


import { debugInteract, debugRender } from '../lib/debug';
import {
  StyledContainer,
  StyledLogo,
  StyledIconText,
  StyledButton
} from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { THeaderBarControlledKeys, CONTROLLED_KEYS } from './schema/index';
import { showConsole } from './solution';
export const a = {};
interface ISubComponents {
}

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

// export interface IHeaderBarStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IHeaderBarTheme extends IBaseTheme{
  main: string;
  second: string;
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

export interface IHeaderBarProps extends IHeaderBarEvent, IBaseComponentProps{
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

};


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

/**
 * buttons 子组件
 */
export const HeaderBarButtons: React.FunctionComponent<Pick<IHeaderBarProps, 'buttons' | 'onClickButton'>> = observer((props)=>{
  const onClickButton = useCallback((button: IHeaderBarButton) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    debugInteract(`[按钮点击] id: ${button.id}, title: ${button.title}`);
    props.onClickButton && props.onClickButton(button, e);
  }, [props.onClickButton]);

  const { buttons } = props;

  return <React.Fragment>
    {(buttons.length > 0 &&
      buttons.map(button => {
        const { title, id, icon } = button;
        return (
          <StyledButton
            key={id}
            type="primary"
            className="btnSave"
            onClick={onClickButton(button)}
            icon={icon}
          >
            {title}
          </StyledButton>
        );
      })) ||
      null}
  </React.Fragment>;
});
HeaderBarButtons.displayName = 'HeaderBarButtons';


/**
 * icon texts 子组件
 */
export const HeaderBarIconTexts: React.FunctionComponent<Pick<IHeaderBarProps, 'iconTexts' | 'onClickIconText'>> = observer((props) => {
  
  const { iconTexts } = props;

  const onClickIconText = useCallback((iconText: IHeaderBarIconText) => () => {
    debugInteract(
      `[icon text 点击] id: ${iconText.id}, title: ${iconText.title}`
    );
    props.onClickIconText && props.onClickIconText(iconText);
  }, [props.onClickIconText]);
  return (
    <Row type="flex" justify="space-around" align="middle">
      {(iconTexts.length > 0 &&
        iconTexts.map((iconText: IHeaderBarIconText) => {
          const { id, title, isActive, icon } = iconText;
          return (
            <Col key={id}>
              <StyledIconText
                active={isActive}
                onClick={onClickIconText(iconText)}
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
});
HeaderBarIconTexts.displayName = 'HeaderBarIconTexts';

/**
 * 使用高阶组件打造的组件生成器
 * @param subComponents - 子组件列表
 */
export const HeaderBarHOC: (subComponents: ISubComponents) => React.FunctionComponent<IHeaderBarProps> = (subComponents) => {
  const HeaderBarHOC = (props: IHeaderBarProps) => {
    const {
      logo,
      buttons,
      iconTexts,
      styles,
      onClickButton,
      onClickIconText } = props;

    return (
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
    );
  };
  HeaderBarHOC.displayName = 'HeaderBarHOC';
  return observer(based(HeaderBarHOC, DEFAULT_PROPS));
};

// 采用高阶组件方式生成普通的 HeaderBar 组件
export const HeaderBar = HeaderBarHOC({
});

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */

/**
 * 科里化创建 HeaderBarWithStore 组件
 * @param stores - store 模型实例
 */
export const HeaderBarAddStore: (storesEnv: IStoresEnv<IStoresModel>) => React.FunctionComponent<IHeaderBarProps> = (storesEnv) => {
  const {stores} = storesEnv;
  const HeaderBarHasSubStore = HeaderBarHOC({
  });

  const HeaderBarWithStore = (props: Omit<IHeaderBarProps, THeaderBarControlledKeys>) => {
    const {
     ...otherProps} = props;
    const { model } = stores;
    const controlledProps = pick(model, CONTROLLED_KEYS);
    debugRender(`[${stores.id}] rendering`);


  const otherPropsWithInjected = useIndectedEvents <IHeaderBarProps, IStoresModel>(storesEnv, otherProps, {
    'onClick': [showConsole]
  });

    return (
      <HeaderBarHasSubStore
        {...controlledProps}
        {...otherPropsWithInjected}
      />
    );
  };

  HeaderBarWithStore.displayName = 'HeaderBarWithStore';
  return observer(HeaderBarWithStore);
}

/**
 * 生成 env 对象，方便在不同的状态组件中传递上下文
 */
export const HeaderBarStoresEnv = () => {
  const { stores, innerApps } = StoresFactory(); // 创建 model
  const app = AppFactory(stores, innerApps); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    innerApps: innerApps
  };
}

/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 HeaderBarWithStore 的上下文
 */
export const HeaderBarFactory = () => {
  const storesEnv = HeaderBarStoresEnv();
  return {
    ...storesEnv,
    HeaderBarWithStore: HeaderBarAddStore(storesEnv)
  }
};
