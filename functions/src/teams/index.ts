import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db } from '../config';

/**
 * On create of a team save the team ID to the user document
 */
export const onTeamCreate = functions.firestore
  .document('/teams/{documentId}')
  .onCreate((snap, context) => {
    const ownerId = snap.data().ownerId;
    const teamId = snap.data().id;

    return admin
      .firestore()
      .collection('users')
      .doc(ownerId)
      .set({ teamId, isTeamOwner: true }, { merge: true });
  });

/**
 * On user create, check if teamId is present and if so, update the
 * users array of the corresponding team
 */
export const onTeamMemberCreate = functions.firestore
  .document('/users/{documentId}')
  .onCreate(async (snap, context) => {
    const user = snap.data();

    functions.logger.log('user', user);

    if (user.teamId) {
      functions.logger.log('user.teamId!!!', user.teamId);
      const doc = await getTeam(user.teamId);
      const team = { ...doc };
      const index = team.users.findIndex(
        (object) => object.email === user.email
      );
      team.users[index] = {
        ...team.users[index],
        userId: user.uid,
        name,
        status: 'active',
        joinedAt: Date.now(),
      };

      await db.collection('teams').doc(user.teamId).update(team);
      functions.logger.log('team!!!', team);

      // TODO: Send email to owner to inform about team member joining
      return { status: 'success' };
    }

    return { status: 'success' };
  });

/**
 *  Use this function to read the team document from Firestore
 */
export const getTeam = async (uid: string): Promise<any> => {
  return await db
    .collection('teams')
    .doc(uid)
    .get()
    .then((doc) => doc.data());
};
