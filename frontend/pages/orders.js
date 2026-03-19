import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.push('/login');
      return;
    }
    fetchUserOrders();
  }, [isLoggedIn, user, router]);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (err) {
      console.log('Error fetching user orders:', err.message || err);
      setError(err.response?.data?.message || 'Failed to fetch orders.');
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
      <h1 className="text-3xl font-bold text-primary mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-lg text-gray-700">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
                  <p className={`text-lg font-semibold ${order.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>Status: {order.status}</p>
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
    </>
  );
}

OrdersPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default OrdersPage;
