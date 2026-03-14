"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, BedDouble, Calendar, Square, Check, ArrowLeft, Phone, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/properties';

interface Property {
  _id: string;
  name: string;
  location: string;
  address: string;
  price: string;
  configuration: string;
  area: string;
  possessionDate: string;
  description: string;
  propertyType: string;
  images: string[];
  amenities: string[];
  slug?: string;
  reraNumber?: string;
  reraQrCode?: string;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  const resolveImage = (src: string) => {
    if (!src) return '/assets/img/all-images/property/prop-img1.png';
    if (src.startsWith('http')) return src;
    if (src.startsWith('/assets')) return src;
    return `${BASE_URL}${src}`;
  };

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
          
          // If we accessed via ID but it has a slug, optionally redirect to slug URL
          // But for now just display
          if (data.slug && id === data._id) {
             window.history.replaceState(null, '', `/properties/${data.slug}`);
          }
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
                  src={resolveImage(property.images?.[0])} 
                  alt={property.name}
                  fill
                  className="object-cover"
                />
             </div>
             {/* Thumbnail Grid */}
             <div className="grid grid-cols-2 gap-4 h-full">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg border border-white h-full">
                     <Image 
                        src={resolveImage(property.images?.[idx] || property.images?.[0])} 
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
                    <span className="bg-[#D4ED31] text-[#073B3A] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">{property.propertyType || 'Apartment'}</span>
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

               {/* MahaRERA Section */}
               {(property.reraNumber || property.reraQrCode) && (
                 <div className="bg-[#073B3A] p-8 rounded-2xl shadow-xl text-white">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                       <div className="flex-1 space-y-4">
                          <h3 className="text-2xl font-bold">MahaRERA Registered</h3>
                          <p className="text-gray-300">This property is registered under Maharashtra Real Estate Regulatory Authority. Your investment is protected by regulatory standards.</p>
                          <div className="bg-white/10 border border-white/20 p-4 rounded-xl inline-block">
                             <p className="text-xs uppercase font-bold tracking-widest text-[#D4ED31] mb-1">Registration No.</p>
                             <p className="text-2xl font-black tracking-wider">{property.reraNumber || 'Not Provided'}</p>
                          </div>
                       </div>
                       {property.reraQrCode && (
                         <div className="bg-white p-4 rounded-2xl shrink-0 shadow-lg">
                            <img 
                              src={resolveImage(property.reraQrCode)} 
                              alt="MahaRERA QR Code" 
                              className="w-32 h-32 object-contain"
                            />
                            <p className="text-[10px] text-center text-[#073B3A] font-bold mt-2 uppercase">Scan to Verify</p>
                         </div>
                       )}
                    </div>
                 </div>
               )}

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
                    <h3 className="text-2xl font-bold mb-6">Talk to the Expert</h3>
                    <div className="space-y-6">
                       <p className="text-gray-300">Interested in this property? Get in touch with our team for exclusive details and site visits.</p>
                       <a 
                         href="https://wa.link/srrb9n" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="w-full bg-[#D4ED31] text-[#073B3A] py-4 rounded-xl font-bold hover:bg-white transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-lg"
                       >
                         Contact via WhatsApp
                       </a>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                     <h4 className="text-xl font-bold text-[#073B3A]">Quick Contact</h4>
                     <p className="text-gray-500">Available 24/7 for your housing needs in Vasai-Virar.</p>
                     <div className="space-y-4 font-bold text-[#073B3A]">
                        <a href="tel:+919168554428" className="flex items-center hover:text-[#D4ED31] transition-colors"><Phone className="w-5 h-5 mr-3" /> +91 9168554428</a>
                        <a href="mailto:mayur99homes@gmail.com" className="flex items-center hover:text-[#D4ED31] transition-colors"><Mail className="w-5 h-5 mr-3" /> mayur99homes@gmail.com</a>
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
    </div>
  );
}
