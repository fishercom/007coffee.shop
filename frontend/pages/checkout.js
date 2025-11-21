import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../services/api';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    if (cartItems.length === 0) {
      router.push('/cart'); // Redirect if cart is empty
    }
  }, [isLoggedIn, cartItems, router]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await api.post('/orders', { items: orderItems });
      clearCart();
      router.push('/order-success'); // Redirect to a success page
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <p>Redirecting...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center">
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="object-cover rounded-md mr-4" />
                )}
                <span className="text-lg font-medium">{item.name} x {item.quantity}</span>
              </div>
              <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 text-2xl font-bold">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <p className="text-lg text-gray-700">Name: {user?.firstName} {user?.lastName}</p>
          <p className="text-lg text-gray-700">Email: {user?.email}</p>
          {/* Add more shipping information fields if needed */}
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <div className="flex justify-end">
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors text-lg"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
