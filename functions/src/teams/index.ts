import * as functions from 'firebase-functions';
import { db } from '../config';
import { nameToSlug, slugToId } from './helpers';

export const createTeam = async (user) => {
  const users = [
    {
      userId: user.uid,
      email: user.email,
      name: user.name,
      role: 'owner',
      status: 'active',
      joinedAt: Date.now(),
    },
  ];
  let slug = nameToSlug(user.name);

  const isAvailable = await isSlugAvailable(slug);
  if (!isAvailable) {
    slug = slugToId(slug);
  }

  const team = {
    slug,
    name: `${user.name}'s Team`,
    id: user.uid,
    ownerId: user.uid,
    users,
  };

  await db.collection('teams').doc(team.ownerId).set(team, { merge: true });
};

export const addTeamMember = async (user) => {
  const team = await getTeam(user.teamId);
  const index = team.users.findIndex((object) => object.email === user.email);

  // If the user can't join a team because their email is not present on the team members list
  // we fall back to creating a own team for the user
  if (index === -1) {
    return createTeam(user);
  }

  team.users[index] = {
    ...team.users[index],
    userId: user.uid,
    name: user.name,
    status: 'active',
    joinedAt: Date.now(),
  };

  await db.collection('teams').doc(user.teamId).update(team);
};

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

/**
 * isSlugAvailable checks if a team already has the given slug
 */
export const isSlugAvailable = async (slug: string): Promise<boolean> => {
  const teams = await db.collection('teams').where('slug', '==', slug).get();
  return teams.empty;
};

/**
 * On create of a team save the team ID to the user document
 */
export const onTeamCreate = functions.firestore
  .document('/teams/{documentId}')
  .onCreate((snap) => {
    const teamId = snap.data().id;

    return db
      .collection('users')
      .doc(teamId)
      .set({ teamId, isTeamOwner: true }, { merge: true });
  });
