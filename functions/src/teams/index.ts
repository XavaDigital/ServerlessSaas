import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
