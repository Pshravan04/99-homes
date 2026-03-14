"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { MapPin, Filter, Search, ChevronDown } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/properties';

export default function ListingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(API_URL);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.error("Received non-JSON response from backend");
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-[#073B3A] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/img/all-images/hero/hero-img1.png" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Listing</h1>
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium">
            <a href="/" className="hover:text-[#D4ED31]">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-[#D4ED31]">Listing</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar / Filters */}
            <div className="lg:w-1/4 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="text-xl font-bold text-[#073B3A] mb-6 flex items-center">
                   <Filter className="w-5 h-5 mr-2" /> Filter Search
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select 
                          suppressHydrationWarning
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#D4ED31] outline-none appearance-none font-medium"
                        >
                          <option>Vasai-Virar</option>
                          <option>Nallasopara</option>
                          <option>Naigaon</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    {/* Add more filters here as needed */}
                    <button 
                      suppressHydrationWarning
                      className="w-full bg-[#073B3A] text-white py-3 rounded-lg font-bold hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all"
                    >
                      Apply Filters
                    </button>
                 </div>
              </div>

              {/* Map Focus Card */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-sm font-bold text-[#073B3A] mb-4 uppercase tracking-widest px-2">Map Focus: Vasai-Virar</h3>
                <div className="rounded-lg overflow-hidden h-64 grayscale transition-all hover:grayscale-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15053.488661642193!2d72.8277271!3d19.3907044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9569d64380b%3A0x6bba3bc132b85e00!2sVasai-Virar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711234567890!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8 px-2">
                <p className="text-gray-500 font-medium">Found <span className="text-[#073B3A] font-bold">{properties.length}</span> properties</p>
                <div className="flex items-center gap-4">
                  {/* Grid/List switch could go here */}
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 h-96 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {properties.map((prop) => (
                    <PropertyCard key={prop._id} property={prop} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
