import { Meteor } from 'meteor/meteor';
import { Users } from './users';

/**
 Finds users belonging to the logged-in user.
 @function findUsersByLoggedUser
 @returns {Mongo.Cursor} - The cursor containing the users found.
 */
function findUsersByLoggedUser() {
  return Users.find({ userId: Meteor.userId() });
}

Meteor.publish('usersByLoggedUser', findUsersByLoggedUser);
