import Link from 'next/link';
import SidebarLayout from 'components/admin/SidebarLayout';
import Spinner from 'components/icons/Spinner';
import { greetUser } from 'utils/greetUser';
import { useRequireAdmin } from 'hooks/useRequireAdmin';

const AdminDashboardPage: React.FC = () => {
  const { user } = useRequireAdmin();

  if (!user) return <Spinner width="30" className="m-auto mt-6 animate-spin" />;

  return (
    <SidebarLayout>
      <main className="px-4 pb-8 mx-auto mt-8 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
          Admin dashboard
        </h1>
        <section className="p-6 mb-10 bg-white rounded-lg shadow-lg">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                {user?.avatarUrl ? (
                  <img
                    className="object-cover w-16 h-16 mx-auto rounded-full"
                    src={user.avatarUrl}
                    alt={user.name}
                  />
                ) : (
                  <svg
                    className="inline-block w-16 h-16 text-gray-700 rounded-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {greetUser(user.name)}
                </p>
                <p className="text-sm font-medium text-gray-600">Admin</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
            Quick links
          </h1>
          <div className="rounded-lg grid-col-1 sm:grid sm:grid-cols-2 sm:gap-2">
            <Link href="/admin/users">
              <a>
                <div className="relative p-6 mr-2 bg-white rounded-lg shadow-lg group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div>
                    <span className="inline-flex p-3 text-indigo-700 rounded-lg bg-indigo-50 ring-4 ring-white">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      Users
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Show a list of all your users in your system.
                    </p>
                  </div>
                  <span
                    className="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              </a>
            </Link>

            <a
              href="https://dashboard.stripe.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative p-6 ml-2 bg-white rounded-lg shadow-lg group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
                  <span className="inline-flex p-3 text-green-700 rounded-lg bg-green-50 ring-4 ring-white">
                    <svg
                      className="w-6 h-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    Reports
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Go to your Stripe Dashboard.
                  </p>
                </div>
                <span
                  className="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>
    </SidebarLayout>
  );
};

export default AdminDashboardPage;
