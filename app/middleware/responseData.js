'use strict';

/**
 * 格式化返回数据
 */
module.exports = () => {
  return async function csrf(ctx, next) {
    await next();
    if (ctx.status === 200) {
      ctx.body = {
        code: 0,
        data: ctx.body,
        message: null,
      };
    }
  };
};
