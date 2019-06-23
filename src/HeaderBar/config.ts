import { types } from 'mobx-state-tree';
import { BASE_CONTROLLED_KEYS } from 'ide-lib-base-component';

import { IStoresModel, IModuleConfig } from 'ide-lib-engine';
import { DEFAULT_PROPS, IHeaderBarProps } from './index';
import { showConsole } from './solution/model';

import { subComponents, ISubProps } from './subs';

import { router as GetRouter } from './router/get';
import { router as PostRouter } from './router/post';
import { router as PutRouter } from './router/put';
import { router as DelRouter } from './router/del';

import { IconButtonModel } from './model/icon-button';
import { IconTextModel } from './model/icon-text';

export const configHeaderBar: IModuleConfig<IHeaderBarProps, ISubProps> = {
  component: {
    className: 'HeaderBar',
    defaultProps: DEFAULT_PROPS,
    children: subComponents
  },
  router: {
    domain: 'header-bar',
    list: [GetRouter, PostRouter, PutRouter, DelRouter]
  },
  store: {
    idPrefix: 'shb'
  },
  model: {
    controlledKeys: [], // 后续再初始化
    props: {
      logo: types.optional(types.string, ''),
      buttons: types.array(IconButtonModel),
      iconTexts: types.array(IconTextModel)
    }
  }
};

// 枚举受 store 控制的 key，一般来自 config.model.props 中 key
// 当然也可以自己枚举
export const SELF_CONTROLLED_KEYS = Object.keys(configHeaderBar.model.props); // ['visible', 'text']

export const CONTROLLED_KEYS = BASE_CONTROLLED_KEYS.concat(
  SELF_CONTROLLED_KEYS
);

// 初始化 controlledKeys
configHeaderBar.model.controlledKeys = CONTROLLED_KEYS;
