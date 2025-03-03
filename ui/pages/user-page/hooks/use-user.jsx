import { useUserId } from 'meteor/react-meteor-accounts';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { useState } from 'react';
import { Users } from '/api/users/users';

export function useUsers() {
  useSubscribe('usersByLoggedUser');
  const userId = useUserId();
  const [hideDone, setHideDone] = useState(false);
  const filter = hideDone ? { done: { $ne: true }, userId } : { userId };

  const users = useFind(
    Users,
    [filter, { sort: { createdAt: -1, name: -1 } }],
    [hideDone]
  );
  const count = useFind(Users, [{ userId }]).length;
  const pendingCount = useFind(Users, [{ done: { $ne: true }, userId }]).length;

  return {
    hideDone,
    setHideDone,
    users,
    pendingCount,
    count,
  };
}
