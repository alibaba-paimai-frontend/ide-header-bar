import {
  cast,
  types,
  Instance,
  IAnyModelType,
  applySnapshot,
  SnapshotOrInstance
} from 'mobx-state-tree';

import { pick } from 'ide-lib-utils';
import { BaseModel, TBaseControlledKeys, BASE_CONTROLLED_KEYS } from 'ide-lib-base-component';

import { debugModel } from '../../lib/debug';
import { updateModelAttribute } from './util';
import {
  IHeaderBarButton,
  IHeaderBarIconText,
} from '../index';

/**
 * buttons 模型
 */
const ButtonModel = types.model('ButtonModel', {
  id: types.identifier,
  title: types.string,
  icon: types.maybe(types.string)
});

/**
 * iconText 模型
 */
const IconTextModel = types.model('IconTextModel', {
  id: types.identifier,
  title: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
  isActive: types.optional(types.boolean, false)
});

// 获取被 store 控制的 model key 的列表
export type THeaderBarControlledKeys =
  keyof SnapshotOrInstance < typeof HeaderBarModel> | TBaseControlledKeys;

// 定义被 store 控制的 model key 的列表，没法借用 ts 的能力动态从 THeaderBarControlledKeys 中获取
export const CONTROLLED_KEYS: string[] = BASE_CONTROLLED_KEYS.concat([
  'logo',
  'buttons',
  'iconTexts',
]);


/**
 * HeaderBar 对应的模型
 */
export const HeaderBarModel: IAnyModelType = BaseModel
  .named('HeaderBarModel')
  .props({
    logo: types.optional(types.string, ''),
    buttons: types.array(ButtonModel),
    iconTexts: types.array(IconTextModel),
    // language: types.optional(
    //   types.enumeration('Type', CODE_LANGUAGES),
    //   ECodeLanguage.JS
    // ),
    // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
    // options: types.map(types.union(types.boolean, types.string))
    // 在 mst v3 中， `types.map` 默认值就是 `{}`
    //  ide 的 Options 可选值参考： https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
  })
  .views(self => {
    return {
      /**
       * 只返回当前模型的属性，可以通过 filter 字符串进行属性项过滤
       */
      allAttibuteWithFilter(filterArray: string | string[] = CONTROLLED_KEYS) {
        const filters = [].concat(filterArray || []);
        return pick(self, filters);
      }
    };
  })
  .actions(self => {
    return {
      setLogo(logo: string) {
        self.logo = logo;
      },
      setButtons(buttons: string | IHeaderBarButton | IHeaderBarButton[]) {
        let target = buttons;
        if (typeof buttons === 'string') {
          target = JSON.parse(buttons);
        }
        self.buttons = []
          .concat(target)
          .map(button => ButtonModel.create(button)) as typeof self.buttons;
      },
      setIconTexts(
        iconTexts: string | IHeaderBarIconText | IHeaderBarIconText[]
      ) {
        let target = iconTexts;
        if (typeof iconTexts === 'string') {
          target = JSON.parse(iconTexts);
        }
        self.iconTexts = []
          .concat(target)
          .map(iconText =>
            IconTextModel.create(iconText)
          ) as typeof self.iconTexts;
      },
    };
  })
  .actions(self => {
    return {
     
      updateAttribute(name: string, value: any) {
        return updateModelAttribute(self, name, value);
      }
    };
  });

export interface IHeaderBarModel extends Instance<typeof HeaderBarModel> { }

