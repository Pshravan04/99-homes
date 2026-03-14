"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, BedDouble, Calendar, Square, Check, ArrowLeft, Phone, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const API_URL = 'http://localhost:5000/api/properties';

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id;
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          setProperty(data);
        } else {
          console.error("Received non-JSON response for property details");
        }
      } catch (err) {
        console.error('Error fetching property details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#D4ED31] border-b-4 border-[#073B3A]"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-[#073B3A]">Property Not Found</h2>
        <Link href="/listing" className="mt-4 text-[#D4ED31] hover:underline">Back to Listing</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Page Header / Breadcrumb */}
       <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/listing" className="flex items-center text-[#073B3A] font-bold hover:text-[#D4ED31] transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Listing
          </Link>
          <div className="flex gap-4">
             <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#073B3A]"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </section>

      {/* Hero / Images */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
             {/* Main Image */}
             <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src={property.images && property.images.length > 0 ? `http://localhost:5000${property.images[0]}` : '/assets/img/all-images/property/prop-img1.png'} 
                  alt={property.name}
                  fill
                  className="object-cover"
                />
             </div>
             {/* Thumbnail Grid */}
             <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg border border-white">
                     <Image 
                        src={property.images && property.images.length > idx ? `http://localhost:5000${property.images[idx]}` : (property.images && property.images.length > 0 ? `http://localhost:5000${property.images[0]}` : '/assets/img/all-images/property/prop-img1.png')} 
                        alt={`${property.name} thumbnail`}
                        fill
                        className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                      />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-12">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#D4ED31] text-[#073B3A] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">{property.propertyType || 'Villa'}</span>
                    <span className="text-gray-500 font-medium">For Sale</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#073B3A]">{property.name}</h1>
                  <div className="flex items-center text-gray-500 text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-[#D4ED31]" />
                    {property.location}, {property.address}
                  </div>
               </div>

               {/* Key Features Bar */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#D4ED31]">
                      <BedDouble className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Config</p>
                      <p className="text-lg font-bold text-[#073B3A]">{property.configuration || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#D4ED31]">
                      <Square className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Area</p>
                      <p className="text-lg font-bold text-[#073B3A]">{property.area || 'N/A'} sq</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#D4ED31]">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Possession</p>
                      <p className="text-lg font-bold text-[#073B3A]">{property.possessionDate || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#073B3A] rounded-xl flex items-center justify-center text-[#D4ED31]">
                      <p className="text-xl font-black">₹</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Price</p>
                      <p className="text-lg font-bold text-[#073B3A]">{property.price}</p>
                    </div>
                  </div>
               </div>

               {/* Description */}
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#073B3A]">Description</h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
               </div>

               {/* Amenities */}
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#073B3A]">Property Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                    {property.amenities && property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-[#D4ED31]/20 flex items-center justify-center mr-3 shrink-0">
                          <Check className="w-4 h-4 text-[#073B3A] stroke-[3px]" />
                        </div>
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Right Sidebar / Inquiry */}
            <div className="lg:w-1/3">
               <div className="sticky top-24 space-y-8">
                  <div className="bg-[#073B3A] text-white p-8 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-bold mb-6">Inquiry About Home</h3>
                    <form className="space-y-4">
                       <input type="text" placeholder="Your Name" suppressHydrationWarning className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:border-[#D4ED31]" />
                       <input type="email" placeholder="Email Address" suppressHydrationWarning className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:border-[#D4ED31]" />
                       <textarea rows={4} placeholder="Your Message" suppressHydrationWarning className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 focus:outline-none focus:border-[#D4ED31]"></textarea>
                       <button className="w-full bg-[#D4ED31] text-[#073B3A] py-3.5 rounded-lg font-bold hover:bg-white transition-all transform active:scale-95">Send Inquiry</button>
                    </form>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                     <h4 className="text-xl font-bold text-[#073B3A]">Need Help?</h4>
                     <p className="text-gray-500">Our experts are here to guide you through the process.</p>
                     <div className="space-y-4 font-bold text-[#073B3A]">
                        <a href="tel:(234)345-4574" className="flex items-center hover:text-[#D4ED31] transition-colors"><Phone className="w-5 h-5 mr-3" /> (234) 345-4574</a>
                        <a href="mailto:info@99homes.com" className="flex items-center hover:text-[#D4ED31] transition-colors"><Mail className="w-5 h-5 mr-3" /> info@99homes.com</a>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
