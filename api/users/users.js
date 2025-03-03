import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('User');

const schema = {
  _id: String,
  name: String,
  done: Boolean,
  createdAt: Date,
  userId: String,
};

Users.attachSchema(schema);
