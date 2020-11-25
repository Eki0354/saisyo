'use strict';

const { Controller } = require('egg');

class RoleController extends Controller {
  async getById() {
    this.ctx.body = await this.ctx.service.role.getRoleById(this.ctx.params._id);
  }

  async getList() {
    this.ctx.body = await this.ctx.service.role.getList();
  }

  async create() {
    this.ctx.body = await this.ctx.service.role.create(this.ctx.request.body);
  }

  async deleteMany() {
    this.ctx.body = await this.ctx.service.role.deleteMany(this.ctx.request.body);
  }
}

module.exports = RoleController;
