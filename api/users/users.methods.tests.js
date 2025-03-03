import { assert, expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Users } from '/api/users/users';
import '/api/users/users.methods';
import { mockLoggedUserId } from '../../tests/helpers';

if (Meteor.isServer) {
  describe('Users', () => {
    describe('methods', () => {
      const userRId = Random.id();
      let IdUser;

      beforeEach(async () => {
        mockLoggedUserId(userRId);
        await Users.removeAsync({}).catch((error) => {
          console.error(error);
        });
        IdUser = await Users.insertAsync({
          name: 'Test name',
          done: false,
          createdAt: new Date(),
          userRId,
        }).catch((error) => {
          console.error(error);
        });
      });

      it('can delete owned user', async () => {
        await Meteor.callAsync('removeUser', { IdUser });

        assert.equal(await Users.find().countAsync(), 0);
      });

      it("can't delete user if not authenticated", async () => {
        mockLoggedUserId(null);
        try {
          await Meteor.callAsync('removeUser', { IdUser });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Not authorized.');
        }
        assert.equal(await Users.find().countAsync(), 1);
      });

      it("can't delete user from another owner", async () => {
        mockLoggedUserId(Random.id());
        try {
          await Meteor.callAsync('removeUser', { IdUser });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Access denied.');
        }
        assert.equal(await Users.find().countAsync(), 1);
      });

      it('can change the status of a user', async () => {
        const originalTask = await Users.findOneAsync(IdUser);
        await Meteor.callAsync('toggleUserDone', { IdUser });

        const updatedTask = await Users.findOneAsync(IdUser);
        assert.notEqual(updatedTask.done, originalTask.done);
      });

      it("can't change the status of a user from another owner", async () => {
        mockLoggedUserId(Random.id());
        const originalUser = await Users.findOneAsync(IdUser);

        try {
          await Meteor.callAsync('toggleUserDone', { IdUser });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Access denied.');
        }
        const user = await Users.findOneAsync(IdUser);
        assert.equal(user.done, originalUser.done);
      });

      it('can insert new user', async () => {
        const name = 'New user';
        await Meteor.callAsync('insertUser', { name });

        const user = await Users.findOneAsync({ name });
        assert.isNotNull(user);
        assert.isTrue(user.name === name);
      });

      it("can't insert new users if not authenticated", async () => {
        mockLoggedUserId(null);
        const name = 'New name';
        try {
          await Meteor.callAsync('insertUser', { name });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Not authorized.');
        }
        const user = await Users.findOneAsync({ name });
        assert.isUndefined(user);
      });

      it('can edit owned user', async () => {
        const newName = 'Updated Name';
        
        await Meteor.callAsync('updatingUser', { userId: IdUser, name: newName });
      
        const updatedUser = await Users.findOneAsync(IdUser);
        assert.equal(updatedUser.name, newName);
      });




      //pruba extra
      it("can't edit user from another owner", async () => {
        mockLoggedUserId(Random.id()); // Simulamos otro usuario
        const originalUser = await Users.findOneAsync(IdUser);
        const newName = 'Hacker Name';
      
        try {
          await Meteor.callAsync('updatingUser', { userId: IdUser, name: newName });
        } catch (error) {
          expect(error).to.be.instanceof(Error);
          expect(error.reason).to.be.equal('Access denied.');
        }
      
        const user = await Users.findOneAsync(IdUser);
        assert.equal(user.name, originalUser.name); // El nombre no debe cambiar
      });

    });
  });
}
