import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import Link from 'next/link';
import Button from 'components/elements/Button';
import { useEffect, useState } from 'react';
import { getTeam } from 'services/team';

const breadCrumbs = {
  back: {
    path: '/account',
    text: 'Back',
  },
  first: {
    path: '/account',
    text: 'Account',
  },
  second: {
    path: '/account/team',
    text: 'Team',
  },
};

const Team: React.FC = () => {
  const [team, setTeam] = useState(null);

  const auth = useRequireAuth();

  useEffect(() => {
    console.log(team);
    if (!team && auth.user?.teamId) {
      getTeam(auth.user.teamId).then((doc) => {
        if (doc.exists) {
          setTeam(doc.data());
        } else {
          console.log('No such document!');
        }
      });
    }
  }, [team, auth.user?.teamId]);

  if (!auth.user) return null;

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-200 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                {team ? team.name : 'Team'}
              </h2>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className="w-full sm:w-1/3 sm:pr-16">
            <AccountMenu />
          </div>
          <main className="hidden sm:block w-2/3 mx-auto">
            {!auth.user?.isPro && (
              <div className="grid gap-4 grid-cols-2">
                <h2>
                  You need to have a Pro account to create a team and invite
                  members
                </h2>
              </div>
            )}
            {auth.user.isPro && !auth.user.teamId && (
              <div className="mt-10 pt-5 px-4 py-5 sm:p-6 bg-white overflow-hidden shadow rounded-lg">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create your team
                </h3>
                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                  <div className="text-sm leading-5 text-gray-500">
                    <p>
                      {`If you like to invite users to your organization, start by creating a Team. After you have created a team you can send invites.`}
                    </p>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-5">
                  <div className="flex justify-end">
                    <span className="rounded-md shadow-sm">
                      {auth.user.teamId ? (
                        <Link href="/account/team/invite">
                          <Button title="Invite a member" />
                        </Link>
                      ) : (
                        <Link href="/account/team/create">
                          <Button title="Create a Team" />
                        </Link>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {auth.user.teamId && team && (
              <div className="mt-10 pt-5 px-4 py-5 sm:p-6 bg-white overflow-hidden shadow rounded-lg">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Manage your team
                </h3>
                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                  <div className="text-sm leading-5 text-gray-500">
                    <p>{`Team name: ${team.name}`}</p>
                    <p>{`Team ID: ${team.id}`}</p>
                    <p>{`Team Member Count: ${team.users.length}`}</p>
                  </div>
                </div>
                <ul className="mt-5">
                  {team?.users.map((user, i) => {
                    return (
                      <li className="border-t border-gray-200" key={i}>
                        <div className="w-full flex items-center justify-between py-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-gray-900 text-sm leading-5 font-medium truncate">
                                {user.email}
                              </h3>
                              <span className="flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">
                                {user.role}
                              </span>
                            </div>
                            <p className="mt-1 text-gray-500 text-sm leading-5 truncate">
                              {user.createdAt &&
                                `Joined on ${new Date(
                                  user.createdAt.seconds * 1000
                                ).toLocaleDateString()}`}
                            </p>
                          </div>
                          <div className="flex">
                            {user.status !== 'active' &&
                              auth.user.isTeamOwner && (
                                <button className="mr-3 inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                  Resend invite
                                </button>
                              )}
                            {user.role !== 'owner' && auth.user.isTeamOwner && (
                              <button className="flex items-center justify-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-gray-200 pt-5">
                  <div className="flex justify-end">
                    <span className="rounded-md shadow-sm">
                      {auth.user.isTeamOwner && (
                        <Link href="/account/team/invite">
                          <Button title="Invite a member" />
                        </Link>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
