import Link from 'next/link';
import { useRouter } from 'next/router';

const AccountMenu: React.FC = () => {
  const router = useRouter();

  return (
    <nav>
      <Link href="/account">
        <a
          href="#"
          className={
            router.pathname === '/account'
              ? 'group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-200 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-300 transition ease-in-out duration-150'
              : 'group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition ease-in-out duration-150'
          }
          aria-current="page"
        >
          <span className="truncate">General</span>
        </a>
      </Link>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition ease-in-out duration-150"
      >
        <span className="truncate">Team</span>
      </a>
      <Link href="/account/billing">
        <a
          href=""
          className={
            router.pathname.includes('billing')
              ? 'mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-200 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-300 transition ease-in-out duration-150'
              : 'mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition ease-in-out duration-150'
          }
        >
          <span className="truncate">Billing</span>
        </a>
      </Link>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition ease-in-out duration-150"
      >
        <span className="truncate">Reports</span>
      </a>
    </nav>
  );
};

export default AccountMenu;
