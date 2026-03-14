"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Phone, Mail, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    setIsMounted(true);
    
    // Check admin status
    setIsAdmin(localStorage.getItem('adminLoggedIn') === 'true');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listing', href: '/listing' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Header */}
      <div className="hidden lg:block bg-[#073B3A] text-white py-2 border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="mailto:99Homes@gmail.com" className="flex items-center hover:text-[#D4ED31] transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              99Homes@gmail.com
            </a>
            <a href="tel:(234)345-4574" className="flex items-center hover:text-[#D4ED31] transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              (234) 345-4574
            </a>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Vasai-Virar, Maharashtra
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isMounted && (
              <>
                {isAdmin ? (
                  <>
                    <Link href="/dashboard" className="hover:text-[#D4ED31] transition-colors font-bold">Dashboard</Link>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('adminLoggedIn');
                        window.location.reload();
                      }} 
                      className="hover:text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/dashboard/login" className="hover:text-[#D4ED31] transition-colors">Sign In</Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative w-40 h-10">
            <Image 
              src="/assets/img/newimg/new_logo.png" 
              alt="99 Homes" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[#073B3A] font-semibold hover:text-[#D4ED31] transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4ED31] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              suppressHydrationWarning
              className="p-2 text-[#073B3A] hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href="/listing" 
              className="bg-[#D4ED31] text-[#073B3A] px-6 py-2.5 rounded-md font-bold flex items-center hover:bg-[#073B3A] hover:text-white transition-all transform hover:scale-105"
            >
              View Listing
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-[#073B3A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="block text-[#073B3A] font-semibold text-lg hover:text-[#D4ED31]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/listing" 
              className="block bg-[#D4ED31] text-[#073B3A] px-6 py-3 rounded-md font-bold text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              View Listing
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
