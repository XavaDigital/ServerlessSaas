import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Transition from 'components/shared/Transition';
import { useAuth } from 'hooks/useAuth';
import { useOnClickOutside } from 'hooks/useClickOutside';

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const dropdownNode = useRef();
  const navbarNode = useRef();
  const hamburgerNode = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useOnClickOutside(dropdownNode, () => setDropdownOpen(false));
  useOnClickOutside(navbarNode, () => setNavbarOpen(false));

  const auth = useAuth();
  if (!auth.user) return null;

  return (
    <nav className="bg-gray-800">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="">🚀</div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  <Link href="/dashboard">
                    <a
                      className={
                        router.pathname.includes('dashboard')
                          ? 'mr-4 px-3 py-2 rounded text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                          : 'mr-4 px-3 py-2 rounded text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                      }
                    >
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/account">
                    <a
                      className={
                        router.pathname.includes('account')
                          ? 'px-3 py-2 rounded text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                          : 'px-3 py-2 rounded text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                      }
                    >
                      Account
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative" ref={dropdownNode}>
                  <div>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                    >
                      <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                        {auth.user?.avatarUrl ? (
                          <img
                            className="h-full w-full object-cover rounded"
                            src={auth.user.avatarUrl}
                            alt={auth.user.name}
                          />
                        ) : (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                  <Transition
                    show={dropdownOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-xl">
                      <div className="py-1 rounded bg-white shadow-xs">
                        <Link href="/account">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Account
                          </a>
                        </Link>
                        <Link href="/account/team">
                          <a
                            href=""
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Team
                          </a>
                        </Link>
                        <Link href="/account/billing">
                          <a
                            href=""
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Billing
                          </a>
                        </Link>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => auth.signOut()}
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden" ref={hamburgerNode}>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="inline-flex items-center justify-center p-2 rounded text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {navbarOpen ? (
                    <path
                      className="inline-flex"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      className="inline-flex"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {navbarOpen && (
        <div
          className="block border-b border-gray-700 md:hidden"
          ref={navbarNode}
        >
          <div className="px-2 py-3 sm:px-3">
            <Link href="/dashboard">
              <a
                href="#"
                className={
                  router.pathname.includes('dashboard')
                    ? 'block px-3 py-2 rounded text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                    : 'block px-3 py-2 rounded text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                }
              >
                Dashboard
              </a>
            </Link>
            <Link href="/account">
              <a
                href="#"
                className={
                  router.pathname.includes('account')
                    ? 'mt-1 block px-3 py-2 rounded text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                    : 'mt-1 block px-3 py-2 rounded text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                }
              >
                Account
              </a>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {auth.user?.avatarUrl ? (
                  <img
                    className="h-12 w-12 object-cover rounded-full"
                    src={auth.user.avatarUrl}
                    alt={auth.user.name}
                  />
                ) : (
                  <svg
                    className="h-12 w-12 text-gray-300 rounded-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {auth.user.name}
                </div>
                <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                  {auth.user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <Link href="/account">
                <a
                  href="#"
                  className="block px-3 py-2 rounded text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Your account
                </a>
              </Link>
              <a
                href="/#"
                className="mt-1 block px-3 py-2 rounded text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                onClick={() => auth.signOut()}
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardHeader;
