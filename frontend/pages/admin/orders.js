import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';
import Modal from '../../components/Modal';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Only admins should access this page. Will be refined in Phase 4
    if (!isLoggedIn || !user || !user.roles.includes("Admin")) { // Assuming user has a 'roles' array
      router.push('/login'); // Redirect non-admins
      return;
    }
    fetchAllOrders();
  }, [isLoggedIn, user, router]);

  const fetchAllOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching all orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Set current status as initial value
    setIsModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedOrder || !newStatus) return;

    setLoading(true);
    try {
      await api.put(`/orders/${selectedOrder.id}/status`, { orderId: selectedOrder.id, newStatus });
      setIsModalOpen(false);
      fetchAllOrders(); // Refresh orders
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl text-text-primary">Loading orders...</p>
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
      <h1 className="text-3xl font-bold text-primary mb-8">Manage All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-lg text-gray-700">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id} by {order.userName}</h2>
                  <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
                  <p className={`text-lg font-semibold ${order.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>Status: {order.status}</p>
                  <button onClick={() => handleUpdateStatus(order)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Update Status
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4">
                    {item.productImageUrl && (
                      <Image src={item.productImageUrl} alt={item.productName} width={60} height={60} className="object-cover rounded-md" />
                    )}
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-gray-600">${item.unitPrice.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Update Status for Order #${selectedOrder.id}`}>
          <div className="p-4">
            <label htmlFor="newStatus" className="block text-sm font-medium text-text-primary mb-2">New Status</label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
              <button onClick={handleSaveStatus} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Save</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

AdminOrdersPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default AdminOrdersPage;
