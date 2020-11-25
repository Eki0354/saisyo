'use strict';

const { Controller } = require('egg');

class PermissionController extends Controller {
  async getById() {
    this.ctx.body = await this.ctx.service.permission.getPermissionById(this.ctx.params._id);
  }

  async getList() {
    this.ctx.body = await this.ctx.service.permission.getList();
  }

  async create() {
    this.ctx.body = await this.ctx.service.permission.create(this.ctx.request.body);
  }

  async deleteMany() {
    this.ctx.body = await this.ctx.service.permission.deleteMany(this.ctx.request.body);
  }
}

module.exports = PermissionController;
