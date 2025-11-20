import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Import useAuth

export default function Header() {
  const { isLoggedIn, logout } = useAuth(); // Use isLoggedIn and logout from AuthContext
  const router = useRouter();

  // No need for local isLoggedIn state or useEffect here anymore, AuthContext handles it

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    router.push('/login'); // Redirect to login page after logout
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
