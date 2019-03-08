import { updateInScope, BASE_CONTROLLED_KEYS } from 'ide-lib-base-component'
import { debugModel } from '../../lib/debug';
import { IHeaderBarProps, IHeaderBarModel, HeaderBarModel, IStoresModel, DEFAULT_PROPS } from '../../index';

/**
 * 将普通对象转换成 Model
 * @param modelObject - 普通的对象
 */
export function createModel(modelObject: IHeaderBarProps = DEFAULT_PROPS): IHeaderBarModel {
  const mergedProps = Object.assign({}, DEFAULT_PROPS, modelObject);
  const { logo, buttons, iconTexts, theme, styles } = mergedProps;
  const model = HeaderBarModel.create({
    logo,
    buttons,
    iconTexts
  });
  model.setStyles(styles || {});
  model.setTheme(theme);

  return model;
}

/**
 * 创建新的空白
 */
export function createEmptyModel() {
  return createModel({});
}

/* ----------------------------------------------------
    更新指定 enum 中的属性
----------------------------------------------------- */

// 定义 menu 可更新信息的属性
const EDITABLE_ATTRIBUTE = BASE_CONTROLLED_KEYS.concat(['logo', 'buttons', 'iconTexts', 'theme', 'styles']);

export const updateModelAttribute = updateInScope(EDITABLE_ATTRIBUTE);
