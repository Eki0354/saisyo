'use strict';

const { INFO_CODES } = require('../extend/application');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, saisyo egg';
  }

  async getAuthUser() {
    const { ctx } = this;
    ctx.body = this.ctx.user;
  }
}

module.exports = HomeController;
