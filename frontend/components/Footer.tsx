"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#073B3A] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="relative block w-48 h-16">
              <Image
                src="/assets/img/newimg/logo_99homes.png"
                alt="99 Homes"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Leading Real Estate Agency in Vasai-Virar, dedicated to helping you find your perfect home with transparency and trust.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#D4ED31]"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-[#D4ED31] hover:translate-x-2 transition-all flex items-center"><ArrowRight className="w-4 h-4 mr-2" /> About Us</Link></li>
              <li><Link href="/listing" className="text-gray-300 hover:text-[#D4ED31] hover:translate-x-2 transition-all flex items-center"><ArrowRight className="w-4 h-4 mr-2" /> Property List</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#D4ED31] hover:translate-x-2 transition-all flex items-center"><ArrowRight className="w-4 h-4 mr-2" /> Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-[#D4ED31] hover:translate-x-2 transition-all flex items-center"><ArrowRight className="w-4 h-4 mr-2" /> FAQ's</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#D4ED31]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#D4ED31] shrink-0" />
                <span className="text-gray-300">Vasai West, Mumbai Suburban, Maharashtra, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#D4ED31] shrink-0" />
                <a href="tel:+919168554428" className="text-gray-300 hover:text-[#D4ED31] transition-colors">+91 9168554428</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#D4ED31] shrink-0" />
                <a href="mailto:mayur99homes@gmail.com" className="text-gray-300 hover:text-[#D4ED31] transition-colors">mayur99homes@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / More */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#D4ED31]"></span>
            </h3>
            <p className="text-gray-300">Subscribe for the latest property updates.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 focus:outline-none focus:border-[#D4ED31] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#D4ED31] text-[#073B3A] px-4 rounded font-bold hover:bg-white transition-all">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>© 2024 99 Homes. All Rights Reserved. Built with ❤️ By{' '}<a href="https://snappify.in/" target="_blank" rel="noopener noreferrer" className="text-[#D4ED31] font-bold hover:underline">Team Snappify</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
