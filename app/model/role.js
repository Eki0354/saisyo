'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 16,
    },
    permissions: [
      {
        ref: 'Permission',
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  });

  return mongoose.model('Role', RoleSchema);
};
