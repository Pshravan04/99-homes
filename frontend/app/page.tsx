"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Search, MapPin, Building2, Users2, ShieldCheck, Mail, Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/properties';

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            src="/assets/img/hero/hero-bg.jpg" 
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 flex flex-col md:flex-row gap-2 max-w-2xl group shadow-2xl transition-all hover:bg-white/20"
            >
              <div className="flex-1 flex items-center px-4 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-[#D4ED31] mr-3" />
                <input 
                  type="text" 
                  placeholder="Street, City, Zip..." 
                  suppressHydrationWarning
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 w-full py-3"
                />
              </div>
            <Link 
              href="/listing"
              className="bg-[#D4ED31] text-[#073B3A] px-8 py-3 rounded-lg font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            >
              Search Now
            </Link>
            </motion.div>
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

      {/* Founder Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row">
              {/* Founder Image */}
              <div className="md:w-2/5 relative h-[400px] md:h-auto">
                <img 
                  src="/assets/img/founder/mayur.jpg" 
                  alt="Mayur - Founder of 99 Homes" 
                  className="w-full h-full object-cover"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-[#073B3A] font-bold uppercase tracking-wider text-xs">Direct Contact</h4>
                    <div className="space-y-3">
                      <a href="tel:+919168554428" className="flex items-center text-gray-600 hover:text-[#D4ED31] transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#D4ED31]/10">
                          <Phone className="w-4 h-4 text-[#073B3A]" />
                        </div>
                        <span className="font-semibold">+91 9168554428</span>
                      </a>
                      <a href="mailto:mayur99homes@gmail.com" className="flex items-center text-gray-600 hover:text-[#D4ED31] transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#D4ED31]/10">
                          <Mail className="w-4 h-4 text-[#073B3A]" />
                        </div>
                        <span className="font-semibold">mayur99homes@gmail.com</span>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[#073B3A] font-bold uppercase tracking-wider text-xs">Social Presence</h4>
                    <div className="flex gap-3">
                      <a href="https://wa.link/srrb9n" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </a>
                      <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                        <Instagram className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Link href="/contact" className="bg-[#073B3A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all shadow-lg hover:shadow-[#D4ED31]/20">
                    Get In Touch
                  </Link>
                  <a href="https://wa.link/srrb9n" className="bg-white border-2 border-[#073B3A] text-[#073B3A] px-8 py-3 rounded-xl font-bold hover:bg-[#073B3A] hover:text-white transition-all">
                    WhatsApp Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
