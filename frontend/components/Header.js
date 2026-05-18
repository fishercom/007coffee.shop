import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiBookOpen, FiCoffee, FiCompass, FiMapPin, FiMenu, FiShield, FiShoppingCart, FiTruck, FiX } from 'react-icons/fi';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '/subscriptions', label: 'Delivery', description: 'Recurring roast drops', Icon: FiTruck },
    { href: '/origins', label: 'Origins', description: 'Estate and region dossiers', Icon: FiCompass },
    { href: '/agency', label: 'Agency', description: 'The 007 Coffee membership', Icon: FiShield },
    { href: '/intel', label: 'Intel', description: 'Field notes and guides', Icon: FiBookOpen },
    { href: '/safehouses', label: 'Safehouses', description: 'Find a local pickup point', Icon: FiMapPin },
  ];

  const isActive = (href) => router.pathname === href || router.pathname.startsWith(`${href}/`);

  const CartLink = ({ className = '' }) => (
    <Link href="/cart" onClick={closeMenu} aria-label="Open cart" className={`relative text-text-primary hover:text-accent transition-colors flex items-center ${className}`}>
      <FiShoppingCart className="w-6 h-6" />
      {getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-espresso border border-accent text-accent text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-gold">
          {getTotalItems()}
        </span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 shadow-glass backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4 py-3 lg:min-h-[88px]">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="007 Coffee home"
            className="group flex min-w-0 items-center"
          >
            <Image
              src="/logo-full.png"
              alt="007 Coffee - Luxury Spy-Themed Coffee Shop"
              width={280}
              height={96}
              className="h-auto w-[178px] transition-transform duration-300 group-hover:scale-[1.02] min-[380px]:w-[190px] sm:w-[240px] lg:w-[280px]"
              style={{ height: 'auto', objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 font-medium tracking-wide">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-full px-4 py-2 text-sm transition-all ${
                      isActive(link.href)
                        ? 'bg-accent text-background shadow-gold'
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/admin/orders" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:text-accent">
                  HQ Profile
                </Link>
                <button onClick={handleLogout} className="rounded-full px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-white/5 hover:text-red-500">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="luxury-button !rounded-full !py-2 !px-5 text-sm">
                Agent Login
              </Link>
            )}
            <CartLink className="h-11 w-11 justify-center rounded-full border border-white/10 bg-white/[0.03]" />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <CartLink className="h-11 w-11 justify-center rounded-md border border-white/10 bg-white/5" />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-text-primary transition-colors hover:border-accent/50 hover:text-accent"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-white/10 pb-4 lg:hidden">
            <div className="flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent/70">
              <FiCoffee className="h-4 w-4" />
              Mission Menu
            </div>
            <ul className="grid gap-2">
              {navLinks.map((link) => {
                const Icon = link.Icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 rounded-md border px-3 py-3 transition-colors ${
                        isActive(link.href)
                          ? 'border-accent/40 bg-accent/10 text-accent'
                          : 'border-white/10 bg-white/[0.03] text-text-primary hover:border-accent/30 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-black/35 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">{link.label}</span>
                        <span className="mt-0.5 block text-sm font-normal text-text-secondary">{link.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/admin/orders" onClick={closeMenu} className="block rounded-md border border-white/10 bg-white/[0.03] px-3 py-3 text-text-primary transition-colors hover:border-accent/30 hover:bg-white/[0.06] hover:text-accent">
                      HQ Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full rounded-md px-3 py-3 text-left text-text-secondary transition-colors hover:bg-white/5 hover:text-red-500">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="px-3 pt-2">
                  <Link href="/login" onClick={closeMenu} className="luxury-button block w-full !px-4 !py-3 text-center text-sm">
                    Agent Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
