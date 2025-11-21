import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Your order has been placed and will be processed shortly.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/orders" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
            View Your Orders
          </Link>
          <Link href="/" className="bg-accent text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </Layout>
  );
}
