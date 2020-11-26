'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, saisyo egg';
  }

  async authCallback() {
    const { ctx } = this;
    ctx.body = 'authCallback';
  }
}

module.exports = HomeController;
