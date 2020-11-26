'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.user.getList();
  }

  async show() {
    this.ctx.body = await this.ctx.service.user.getUserById(this.ctx.params.id);
  }

  async edit() {
    this.ctx.body = await this.ctx.service.user.modify(this.ctx.request.body);
  }

  async create() {
    this.ctx.body = await this.ctx.service.user.create(this.ctx.request.body);
  }

  async deleteMany() {
    this.ctx.body = await this.ctx.service.user.deleteMany(this.ctx.request.body);
  }
}

module.exports = UserController;
