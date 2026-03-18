"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    Users,
    LogOut,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        router.push('/dashboard/login');
    };

    const menuItems = [
        {
            name: 'Properties',
            icon: Building2,
            path: '/dashboard',
            active: pathname === '/dashboard' || pathname.startsWith('/dashboard/edit') || pathname.startsWith('/dashboard/add-property')
        },
        {
            name: 'Leads',
            icon: Users,
            path: '/dashboard/leads',
            active: pathname === '/dashboard/leads'
        }
    ];

    return (
        <aside className="w-64 bg-[#073B3A] text-white fixed h-full hidden lg:flex flex-col p-6 shadow-2xl z-30">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-[#D4ED31] rounded-xl flex items-center justify-center">
                    <LayoutDashboard className="w-6 h-6 text-[#073B3A]" />
                </div>
                <span className="text-xl font-bold tracking-tight">Admin<span className="text-[#D4ED31]">99</span></span>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group ${item.active
                                ? 'bg-[#D4ED31] text-[#073B3A] shadow-lg shadow-[#D4ED31]/10'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${item.active ? 'text-[#073B3A]' : 'text-gray-500 group-hover:text-[#D4ED31]'}`} />
                        {item.name}
                    </Link>
                ))}

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
    );
}
