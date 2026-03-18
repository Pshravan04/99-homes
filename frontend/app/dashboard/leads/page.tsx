"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    Search,
    Users,
    MapPin,
    Calendar,
    Phone,
    CheckCircle2,
    Clock,
    XCircle,
    MoreVertical
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

const API_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000') + '/api/leads';

interface Lead {
    _id: string;
    name: string;
    mobile: string;
    configuration: string;
    preferredLocation: string;
    projectStatus: string;
    status?: string;
    createdAt: string;
}

export default function LeadsDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (!isLoggedIn) {
            router.push('/dashboard/login');
            return;
        }
        fetchLeads();
    }, [router]);

    const fetchLeads = async () => {
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setLeads(leads.filter(l => l._id !== id));
            }
        } catch (err) {
            console.error('Delete error:', err);
        } finally {
            setIsDeleting(null);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setIsUpdating(id);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
            }
        } catch (err) {
            console.error('Update error:', err);
        } finally {
            setIsUpdating(null);
        }
    };

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.mobile.includes(searchTerm) ||
        l.preferredLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'Contacted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Closed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Lost': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200'; // New
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <DashboardSidebar />

            <main className="flex-1 lg:ml-64 min-h-screen">
                <header className="bg-white border-b px-4 md:px-10 py-6 sticky top-0 z-20 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-[#073B3A]">Leads Management</h1>
                        <span className="bg-[#D4ED31]/10 text-[#073B3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest hidden md:block">
                            {leads.length} Total Enquiries
                        </span>
                    </div>
                </header>

                <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'New Leads', value: leads.filter(l => !l.status || l.status === 'New').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                            { label: 'In Progress', value: leads.filter(l => l.status === 'Contacted').length, icon: Phone, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Closed/Won', value: leads.filter(l => l.status === 'Closed').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                            { label: 'Lost', value: leads.filter(l => l.status === 'Lost').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-xl font-black text-[#073B3A]">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-[#073B3A]">All Enquiries</h2>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search leads by name, phone or area..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#D4ED31] transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Lead Details</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Requirements</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <AnimatePresence>
                                        {filteredLeads.map((lead) => (
                                            <motion.tr
                                                key={lead._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="hover:bg-gray-50 transition-colors group"
                                            >
                                                <td className="px-6 py-6">
                                                    <div className="space-y-1">
                                                        <p className="text-[#073B3A] font-bold text-lg">{lead.name}</p>
                                                        <div className="flex flex-col gap-1">
                                                            <a href={`tel:${lead.mobile}`} className="flex items-center text-sm font-bold text-blue-600 hover:underline gap-1.5">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                {lead.mobile}
                                                            </a>
                                                            <div className="flex items-center text-xs text-gray-400 font-medium gap-1.5">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <div className="inline-flex flex-col gap-1 text-sm">
                                                        <span className="bg-[#073B3A] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                            {lead.configuration}
                                                        </span>
                                                        <div className="flex items-center justify-center text-gray-600 gap-1 mt-1">
                                                            <MapPin className="w-3.5 h-3.5 text-[#D4ED31]" />
                                                            <span className="font-bold">{lead.preferredLocation}</span>
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase">{lead.projectStatus}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="relative group/status flex justify-center md:justify-start">
                                                        <select
                                                            value={lead.status || 'New'}
                                                            onChange={(e) => updateStatus(lead._id, e.target.value)}
                                                            disabled={isUpdating === lead._id}
                                                            className={`appearance-none px-4 py-2 rounded-full text-xs font-black border transition-all cursor-pointer pr-8 outline-none ${getStatusColor(lead.status)}`}
                                                        >
                                                            <option value="New">NEW</option>
                                                            <option value="Contacted">CONTACTED</option>
                                                            <option value="Closed">CLOSED</option>
                                                            <option value="Lost">LOST</option>
                                                        </select>
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                            {isUpdating === lead._id ? (
                                                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <MoreVertical className="w-3 h-3" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button
                                                        onClick={() => handleDelete(lead._id)}
                                                        disabled={isDeleting === lead._id}
                                                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                        title="Delete Lead"
                                                    >
                                                        {isDeleting === lead._id ? (
                                                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {filteredLeads.length === 0 && (
                            <div className="p-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <Users className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-[#073B3A]">No enquiries found</h3>
                                <p className="text-gray-400">New leads from the website popup will appear here automatically.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
