'use strict';

const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 加载错误抛出方法中间件
  app.config.coreMiddleware.unshift('throw');

  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    const { provider, ...rest } = user;
    if (provider === 'local') {
      const rec = await ctx.model.User.findOne(rest);
      if (!rec) ctx.ej('LOGIN_FAILED');
      return rec;
    }
  });

  app.passport.serializeUser(async (ctx, user) => {
    const tokenData = {
      _id: user._id,
    };
    const tokenOptions = {
      expiresIn: 60 * 60 * 24 * 30,
    };
    const auth_token = app.jwt.sign(tokenData, app.config.jwt.secret, tokenOptions);
    const sessionOptions = {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      signed: true,
      httpOnly: true,
    };
    ctx.cookies.set('token', auth_token, sessionOptions);
    return auth_token;
  });

  app.passport.deserializeUser(async (ctx, user) => {
    user = app.jwt.verify(user, app.config.jwt.secret);
    if (!user || !user._id) ctx.ej('TOKEN_INVALID');
    if (user.exp * 1000 < new Date().getTime() - 2000) ctx.ej('TOKEN_EXPIRED');
    user = await ctx.service.user.getUserById(user._id);
    if (!user) ctx.ej('TOKEN_INVALID');
    return user;
  });
};
