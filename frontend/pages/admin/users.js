import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import IconButton from '../../components/IconButton';
import UserForm from '../../components/UserForm';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser, isLoggedIn } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
      console.log('Error fetching all users:', err.message || err);
      setError(err.response?.data?.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`/users/${id}`);
        fetchAllUsers();
      } catch (err) {
        console.log('Error deleting user:', err.message || err);
        setError(err.response?.data?.message || 'Failed to delete user.');
      }
    }
  };

  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        // Update existing user
        await api.put(`/users/${selectedUser.id}`, {
          userId: selectedUser.id,
          ...userData
        });
      } else {
        // Create new user
        await api.post('/users', userData);
      }
      setIsModalOpen(false);
      fetchAllUsers();
    } catch (err) {
      console.log('Error saving user:', err.message || err);
      setError(err.response?.data?.message || 'Failed to save user.');
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
      <div className="flex flex-col items-center justify-center text-red-600">
        <p className="text-2xl mb-4">{error}</p>
        <button
          onClick={() => { setError(''); fetchAllUsers(); }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Manage Users</h1>
        <button
          onClick={handleAdd}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-lg text-gray-700">No users found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phoneNumber || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.roles.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <IconButton
                        onClick={() => handleEdit(user)}
                        icon="edit"
                        label="Edit user"
                        variant="primary"
                      />
                      <IconButton
                        onClick={() => handleDelete(user.id)}
                        icon="delete"
                        label="Delete user"
                        variant="danger"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Create User'}
      >
        <UserForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

AdminUsersPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AdminUsersPage;
