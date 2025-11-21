import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser, isLoggedIn } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allRoles, setAllRoles] = useState(['Admin', 'Member']); // Hardcoded roles for now

  useEffect(() => {
    if (!isLoggedIn || !currentUser || !currentUser.roles.includes("Admin")) {
      router.push('/login');
      return;
    }
    fetchAllUsers();
  }, [isLoggedIn, currentUser, router]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching all users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoles = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRoleChange = (roleName, isChecked) => {
    if (selectedUser) {
      if (isChecked) {
        setSelectedUser({ ...selectedUser, roles: [...selectedUser.roles, roleName] });
      } else {
        setSelectedUser({ ...selectedUser, roles: selectedUser.roles.filter(r => r !== roleName) });
      }
    }
  };

  const handleSaveRoles = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      await api.put(`/users/${selectedUser.id}/roles`, { userId: selectedUser.id, roles: selectedUser.roles });
      setIsModalOpen(false);
      fetchAllUsers(); // Refresh users
    } catch (err) {
      console.error('Error updating user roles:', err);
      setError(err.response?.data?.message || 'Failed to update user roles.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl text-text-primary">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-600">
        <p className="text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-8">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-lg text-gray-700">No users found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.roles.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditRoles(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit Roles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Edit Roles for ${selectedUser.email}`}>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Roles</h3>
            <div className="space-y-2">
              {allRoles.map(role => (
                <div key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`role-${role}`}
                    checked={selectedUser.roles.includes(role)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-900">
                    {role}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
              <button onClick={handleSaveRoles} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Save Roles</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

AdminUsersPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default AdminUsersPage;
