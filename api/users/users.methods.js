import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { checkLoggedIn, checkUserOwner } from '../lib/auth';
import { Users } from './users';

/**

 Inserta un nuevo usuario en la collection users.
 @async
 @function insertUser
 @param {Object} userData - The task data.
 @param {string} userData.name - The name of the task.
 @returns {Promise<string>} - The ID of the inserted task.
 */
 async function insertUser({ name }) {
    check(name, String);
    checkLoggedIn();
    const user = {
      name,
      done: false,
      userId: Meteor.userId(),
      createdAt: new Date(),
    };
    return Users.insertAsync(user);
  }

  /**
   Removes a user from the Tasks collection.
   @async
   @function removeUser
   @param {Object} userData - The user data.
   @param {string} userData.userId - The ID of the user to remove.
   @returns {Promise<number>}
   */
  async function removeUser({ userId }) {
    check(userId, String);
    await checkUserOwner({ userId });
    return Users.removeAsync(userId);
  }

  /**
   Toggles the 'done' status of a user in the Tasks collection.
   @async
   @function toggleUserDone
   @param {Object} userData - The user data.
   @param {string} userData.userId - The ID of the user to toggle.
   @returns {Promise<number>}
   */
  async function toggleUserDone({ userId }) {
    check(userId, String);
    await checkUserOwner({ userId });
    const user = await Users.findOneAsync(userId);
    return Users.updateAsync({ _id: userId }, { $set: { done: !user.done } });
  }


/**
 * Editing a user from the Users collection.
 * @async
 * @function updatingUser
 * @param {Object} userData - The user data to update.
 * @param {string} userData.userId - The ID of the user to update.
 * @param {string} userData.name - The new name for the user.
 * @returns {Promise<number>} The number of documents updated.
 */
async function updatingUser({ userId, name }) {
  check(userId, String);
  check(name, String);

  await checkUserOwner({ userId });

  try {
    const user = await Users.findOneAsync(userId);
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }

    // Eliminar 'updatedAt' si no está en el esquema
    const result = await Users.updateAsync(userId, {
      $set: {
        name,
      },
    });

    // Verificar si se actualizó algún documento
    if (result === 0) {
      throw new Meteor.Error('update-failed', 'No documents were updated');
    }

    console.log('Update result:', result);
    return { success: true, message: 'User updated successfully', updatedCount: result };
  } catch (error) {
    console.error('Update failed:', error);
    throw new Meteor.Error('update-failed', error.message);
  }
}

  

Meteor.methods({ insertUser, removeUser, toggleUserDone, updatingUser});