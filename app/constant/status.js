'use strict';

module.exports = {
  NOT_LOGIN: 'E001001', // 未登录
  LOGIN_FAILED: 'E001002', // 登录失败，用户名或密码错误
  FORBIDDEN_ERROR: 403, // 禁止访问错误拦截状态码
  NO_CSRF_TOKEN: 'E001003',
  BIZ_ERROR: 444, // 业务错误拦截状态码
  DUPLICATED_PERMISSION_NAME: 'W002001', // 已存在的权限名称
  DUPLICATED_ROLE_NAME: 'W003001', // 已存在的角色名称
};
