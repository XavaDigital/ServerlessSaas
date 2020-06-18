import Link from 'next/link';

import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import Button from 'components/elements/Button';

const ProfileDetail: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  return (
    <Layout>
      <div className="container py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-4 sm:py-6">
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                Account information
              </h2>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
              <span className="shadow-sm rounded-md">
                <Link href="/profile/edit">
                  <a href="">
                    <Button title="Edit profile" />
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto bg-white overflow-hidden shadow rounded-lg">
          <div className="mt-5 pt-5 px-4 py-5 sm:p-6">
            <dl>
              <div className=" sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth.user.name}
                </dd>
              </div>
              <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth.user.email}
                </dd>
              </div>
              <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Email verified
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth.user.emailVerified ? 'Yes' : 'No'}
                </dd>
              </div>
              <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth.user.phoneNumber || '-'}
                </dd>
              </div>
              <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Photo
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    {auth.user.avatarUrl ? (
                      <span className="inline-block relative">
                        <img
                          className="h-12 w-12 object-cover rounded-full"
                          src={auth.user.avatarUrl}
                          alt={auth.user.name}
                        />
                      </span>
                    ) : (
                      <svg
                        className="h-12 w-12 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ProfileDetail;
