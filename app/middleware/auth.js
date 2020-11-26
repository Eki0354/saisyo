'use strict';

/**
 * token鉴权
 */
module.exports = () => {
  return async function auth(ctx, next) {
    if (!ctx.isAuthenticated()) ctx.ej('NOT_LOGIN');
    await next();
  };
};
