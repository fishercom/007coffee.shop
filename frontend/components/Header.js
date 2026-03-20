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
            style={{ objectFit: 'contain', objectPosition: 'left center', width: 'auto', height: 'auto' }}
            priority
          />
        </Link>
        <nav>
          <ul className="flex space-x-6 lg:space-x-8 items-center font-medium tracking-wide text-sm lg:text-base">
            <li><Link href="/subscriptions" className="text-text-primary hover:text-accent transition-colors block py-2">Double-O Delivery</Link></li>
            <li><Link href="/origins" className="text-text-primary hover:text-accent transition-colors block py-2">Origins</Link></li>
            <li><Link href="/agency" className="text-text-primary hover:text-accent transition-colors block py-2">The Agency</Link></li>
            <li><Link href="/intel" className="text-text-primary hover:text-accent transition-colors block py-2">Intel Logs</Link></li>
            <li><Link href="/safehouses" className="text-text-primary hover:text-accent transition-colors block py-2">Safehouses</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link href="/admin/orders" className="text-text-primary hover:text-accent transition-colors block py-2">HQ Profile</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-text-secondary hover:text-red-500 transition-colors block py-2">
                    Disavow (Logout)
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="luxury-button !py-2 !px-5 text-sm">
                  Agent Login
                </Link>
              </li>
            )}
            <li>
              <Link href="/cart" className="relative text-text-primary hover:text-accent transition-colors flex items-center">
                <FiShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-espresso border border-accent text-accent text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-gold">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
