"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Save, 
  MapPin, 
  Info, 
  Home, 
  ImageIcon,
  Plus,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/properties';

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    price: '',
    configuration: '',
    area: '',
    possessionDate: '',
    description: '',
    propertyType: 'Apartment',
    reraNumber: '',
    reraQrCode: '',
    amenities: [] as string[]
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [reraQrFile, setReraQrFile] = useState<File | null>(null);
  const [reraQrPreview, setReraQrPreview] = useState<string>('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/dashboard/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleReraQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReraQrFile(file);
      setReraQrPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'amenities') {
        formData.amenities.forEach(amenity => data.append('amenities', amenity));
      } else {
        data.append(key, (formData as any)[key]);
      }
    });

    images.forEach(image => {
      data.append('images', image);
    });

    if (reraQrFile) {
      data.append('reraQrCode', reraQrFile);
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('Failed to add property');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const amenityOptions = [
    'Car Parking', 'Swimming Pool', 'Gym', 'Garden', 
    'CCTV Security', 'Lift', 'Club House', 'Power Backup',
    'Play Area', 'Intercom', 'Fire Safety', 'Gas Pipeline'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-4 md:px-10 py-6 sticky top-0 z-20 flex items-center gap-6 shadow-sm">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#073B3A]">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-[#073B3A]">Add New Property</h1>
      </header>

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
               <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Info className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-[#073B3A]">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Title*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  placeholder="e.g. Diamond Villa"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price*</label>
                <input 
                  type="text" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required
                  placeholder="e.g. ₹ 85 Lacs"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location (Area)*</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required
                  placeholder="e.g. Vasai West"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Type*</label>
                <select 
                   name="propertyType"
                   value={formData.propertyType}
                   onChange={handleChange}
                   className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all appearance-none"
                >
                  <option>Apartment</option>
                  <option>Tower</option>
                  <option>Building</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Address*</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#D4ED31]" />
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required
                  rows={2}
                  placeholder="Enter detailed property address"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
               <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Home className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-[#073B3A]">Specifications & Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Configuration*</label>
                <input 
                  type="text" 
                  name="configuration" 
                  value={formData.configuration} 
                  onChange={handleChange}
                  placeholder="e.g. 1 BHK, 2 BHK"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Area (SQFT)*</label>
                <input 
                  type="text" 
                  name="area" 
                  value={formData.area} 
                  onChange={handleChange}
                  placeholder="e.g. 650"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Possession Date*</label>
                <input 
                  type="text" 
                  name="possessionDate" 
                  value={formData.possessionDate} 
                  onChange={handleChange}
                  placeholder="e.g. Dec, 2025"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description*</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required
                rows={6}
                placeholder="Describe the property highlights, neighborhood, and unique features..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all resize-none"
              ></textarea>
            </div>
          </section>

          {/* MahaRERA Section */}
          <section className="bg-[#073B3A] p-8 rounded-3xl shadow-xl border border-white/10 space-y-8 text-white">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
               <div className="p-2 bg-[#D4ED31]/10 rounded-lg text-[#D4ED31]">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold">MahaRERA Registration</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">RERA Registration No.</label>
                    <input 
                      type="text" 
                      name="reraNumber" 
                      value={formData.reraNumber} 
                      onChange={handleChange}
                      placeholder="e.g. P99000012345"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#D4ED31] outline-none transition-all text-white placeholder:text-white/20"
                    />
                  </div>
                  <p className="text-sm text-gray-400">Enter the official MahaRERA registration number for this project.</p>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">RERA QR Code</label>
                  <div className="flex items-center gap-6">
                     <label className="flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4ED31] hover:bg-white/10 transition-all group">
                        <Upload className="w-8 h-8 mb-2 text-white/40 group-hover:text-[#D4ED31]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white">Upload QR Image</span>
                        <input type="file" onChange={handleReraQrChange} className="hidden" accept="image/*" />
                     </label>
                     {reraQrPreview && (
                       <div className="relative w-28 h-28 bg-white p-2 rounded-xl shadow-lg shrink-0 overflow-hidden">
                          <img src={reraQrPreview} className="w-full h-full object-contain" alt="RERA QR Preview" />
                          <button 
                            type="button" 
                            onClick={() => { setReraQrFile(null); setReraQrPreview(''); }}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </section>

          {/* Amenities Section */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
               <div className="p-2 bg-[#D4ED31]/10 rounded-lg text-[#073B3A]">
                  <Plus className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-[#073B3A]">Amenities</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenityOptions.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleAmenityChange(amenity)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-sm font-bold ${
                    formData.amenities.includes(amenity)
                      ? 'bg-[#073B3A] border-[#073B3A] text-white'
                      : 'bg-gray-50 border-gray-100 text-[#073B3A] hover:border-[#D4ED31]'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${formData.amenities.includes(amenity) ? 'bg-[#D4ED31]' : 'bg-gray-300'}`} />
                  {amenity}
                </button>
              ))}
            </div>
          </section>

          {/* Images Section */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
               <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <ImageIcon className="w-5 h-5" />
               </div>
               <h2 className="text-xl font-bold text-[#073B3A]">Property Images</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {previews.map((preview, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={i} 
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-md group"
                >
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    suppressHydrationWarning
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              <label className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#D4ED31] hover:bg-white transition-all text-gray-400 hover:text-[#073B3A]">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Upload Image</span>
                <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
            </div>
            <p className="text-xs text-gray-400 text-center">Supported formats: JPG, PNG, WEBP. First image will be used as the cover photo.</p>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
             <button 
                type="submit" 
                disabled={loading}
                suppressHydrationWarning
                className="flex-1 bg-[#D4ED31] text-[#073B3A] py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#073B3A] hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-[#D4ED31]/20 disabled:opacity-50"
             >
                {loading ? (
                  <div className="w-8 h-8 border-4 border-[#073B3A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Save Property Listing
                    <Save className="w-6 h-6" />
                  </>
                )}
             </button>
             <Link 
                href="/dashboard" 
                className="bg-white text-gray-400 py-5 px-10 rounded-2xl font-bold text-center border border-gray-100 hover:bg-gray-50 hover:text-[#073B3A] transition-all"
             >
               Cancel
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
