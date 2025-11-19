import React from 'react';
import Link from 'next/link';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const defaultAvatar = '/default-avatar.svg'; // Path to your default avatar

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email : 'Guest';
  const userAvatar = user && user.avatarUrl ? user.avatarUrl : defaultAvatar;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <Link href="/profile" className="flex items-center justify-center h-20 border-b border-gray-700">
        <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
        <span className="ml-3 font-semibold">{userName}</span>
      </Link>
      <nav className="flex-1 px-4 py-6">
        <Link href="/" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FiHome className="w-6 h-6 mr-3" />
          Dashboard
        </Link>
        <Link href="/products" className="flex items-center px-4 py-2 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FiBox className="w-6 h-6 mr-3" />
          Products
        </Link>
        <Link href="/orders" className="flex items-center px-4 py-2 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FiShoppingCart className="w-6 h-6 mr-3" />
          Orders
        </Link>
        <Link href="/members" className="flex items-center px-4 py-2 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FiUsers className="w-6 h-6 mr-3" />
          Members
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FiSettings className="w-6 h-6 mr-3" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
