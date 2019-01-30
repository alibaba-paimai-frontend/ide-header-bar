import Router from 'ette-router';

import { IContext } from './helper';

export const router = new Router();

// 移除操作
router.del('headerbar', '/headerbar', function (ctx: IContext) {
  const { stores } = ctx;
  ctx.response.body = {
    node: stores.resetToEmpty()
  };
  ctx.response.status = 200;
});
