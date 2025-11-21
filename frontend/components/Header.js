import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <Link href="/">The Gilded Emporium</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link href="/" className="text-white hover:text-accent">Home</Link></li>
            {isLoggedIn && (
              <>
                <li><Link href="/products" className="text-white hover:text-accent">Manage Products</Link></li>
                <li><Link href="/profile" className="text-white hover:text-accent">Profile</Link></li>
              </>
            )}
            <li>
              <Link href="/cart" className="relative text-white hover:text-accent">
                <FiShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="bg-accent text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="bg-accent text-white px-4 py-2 rounded hover:bg-yellow-700">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
