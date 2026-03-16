"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Search, MapPin, Building2, Users2, ShieldCheck, Mail, Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/properties';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listing?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/listing');
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(API_URL);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          setProperties(data.slice(0, 6)); // Show first 6 featured
        } else {
          console.error("Received non-JSON response for featured properties");
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[#073B3A] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#073B3A] via-[#073B3A]/80 to-transparent z-10" />
          <img 
            src="/assets/img/newimg/hero4.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-white">
          <div className="max-w-3xl space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Find Your <span className="text-[#D4ED31]">Dream Home</span> in Vasai-Virar
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-xl"
            >
              Discover the most premium residential and commercial properties with 99 Homes. Trusted expertise for over a decade.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.form 
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 flex flex-col md:flex-row gap-2 max-w-2xl group shadow-2xl transition-all hover:bg-white/20"
            >
              <div className="flex-1 flex items-center px-4 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-[#D4ED31] mr-3" />
                <input 
                  type="text" 
                  placeholder="Search by name, location..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  suppressHydrationWarning
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 w-full py-3"
                />
              </div>
            <button 
              type="submit"
              className="bg-[#D4ED31] text-[#073B3A] px-8 py-3 rounded-lg font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            >
              Search Now
            </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#073B3A]">500+</h2>
              <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">Properties Sold</p>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#073B3A]">1k+</h2>
              <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">Happy Clients</p>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#073B3A]">15+</h2>
              <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">Awards Won</p>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-[#073B3A]">10+</h2>
              <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row">
              {/* Founder Image */}
              <div className="md:w-2/5 relative h-[480px] md:h-auto">
                <img 
                  src="/assets/img/founder/mayur_founder2.jpg" 
                  alt="Mayur - Founder of 99 Homes" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#073B3A]/80 to-transparent md:bg-gradient-to-r" />
                <div className="absolute bottom-8 left-8 text-white md:hidden">
                  <h3 className="text-3xl font-bold">Mayur</h3>
                  <p className="text-[#D4ED31] font-medium tracking-widest uppercase text-sm">Founder, 99 Homes</p>
                </div>
              </div>

              {/* Founder Details */}
              <div className="md:w-3/5 p-8 md:p-16 space-y-8">
                <div className="hidden md:block space-y-2">
                  <span className="text-[#D4ED31] font-bold uppercase tracking-widest text-sm">Meet The Founder</span>
                  <h2 className="text-5xl font-bold text-[#073B3A]">Mayur</h2>
                  <div className="w-20 h-1.5 bg-[#D4ED31] rounded-full" />
                </div>

                <p className="text-gray-600 text-lg leading-relaxed italic">
                  "At 99 Homes, we believe that buying a home is not just a transaction, it's a dream coming true. My mission is to ensure every family in Vasai-Virar finds their perfect space with complete peace of mind."
                </p>

                {/* Credentials / Highlights */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-red-500 text-lg mt-0.5">🔴</span>
                    <div>
                      <p className="font-bold text-[#073B3A] text-sm">MahaRERA Registered</p>
                      <p className="text-gray-600 text-sm font-mono">Reg No: A99000034140</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-red-500 text-lg mt-0.5">🔴</span>
                    <div>
                      <p className="font-bold text-[#073B3A] text-sm">MahaRERA Exam Cleared</p>
                      <p className="text-gray-600 text-sm">Examination passed in 2023 (Check Highlights)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-red-500 text-lg mt-0.5">🔴</span>
                    <div>
                      <p className="font-bold text-[#073B3A] text-sm">We Consult In</p>
                      <p className="text-gray-600 text-sm font-semibold tracking-wide">BUYING / SELLING / RENTAL</p>
                    </div>
                  </div>
                  <a href="tel:+919168554428" className="flex items-center gap-3 bg-[#073B3A] rounded-xl px-4 py-3 text-white hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all group">
                    <span className="text-xl">☎️</span>
                    <div>
                      <p className="font-bold text-sm">Call Us Now</p>
                      <p className="font-mono text-lg font-black">9168554428</p>
                    </div>
                  </a>
                </div>

                <div className="pt-2 flex gap-4 flex-wrap">
                  <Link href="/contact" className="bg-[#073B3A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all shadow-lg">
                    Get In Touch
                  </Link>
                  <a href="https://wa.link/srrb9n" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#073B3A] text-[#073B3A] px-8 py-3 rounded-xl font-bold hover:bg-[#073B3A] hover:text-white transition-all shadow-md">
                    WhatsApp Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div className="space-y-4">
              <span className="text-[#D4ED31] font-bold uppercase tracking-widest text-sm flex items-center">
                <span className="w-8 h-[2px] bg-[#D4ED31] mr-3" /> Latest Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#073B3A]">Featured Properties</h2>
            </div>
            <a href="/listing" className="text-[#073B3A] font-bold hover:text-[#D4ED31] transition-colors flex items-center group">
              View All Properties 
              <span className="ml-2 w-8 h-8 rounded-full bg-[#D4ED31] flex items-center justify-center group-hover:bg-[#073B3A] group-hover:text-white transition-all">
                <Search className="w-4 h-4" />
              </span>
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-96 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4ED31]/10 rounded-full blur-3xl animate-pulse" />
               <img 
                 src="/assets/img/all-images/property/property-img1.png" 
                 alt="Luxury Home" 
                 className="rounded-2xl shadow-2xl relative z-10 w-full h-auto"
               />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4ED31] rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-[#073B3A]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Verified by</p>
                      <p className="text-lg font-bold text-[#073B3A]">99 Homes Trust</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <span className="text-[#D4ED31] font-bold uppercase tracking-widest text-sm">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#073B3A]">Why Choose 99 Homes?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We don't just sell houses; we help you find the place where your life unfolds. Our local expertise in Vasai-Virar ensures you get the best value and neighborhood insights.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Building2, title: 'Premium Selection', desc: 'Handpicked luxury properties for every budget.' },
                  { icon: MapPin, title: 'Local Expertise', desc: 'Deep roots and specialized knowledge of Vasai-Virar.' },
                  { icon: Users2, title: 'Client First', desc: 'Personalized service that puts your needs above all.' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#D4ED31] transition-all duration-300 shrink-0">
                      <item.icon className="w-6 h-6 text-[#073B3A]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#073B3A] text-lg">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
