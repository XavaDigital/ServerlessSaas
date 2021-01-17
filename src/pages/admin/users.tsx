import { useEffect, useState } from 'react';

import SidebarLayout from 'components/admin/SidebarLayout';
import Spinner from 'components/icons/Spinner';
import UserCard from 'components/admin/UserCard';
import { db } from 'config/firebase';
import { useRequireAdmin } from 'hooks/useRequireAdmin';

const AdminUsersPage: React.FC = () => {
  const { user } = useRequireAdmin();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const data = [];

      await db
        .collection('users')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              data.push({ id: doc.id, ...doc.data() });
            }
          });
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });

      setIsLoading(false);
      setUsers(data);
    };

    if (user?.isAdmin) {
      fetchUsers();
    }
  }, [user?.isAdmin]);

  if (!user) return <Spinner width="30" className="m-auto mt-6 animate-spin" />;

  return (
    <SidebarLayout>
      <h1 className="px-8 pt-8 pb-4 text-xl font-bold text-gray-900 sm:text-2xl">
        Users
      </h1>

      {isLoading && <Spinner width="30" className="m-auto mt-6 animate-spin" />}
      {!isLoading && !users.length && (
        <div className="pt-5">No users found.</div>
      )}
      <ul className="grid grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {!isLoading &&
          users?.map((user) => <UserCard key={user.id} user={user} />)}
      </ul>
    </SidebarLayout>
  );
};

export default AdminUsersPage;
