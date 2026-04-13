'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { FloatingActionButton } from './FloatingActionButton';

import { SearchProvider } from '@/context/SearchContext';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SearchProvider>
            <div className="flex h-[100dvh] overflow-hidden bg-[#Fdfaf7] font-sans relative">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex flex-1 flex-col overflow-x-hidden relative w-full">
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto pb-24">
                    {children}
                </main>
                <FloatingActionButton />
            </div>
        </div>
    </SearchProvider>
    );
}
