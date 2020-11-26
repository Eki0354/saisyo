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
  router.get('/user/getList', controller.user.getList);
  router.get('/user/:_id', controller.user.getById);

  router.post('/user/new', controller.user.create);

  router.delete('/user', controller.user.deleteMany);

  // 角色
  router.get('/role/getList', controller.role.getList);
  router.get('/role/:_id', controller.role.getById);

  router.post('/role', controller.role.create);

  router.delete('/role', controller.role.deleteMany);

  // 权限
  router.get('/permission/getList', controller.permission.getList);
  router.get('/permission/:_id', controller.permission.getById);

  router.post('/permission', controller.permission.create);

  router.delete('/permission', controller.permission.deleteMany);
};
