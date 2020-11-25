'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async getById() {
    this.ctx.body = await this.ctx.service.user.getUserById(this.ctx.params._id);
  }

  async getList() {
    this.ctx.body = await this.ctx.service.user.getList();
  }

  async create() {
    this.ctx.body = await this.ctx.service.user.create(this.ctx.request.body);
  }

  async deleteMany() {
    this.ctx.body = await this.ctx.service.user.deleteMany(this.ctx.request.body);
  }
}

module.exports = UserController;
