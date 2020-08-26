import firebase from 'firebase/app';
import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import AccountMenu from 'components/dashboard/AccountMenu';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';
import Link from 'next/link';
import Button from 'components/elements/Button';
import { useEffect, useState } from 'react';
import { getTeam, updateTeam } from 'services/team';
import { useForm } from 'react-hook-form';
import { functions, db } from 'config/firebase';

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
  const [formOpen, setFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResendInvite, setHasResendInvite] = useState(null);
  const [error, setError] = useState(null);
  const { register, errors, handleSubmit } = useForm();
  const { user } = useRequireAuth();

  useEffect(() => {
    if (!team && user?.teamId) {
      fetchTeam();
    }
  }, [team, user?.teamId]);

  const fetchTeam = async () => {
    const team = await getTeam(user.teamId);
    setTeam(team);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      status: 'invited',
      invitedAt: Date.now(),
      role: 'member',
      ...data,
    };
    updateTeam(team.id as string, {
      users: firebase.firestore.FieldValue.arrayUnion({ ...payload }),
    }).then(() => {
      const sendTeamInviteEmail = functions.httpsCallable(
        'sendTeamInviteEmail'
      );
      sendTeamInviteEmail({
        emailTo: data.email,
        teamName: team.name,
        teamId: team.id,
        teamOwnerName: user.name,
      })
        .then(() => {
          setFormOpen(false);
          setIsLoading(false);
          fetchTeam();
        })
        .catch((error) => console.log(error));
    });
  };

  const resendInvite = (email) => {
    setIsLoading(email);
    const sendTeamInviteEmail = functions.httpsCallable('sendTeamInviteEmail');
    sendTeamInviteEmail({
      emailTo: email,
      teamName: team.name,
      teamId: team.id,
      teamOwnerName: user.name,
    }).then(() => {
      setHasResendInvite(email);
      setFormOpen(false);
      setIsLoading(false);
    });
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-200 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                {team?.name || 'Team'}
              </h2>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className="w-full sm:w-1/3 sm:pr-16">
            <AccountMenu />
          </div>
          <main className="hidden sm:block w-2/3 mx-auto">
            {false && (
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
                      {user.teamId ? (
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
            {user.teamId && team && (
              <div>
                <div className="mt-10 pt-5 px-4 py-5 sm:p-6 bg-white overflow-hidden shadow rounded-lg">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Your team
                  </h3>
                  <div className="my-6 pt-3 sm:flex sm:items-start sm:justify-between border-t border-gray-200 ">
                    <div className="text-sm leading-5 text-gray-500">
                      <p>{`Team name: ${team.name || ''}`}</p>
                      <p>{`Team ID: ${team.id}`}</p>
                      <p>{`Team Slug: ${team.slug}`}</p>
                      <p>{`Team Member Count: ${team.users.length}`}</p>
                      <p>{`Invite link: http://localhost:3000/signup?teamId=${team.id}`}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                      <span className="rounded-md shadow-sm">
                        <Link href="/account/team/edit">
                          <Button
                            title="Edit"
                            onClick={() => setFormOpen(true)}
                          />
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-5 px-4 py-5 sm:p-6 bg-white overflow-hidden shadow rounded-lg">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Team members
                  </h3>
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
                                {user.status === 'active'
                                  ? `Joined on ${new Date(
                                      user.joinedAt
                                    ).toLocaleDateString()}`
                                  : `Invited on ${new Date(
                                      user.invitedAt
                                    ).toLocaleDateString()}`}
                              </p>
                            </div>
                            <div className="flex">
                              {user.status !== 'active' && user.isTeamOwner ? (
                                <button
                                  className="mr-3 inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                  onClick={() => resendInvite(user.email)}
                                >
                                  {isLoading === user.email
                                    ? 'Sending...'
                                    : (hasResendInvite === user.email &&
                                        'Resented') ||
                                      'Resend invite'}
                                </button>
                              ) : (
                                <span className="mr-3 inline-flex justify-center w-full px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 sm:text-sm sm:leading-5">
                                  Active
                                </span>
                              )}
                              {user.role !== 'owner' && user.isTeamOwner && (
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
                    {user.isTeamOwner && !formOpen && (
                      <div className="flex justify-end">
                        <span className="rounded-md shadow-sm">
                          <Button
                            title="Invite a member"
                            onClick={() => setFormOpen(true)}
                          />
                        </span>
                      </div>
                    )}
                    {formOpen && (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {error?.message && (
                          <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
                            <span>{error.message}</span>
                          </div>
                        )}
                        <div className="flex justify-end">
                          <div className="w-full rounded-md mr-3">
                            <input
                              id="email"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              type="email"
                              name="email"
                              placeholder="Email"
                              ref={register({
                                required: 'Please enter an email',
                                pattern: {
                                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                  message: 'Not a valid email',
                                },
                              })}
                            />
                            {errors.email && (
                              <div className="mt-2 text-xs text-red-600">
                                {errors.email.message}
                              </div>
                            )}
                          </div>

                          <button
                            className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700 transition duration-150 ease-in-out"
                            type="submit"
                          >
                            {isLoading ? 'Sending...' : 'Send'}
                          </button>
                        </div>
                      </form>
                    )}
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
