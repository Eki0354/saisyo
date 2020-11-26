'use strict';

const { Controller } = require('egg');

class RoleController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.role.getList();
  }

  async show() {
    this.ctx.body = await this.ctx.service.role.getRoleById(this.ctx.params.id);
  }

  async create() {
    this.ctx.body = await this.ctx.service.role.create(this.ctx.request.body);
  }

  async deleteMany() {
    this.ctx.body = await this.ctx.service.role.deleteMany(this.ctx.request.body);
  }
}

module.exports = RoleController;
