'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 16,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
    },
    nickname: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 16,
      default: 'Hitori_' + Array(8)
        .fill(0)
        .map(() => Math.floor(Math.random() * 36).toString(36).toUpperCase())
        .join(''),
    },
    role: {
      ref: 'Role',
      type: Schema.Types.ObjectId,
      required: true,
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

  return mongoose.model('User', UserSchema);
};
