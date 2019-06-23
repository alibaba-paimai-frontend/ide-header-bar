import Router from 'ette-router';
import {
  updateStylesMiddleware,
  updateThemeMiddleware,
  buildNormalResponse
} from 'ide-lib-base-component';

import { IContext } from './helper';

export const router = new Router();
// 更新单项属性
router.put('updateModel', '/model', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const originValue = stores.model[name];
  const isSuccess = stores.model.updateAttribute(name, value);

  buildNormalResponse(
    ctx,
    200,
    { success: isSuccess, origin: originValue },
    `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`
  );
});

// 更新指定 button
router.put('updateModel', '/model/buttons/:id', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;
  const { id } = ctx.params;

  //   stores.setSchema(createSchemaModel(schema));
  // 根据 id 找到指定的 item
  const target = stores.model.getButtonById(id);
  const isExistId = !!target;

  if (isExistId) {
    const originValue = target[name];
    const isSuccess = target.updateAttribute(name, value);
    buildNormalResponse(
      ctx,
      200,
      { success: isSuccess, origin: originValue },
      `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`
    );
  } else {
    buildNormalResponse(
      ctx,
      200,
      { success: false, origin: null },
      `找不到 id: ${id} 的 button 对象，请检查`
    );
  }
});

// 更新指定 button
router.put('updateModel', '/model/icons/:id', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;
  const { id } = ctx.params;

  //   stores.setSchema(createSchemaModel(schema));
  // 根据 id 找到指定的 item
  const target = stores.model.getIconById(id);
  const isExistId = !!target;

  if (isExistId) {
    const originValue = target[name];
    const isSuccess = target.updateAttribute(name, value);
    buildNormalResponse(
      ctx,
      200,
      { success: isSuccess, origin: originValue },
      `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`
    );
  } else {
    buildNormalResponse(
      ctx,
      200,
      { success: false, origin: null },
      `找不到 id: ${id} 的 button 对象，请检查`
    );
  }
});

// 更新 css 属性
router.put(
  'updateStyles',
  '/model/styles/:target',
  updateStylesMiddleware('model')
);

// 更新 theme 属性
router.put(
  'updateTheme',
  '/model/theme/:target',
  updateThemeMiddleware('model')
);
