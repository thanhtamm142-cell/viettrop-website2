import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#176B45] text-[#FFF9EC] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-semibold tracking-wide">VIETTROP</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>Authentic Vietnamese Tropical Fruit Snacks</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3">
            <span className="font-medium">Free Australian shipping on orders over $45 AUD</span>
            <span aria-hidden="true" className="opacity-60 hidden md:inline">·</span>
            <span className="hidden md:flex items-center gap-1 opacity-90">
              <MapPin className="w-3.5 h-3.5 text-[#F5B841]" /> Adelaide, SA Dispatch
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1 opacity-80 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Demo Startup Project
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FFF9EC]/95 backdrop-blur-md border-b border-[#26352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Distinctive VietTrop Wordmark with Tropical Leaf Motif */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-[#176B45] hover:opacity-90 transition-opacity shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B45] rounded-md py-1 px-1"
            aria-label="VietTrop Home"
          >
            {/* Custom SVG logo icon: minimalist tropical palm leaf & fruit silhouette */}
            <div className="w-10 h-10 rounded-xl bg-[#176B45] flex items-center justify-center text-[#FFF9EC] shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-[#F5B841]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L14.5 7.5L20 8.5L16 12.5L17 18L12 15L7 18L8 12.5L4 8.5L9.5 7.5L12 2Z" fill="#F5B841" stroke="#F5B841" />
                <path d="M12 15V22" stroke="#FFF9EC" strokeWidth="2.5" />
                <path d="M7 18C4 18 2 15 2 12C2 9 6 6 12 6" stroke="#FFF9EC" strokeWidth="1.5" strokeDasharray="1 2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-tight text-[#176B45] leading-none">
                Viet<span className="text-[#F29B38]">Trop</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#26352D]/70 mt-0.5">
                Taste Vietnam · Live Healthy
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Single-Line, Whitespace-Nowrap) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#26352D]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap transition-colors py-1 relative hover:text-[#176B45] ${
                  isActive(link.path)
                    ? 'text-[#176B45] font-semibold'
                    : 'text-[#26352D]/80'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#176B45] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Search, Cart Icon, and Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#26352D]/80 hover:text-[#176B45] hover:bg-[#F6EEDC] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B45]"
              aria-label="Search snacks and articles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#26352D] hover:text-[#176B45] hover:bg-[#F6EEDC] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B45] flex items-center gap-1.5"
              aria-label={`Shopping Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#176B45]" />
              {totalItemsCount > 0 && (
                <span className="bg-[#F29B38] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Shop CTA button */}
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FFF9EC] bg-[#176B45] hover:bg-[#125537] rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Shop Fruits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#26352D] hover:text-[#176B45] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B45]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#26352D]/10 bg-[#FFF9EC] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#176B45] text-white'
                      : 'text-[#26352D] hover:bg-[#F6EEDC]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#26352D]/10 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F6EEDC] text-sm font-medium text-[#26352D]"
              >
                <Search className="w-4 h-4" />
                <span>Search Vietnamese Snacks</span>
              </button>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#176B45] text-sm font-semibold text-[#176B45]"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> View Shopping Cart
                </span>
                <span className="bg-[#176B45] text-white px-2 py-0.5 rounded-full text-xs font-bold tabular-nums">
                  {totalItemsCount}
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
