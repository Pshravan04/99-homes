"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  LayoutDashboard, 
  Building2, 
  LogOut, 
  MoreVertical,
  MapPin,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/properties';

export default function AdminDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    // Auth Check
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/dashboard/login');
      return;
    }

    fetchProperties();
  }, [router]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(API_URL);
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        setProperties(data);
      } else {
        console.error("Received non-JSON response from properties API");
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/dashboard/login');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProperties(properties.filter((p: any) => p._id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredProperties = properties.filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#073B3A] text-white fixed h-full hidden lg:flex flex-col p-6 shadow-2xl z-30">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-[#D4ED31] rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-[#073B3A]" />
          </div>
          <span className="text-xl font-bold tracking-tight">Admin<span className="text-[#D4ED31]">99</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#D4ED31] text-[#073B3A] rounded-xl font-bold transition-all shadow-lg shadow-[#D4ED31]/10">
            <Building2 className="w-5 h-5" />
            Properties
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group">
            <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-[#D4ED31]" />
            View Website
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl font-medium transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b px-4 md:px-10 py-6 sticky top-0 z-20 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl font-bold text-[#073B3A]">Property Management</h1>
             <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest hidden md:block">{properties.length} Active Listings</span>
          </div>

          <Link 
            href="/dashboard/add-property"
            className="bg-[#D4ED31] text-[#073B3A] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#073B3A] hover:text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-[#D4ED31]/10"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </Link>
        </header>

        <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { label: 'Total Properties', value: properties.length, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
               { label: 'Featured Items', value: properties.slice(0, 3).length, icon: TrendingUp, color: 'text-[#D4ED31]', bg: 'bg-[#073B3A]/5' },
               { label: 'Views (All Time)', value: '1.2k', icon: Search, color: 'text-purple-600', bg: 'bg-purple-50' },
             ].map((stat, i) => (
               <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-black text-[#073B3A]">{stat.value}</p>
                  </div>
               </div>
             ))}
          </div>

          {/* Table / List */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
             <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#073B3A]">Properties List</h2>
                <div className="relative w-full md:w-96">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                   <input 
                    type="text" 
                    placeholder="Search by name or location..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#D4ED31] transition-all"
                   />
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Property</th>
                      <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                      <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                      <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <AnimatePresence>
                      {filteredProperties.map((prop: any) => (
                        <motion.tr 
                          key={prop._id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="hover:bg-gray-50 transition-colors group"
                        >
                          <td className="px-6 py-6 font-medium">
                            <div className="flex items-center gap-4">
                               <div className="w-16 h-12 relative rounded-lg overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                                  <img 
                                    src={prop.images && prop.images.length > 0 ? `http://localhost:5000${prop.images[0]}` : '/assets/img/all-images/property/prop-img1.png'} 
                                    className="w-full h-full object-cover"
                                    alt={prop.name}
                                  />
                               </div>
                               <div>
                                  <p className="text-[#073B3A] font-bold line-clamp-1">{prop.name}</p>
                                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{prop.propertyType || 'Villa'}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-center text-gray-600 gap-1.5">
                                <MapPin className="w-4 h-4 text-[#D4ED31]" />
                                <span className="text-sm font-medium">{prop.location}</span>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <span className="bg-[#073B3A]/5 text-[#073B3A] px-3 py-1 rounded-full text-sm font-black border border-[#073B3A]/10">
                               {prop.price}
                             </span>
                          </td>
                          <td className="px-6 py-6 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <Link 
                                  href={`/dashboard/edit/${prop._id}`}
                                  className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit Property"
                                >
                                  <Edit className="w-5 h-5" />
                                </Link>
                                <button 
                                  onClick={() => handleDelete(prop._id)}
                                  disabled={isDeleting === prop._id}
                                  className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Property"
                                >
                                  {isDeleting === prop._id ? (
                                    <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Trash2 className="w-5 h-5" />
                                  )}
                                </button>
                             </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
             </div>

             {filteredProperties.length === 0 && (
               <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#073B3A]">No properties found</h3>
                  <p className="text-gray-400">Try adjusting your search or add a new property listing.</p>
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
