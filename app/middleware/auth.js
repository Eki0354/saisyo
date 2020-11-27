'use strict';

/**
 * token鉴权
 */
module.exports = () => {
  return async function auth(ctx, next) {
    // 忽略验证白名单
    if (!ctx.app.config.auth.ignore.some(url => ctx.url.indexOf(url) > -1) && !ctx.isAuthenticated()) ctx.ej('NOT_LOGIN');
    await next();
  };
};
