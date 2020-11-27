'use strict';

/**
 * 抛出业务错误
 */
module.exports = () => {
  return async function eject(ctx, next) {
    ctx.ej = codeTag => ctx.throw(ctx.app.INFO_CODES.BIZ_ERROR, `BizError: ${codeTag}`, { code: ctx.app.INFO_CODES[codeTag] || codeTag });
    await next();
  };
};
