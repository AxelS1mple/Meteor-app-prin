import { expect } from 'chai';

import { Random } from 'meteor/random';
import { Users } from './users';
import '/api/users/users.publications';
import { getMeteorPublication, mockLoggedUserId } from '../../tests/helpers';

describe('Users', () => {
  describe('publications', () => {
    const userId = Random.id();
    const originalUser = {
      name: 'Axel',
      createdAt: new Date(),
      done: false,
      userId,
    };

    beforeEach(async () => {
      mockLoggedUserId(userId);
      await Users.removeAsync({});
      await Users.insertAsync(originalUser);
    });

    it('should return tasks from the authenticated user', async () => {
      const publication = getMeteorPublication('usersByLoggedUser');
      const users = await publication.fetchAsync();

      expect(users.length).to.be.equal(1);
      expect(users[0].name).to.be.equal(originalUser.name);
    });

    it('should not return any task to the user who does not have any', async () => {
      mockLoggedUserId(Random.id());
      const publication = getMeteorPublication('usersByLoggedUser');
      const users = await publication.fetchAsync();

      expect(users.length).to.be.equal(0);
    });

    it('should not return any task if not authenticated', async () => {
      mockLoggedUserId(null);
      const publication = getMeteorPublication('usersByLoggedUser');
      const users = await publication.fetchAsync();

      expect(users.length).to.be.equal(0);
    });
  });
});
