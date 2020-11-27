'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 扩展Restful路由
  router.subResources = function(name, middleware) {
    this.resources(name, '/api/' + name, middleware);
    this.delete(name + 's', middleware.deleteMany);
  };

  router.prefix('/v1');

  router.get('/', controller.home.index);

  // 鉴权成功后的回调页面
  router.get('/getAuthUser', controller.home.getAuthUser);

  // 登录校验
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/v1/getAuthUser' }));

  // 用户
  router.subResources('user', controller.user);

  // 角色
  router.subResources('role', controller.role);

  // 权限
  router.subResources('permission', controller.permission);
};
