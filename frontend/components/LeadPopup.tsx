"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, User, Home, MapPin, CheckCircle2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/properties', '/leads') || 'https://nine9-homes-backend.onrender.com/api/leads';

const LeadPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        configuration: '1 BHK',
        preferredLocation: 'Virar',
        projectStatus: 'Ready'
    });

    useEffect(() => {
        // Show popup after 3 seconds if not shown in this session
        const hasShown = sessionStorage.getItem('lead_popup_shown');
        if (!hasShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('lead_popup_shown', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-[#073B3A]/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-[#073B3A] p-6 text-white relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h3 className="text-2xl font-bold">Find Your Dream Home</h3>
                            <p className="text-gray-300">Share your requirements and we'll get back to you!</p>
                        </div>

                        <div className="p-8">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D4ED31] transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#D4ED31] focus:ring-2 focus:ring-[#D4ED31]/10 transition-all"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Mobile Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D4ED31] transition-colors" />
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#D4ED31] focus:ring-2 focus:ring-[#D4ED31]/10 transition-all"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Configuration */}
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Flat Type</label>
                                            <div className="relative group">
                                                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                <select
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#D4ED31] focus:ring-2 focus:ring-[#D4ED31]/10 transition-all appearance-none cursor-pointer"
                                                    value={formData.configuration}
                                                    onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                                                >
                                                    <option>1 BHK</option>
                                                    <option>2 BHK</option>
                                                    <option>3 BHK</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Preferred Location</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                <select
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#D4ED31] focus:ring-2 focus:ring-[#D4ED31]/10 transition-all appearance-none cursor-pointer"
                                                    value={formData.preferredLocation}
                                                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                                                >
                                                    <option>Virar</option>
                                                    <option>Nalasopara</option>
                                                    <option>Vasai</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Project Status</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#D4ED31] focus:ring-2 focus:ring-[#D4ED31]/10 transition-all appearance-none cursor-pointer"
                                            value={formData.projectStatus}
                                            onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                                        >
                                            <option>Ready</option>
                                            <option>Near Possession</option>
                                            <option>Under Construction</option>
                                        </select>
                                    </div>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full py-4 bg-[#D4ED31] text-[#073B3A] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#c4dd2a] transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-2 border-[#073B3A] border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Submit Inquiry
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                                >
                                    <div className="w-20 h-20 bg-[#D4ED31]/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-10 h-10 text-[#073B3A]" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-[#073B3A]">Thank You!</h4>
                                    <p className="text-gray-500">We have received your inquiry. Our expert team will contact you shortly.</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Trust Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Trusted by 1000+ Families in Vasai-Virar</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadPopup;
