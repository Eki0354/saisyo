'use strict';

const { Service } = require('egg');

class RoleService extends Service {
  async create(data) {
    const record = await this.ctx.model.Role.findOne({ name: data.name });
    if (!record) return await this.ctx.model.Role.create(data);
    if (record.status !== 1) this.ctx.ej('DUPLICATED_ROLE_NAME');
    record.status = 0;
    return await this.modify(record);
  }

  async deleteMany(ids) {
    return await this.ctx.model.Role.updateMany({ _id: { $in: ids } }, { status: 1 });
  }

  async modify(data) {
    return await this.ctx.model.Role.findOneAndUpdate({ _id: data._id }, data);
  }

  async getList() {
    return await this.ctx.model.Role.find();
  }

  async getRoleById(_id) {
    return await this.ctx.model.Role.findOne({ _id });
  }
}

module.exports = RoleService;
