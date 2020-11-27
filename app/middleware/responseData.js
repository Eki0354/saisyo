'use strict';

/**
 * 格式化返回数据
 */
module.exports = () => {
  return async function csrf(ctx, next) {
    await next();
    if (ctx.status === 200) {
      const baseBody = {
        code: 0,
        data: null,
        message: null,
      };
      if (ctx.body && [ 'code', 'data', 'message' ].some(k => ctx.body[k])) {
        ctx.body = Object.assign(baseBody, ctx.body);
      } else {
        baseBody.data = ctx.body;
        ctx.body = baseBody;
      }
    }
  };
};
