import Link from 'next/link';
import Image from 'next/image';
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
    <header className="glassmorphism sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo-full.png"
            alt="007 Coffee Logo"
            width={280}
            height={70}
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
            priority
          />
        </Link>
        <nav>
          <ul className="flex space-x-8 items-center font-medium tracking-wide">
            <li><Link href="/" className="text-text-primary hover:text-accent transition-colors">Shop Subscriptions</Link></li>
            <li><Link href="/origins" className="text-text-primary hover:text-accent transition-colors">Origins</Link></li>
            {isLoggedIn && (
              <>
                <li><Link href="/products" className="text-text-primary hover:text-accent transition-colors">Manage</Link></li>
                <li><Link href="/profile" className="text-text-primary hover:text-accent transition-colors">HQ Profile</Link></li>
              </>
            )}
            <li>
              <Link href="/cart" className="relative text-text-primary hover:text-accent transition-colors">
                <FiShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-espresso border border-accent text-accent text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-gold">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="luxury-button !py-2 !px-5 text-sm">
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="luxury-button !py-2 !px-5 text-sm">
                  Agent Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
