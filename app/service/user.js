'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async create(data) {
    return await this.ctx.model.User.create(data);
  }

  async deleteMany(ids) {
    return await this.ctx.model.User.updateMany({ _id: { $in: ids } }, { status: 1 });
  }

  async modify(data) {
    return await this.ctx.model.User.findOneAndUpdate({ _id: data._id }, data);
  }

  async getList() {
    return await this.ctx.model.User.find();
  }

  async getUserById(_id) {
    return await this.ctx.model.User.findOne({ _id });
  }
}

module.exports = UserService;
