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
export const IconTextModel: IAnyModelType = quickInitModel('IconTextModel', {
  id: types.identifier,
  title: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
  isActive: types.optional(types.boolean, false)
});

export interface IIconTextModel extends Instance<typeof IconTextModel> {}
export interface IIconTextModelSnapshot
  extends SnapshotOrInstance<typeof IconTextModel> {}
