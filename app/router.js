'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // 鉴权成功后的回调页面
  router.get('/authCallback', controller.home.authCallback);

  // 登录校验
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/authCallback' }));

  // 用户
  router.resources('user', '/api/user', controller.user);
  router.delete('/users', controller.user.deleteMany);

  // 角色
  router.resources('role', '/api/role', controller.role);
  router.delete('/roles', controller.role.deleteMany);

  // 权限
  router.resources('permission', '/api/permission', controller.permission);
  router.delete('/permission', controller.permission.deleteMany);
};
