import {
  types,
  Instance,
  IAnyModelType,
  SnapshotOrInstance
} from 'mobx-state-tree';

import { quickInitModel } from 'ide-lib-engine';

/**
 * 单个函数模型，借此绑定该组件的多种函数
 */
export const IconButtonModel: IAnyModelType = quickInitModel('IconButtonModel', {
  id: types.identifier,
  title: types.string,
  icon: types.maybe(types.string)
});

export interface IIconButtonModel extends Instance<typeof IconButtonModel> {}
export interface IIconButtonModelSnapshot
  extends SnapshotOrInstance<typeof IconButtonModel> {}
