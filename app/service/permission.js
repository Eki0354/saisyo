'use strict';

const { Service } = require('egg');

class PermissionService extends Service {
  async create(data) {
    const record = await this.ctx.model.Permission.findOne({ title: data.title });
    if (!record) return await this.ctx.model.Permission.create(data);
    if (record.status !== 1) this.ctx.ej('DUPLICATED_PERMISSION_NAME');
    record.status = 0;
    return await this.modify(record);
  }

  async deleteMany(ids) {
    return await this.ctx.model.Permission.updateMany({ _id: { $in: ids } }, { status: 1 });
  }

  async modify(data) {
    return await this.ctx.model.Permission.findOneAndUpdate({ _id: data._id }, data);
  }

  async getList() {
    return await this.ctx.model.Permission.find();
  }

  async getPermissionById(_id) {
    return await this.ctx.model.Permission.findOne({ _id });
  }
}

module.exports = PermissionService;
