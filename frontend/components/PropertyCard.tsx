"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, Calendar, Square, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // ImgBB returns full URLs (https://i.ibb.co/...), legacy local images use /uploads/...
  const resolveImage = (src: string) => {
    if (!src) return '/assets/img/all-images/property/prop-img1.png';
    if (src.startsWith('http')) return src; // ImgBB or any absolute URL
    return `${BASE_URL}${src}`; // Legacy local path fallback
  };

  const images = property.images && property.images.length > 0 
    ? property.images.map(resolveImage)
    : ['/assets/img/all-images/property/prop-img1.png'];

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300">
      {/* Image Section - Carousel */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image 
              src={images[currentImgIdx]} 
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#073B3A] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#073B3A] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImgIdx ? 'bg-[#D4ED31] w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#D4ED31] text-[#073B3A] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
            For Sale
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
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
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-6 font-medium">
          <div className="text-center group/feat">
            <BedDouble className="w-5 h-5 mx-auto mb-1 text-gray-400 group-hover/feat:text-[#D4ED31] transition-colors" />
            <span className="text-[10px] uppercase text-gray-400 block font-bold">Config</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.configuration || 'N/A'}</span>
          </div>
          <div className="text-center group/feat">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-400 group-hover/feat:text-[#D4ED31] transition-colors" />
            <span className="text-[10px] uppercase text-gray-400 block font-bold">Possession</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.possessionDate || 'N/A'}</span>
          </div>
          <div className="text-center group/feat">
            <Square className="w-5 h-5 mx-auto mb-1 text-gray-400 group-hover/feat:text-[#D4ED31] transition-colors" />
            <span className="text-[10px] uppercase text-gray-400 block font-bold">Area</span>
            <span className="text-xs font-bold text-[#073B3A]">{property.area || 'N/A'} sq</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            href={`/properties/${property.slug || property._id}`}
            className="flex-1 bg-[#073B3A] text-white py-2.5 rounded-lg text-sm font-bold text-center hover:bg-[#D4ED31] hover:text-[#073B3A] transition-all flex items-center justify-center group/btn shadow-md hover:shadow-lg"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <a 
            href="https://wa.link/srrb9n"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#073B3A] text-[#073B3A] py-2.5 rounded-lg text-sm font-bold text-center hover:bg-[#073B3A] hover:text-white transition-all flex items-center justify-center shadow-sm hover:shadow-md"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};


export default PropertyCard;
