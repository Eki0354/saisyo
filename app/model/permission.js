'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PermissionSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 16,
    },
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

  return mongoose.model('Permission', PermissionSchema);
};
