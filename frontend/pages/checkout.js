import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

// Load Stripe with publishable key from environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Shipping State
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    // Only redirect if cart is empty AND order hasn't been placed yet
    if (cartItems.length === 0 && !isOrderPlaced) {
      router.push('/cart');
    }
  }, [isLoggedIn, cartItems, router, isOrderPlaced]);

  useEffect(() => {
    if (cartItems.length > 0 && isLoggedIn) {
      // Create PaymentIntent as soon as the page loads
      api.post("/payments/create-payment-intent", {
        items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
      })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => {
          console.error("Error creating payment intent", err);
          setError("Failed to initialize payment.");
        });
    }
  }, [cartItems, isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    // This is called AFTER successful payment
    setLoading(true);
    setError('');
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderData = {
        items: orderItems,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingPostalCode: shippingInfo.postalCode,
        shippingCountry: shippingInfo.country
      };

      await api.post('/orders', orderData);
      setIsOrderPlaced(true); // Set flag before clearing cart
      clearCart();
      router.push('/order-success');
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.response?.data?.message || 'Failed to place order.');
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!isLoggedIn || (cartItems.length === 0 && !isOrderPlaced)) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
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
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
              {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                  <PaymentForm onSuccess={handlePlaceOrder} />
                </Elements>
              ) : (
                <div className="flex justify-center items-center h-40">
                  {error ? <p className="text-red-500">{error}</p> : <p>Loading payment...</p>}
                </div>
              )}
              {error && !clientSecret && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
