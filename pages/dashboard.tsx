import { useRequireAuth } from 'hooks/useRequireAuth';
import Layout from 'components/dashboard/Layout';

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  return (
    <Layout>
      <div className="flex">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {`Welcome ${auth.user.name}!`}
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
              {`You are logged in with ${auth.user.email}`}
            </p>
            <button
              onClick={() => auth.signOut()}
              className="mt-5 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mariner-600 hover:bg-mariner-500 focus:outline-none focus:border-mariner-700 focus:shadow-outline-mariner active:bg-mariner-700 transition duration-150 ease-in-out"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoardPage;
