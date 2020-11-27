/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 1123,
    },
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  config.jwt = {
    secret: 'ichinoseeki', // 自定义 token 的加密条件字符串
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_ichinoseeki';

  // config.passportLocal = {
  //   key: 'l',
  //   secret: 'm',
  // };

  // add your middleware config here
  config.middleware = [
    // 'throw', // 抛出业务错误，在框架级加载(app.js)
    'auth', // token鉴权
    'responseData', // 格式化返回数据
  ];

  // 鉴权路由配置
  config.auth = {
    enable: true,
    // 鉴权白名单
    ignore: [ '/login', '/user/new' ],
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/saisyo',
      options: {
        mongos: true,
        useNewUrlParser: true,
      },
      plugins: [],
    },
  };

  config.onerror = {
    all(err, ctx) {
      // 拦截业务错误
      if (err.statusCode === ctx.app.INFO_CODES.BIZ_ERROR) {
        ctx.body = JSON.stringify({
          code: err.code || -1,
          data: null,
          message: err.message,
        });
        ctx.status = 200;
      } else
      // 拦截禁止访问错误
      if (err.statusCode === ctx.app.INFO_CODES.FORBIDDEN_ERROR) {
        let code = err.statusCode;
        // csrf安全token拦截
        if (err.message === 'invalid csrf token') {
          code = ctx.app.INFO_CODES.NO_CSRF_TOKEN;
        }
        ctx.body = JSON.stringify({
          code,
          data: null,
          message: err.message,
        });
        ctx.status = 200;
      } else {
        ctx.body = JSON.stringify({
          code: -1,
          data: null,
          message: err.message,
        });
        ctx.status = err.status;
      }
      ctx.set('content-type', 'application/json');
    },
  };

  // add your user config here
  const userConfig = {
    myAppName: 'Saisyo',
  };

  return {
    ...config,
    ...userConfig,
  };
};
