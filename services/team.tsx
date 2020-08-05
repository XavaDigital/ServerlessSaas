import { auth, db, now } from 'config/firebase';
import { makeId } from 'utils/makeId';

export const createTeam = (data: { name: string }): Promise<any> => {
  const { name } = data;
  const id = makeId(name);
  const ownerId = auth.currentUser.uid;
  const users = [
    {
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      role: 'owner',
      status: 'active',
      createdAt: Date.now(),
    },
  ];

  return db
    .collection('teams')
    .doc(id)
    .set({ id, name, ownerId, users }, { merge: true });
};

export const updateTeam = (id: string, data: any): Promise<any> => {
  return db.collection('teams').doc(id).update(data);
};

export const getTeam = (teamId: string): Promise<any> => {
  return db.collection('teams').doc(teamId).get();
};
