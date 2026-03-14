"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, Calendar, Square, ArrowRight } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

interface PropertyProps {
  property: {
    _id: string;
    name: string;
    location: string;
    price: string;
    configuration?: string;
    area?: string;
    possessionDate?: string;
    images: string[];
  };
}

const PropertyCard = ({ property }: PropertyProps) => {
  // ImgBB returns full URLs (https://i.ibb.co/...), legacy local images use /uploads/...
  const resolveImage = (src: string) => {
    if (!src) return '/assets/img/all-images/property/prop-img1.png';
    if (src.startsWith('http')) return src; // ImgBB or any absolute URL
    return `${BASE_URL}${src}`; // Legacy local path fallback
  };

  const firstImage = property.images && property.images.length > 0
    ? resolveImage(property.images[0])
    : '/assets/img/all-images/property/prop-img1.png';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={firstImage} 
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#D4ED31] text-[#073B3A] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            For Sale
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <h3 className="text-[#073B3A] font-bold text-lg leading-none">{property.price}</h3>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#073B3A] mb-1 group-hover:text-[#D4ED31] transition-colors line-clamp-1">
              {property.name}
            </h2>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-1 text-[#D4ED31]" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-6">
          <div className="text-center">
            <BedDouble className="w-5 h-5 mx-auto mb-1 text-gray-400" />
            <span className="text-[10px] uppercase text-gray-500 block font-bold">Config</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.configuration || 'N/A'}</span>
          </div>
          <div className="text-center">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-400" />
            <span className="text-[10px] uppercase text-gray-500 block font-bold">Possession</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.possessionDate || 'N/A'}</span>
          </div>
          <div className="text-center">
            <Square className="w-5 h-5 mx-auto mb-1 text-gray-400" />
            <span className="text-[10px] uppercase text-gray-500 block font-bold">Area</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.area || 'N/A'} sq</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            href={`/properties/${property._id}`}
            className="flex-1 bg-[#073B3A] text-white py-2.5 rounded-lg text-sm font-bold text-center hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all flex items-center justify-center group/btn"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <Link 
            href="/contact"
            className="flex-1 border-2 border-[#073B3A] text-[#073B3A] py-2.5 rounded-lg text-sm font-bold text-center hover:bg-[#073B3A] hover:text-white transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
