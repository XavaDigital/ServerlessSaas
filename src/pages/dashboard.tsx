import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';
import BreadCrumbs from 'components/dashboard/BreadCrumbs';

const DashboardPage: React.FC = () => {
  const { user } = useRequireAuth();
  if (!user) return null;

  const greetUser = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return `Good morning, ${user.name}`;
    }
    if (currentHour < 18) {
      return `Good afternoon, ${user.name}`;
    }
    return `Good evening, ${user.name}`;
  };

  const breadCrumbs = {
    back: {
      path: '/dashboard',
      text: 'Back',
    },
    first: {
      path: '/dashboard',
      text: 'Dashboard',
    },
  };

  return (
    <Layout>
      <div className="max-w-6xl py-10 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <header className="pb-4 sm:py-6 pl-3 border-b-2 border-gray-300 mb-6">
          {breadCrumbs && <BreadCrumbs breadCrumbs={breadCrumbs} />}
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate">
                {greetUser()}
              </h2>
            </div>
          </div>
        </header>
        <div className="bg-white overflow-hidden shadow rounded-lg h-48">
          <div className="px-4 py-5 sm:p-6">Your dashboard page</div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
