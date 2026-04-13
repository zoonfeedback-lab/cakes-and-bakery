'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AdminSidebarProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string>('');
    
    const links = [
        { name: 'Dashboard', href: '/admin', id: 'overview', icon: '📊' },
        { name: 'Cakes', href: '#cakes-section', id: 'cakes-section', icon: '🎂' },
        { name: 'Bakes', href: '#bakes-section', id: 'bakes-section', icon: '🧁' },
        { name: 'Orders', href: '/admin/orders', id: 'orders', icon: '🛍️' },
        { name: 'Customers', href: '/admin/customers', id: 'customers', icon: '👥' },
        { name: 'Analytics', href: '/admin/analytics', id: 'analytics', icon: '📈' },
        { name: 'Custom Orders', href: '/admin/custom-orders', id: 'custom-orders', icon: '✨' },
        { name: 'Settings', href: '/admin/settings', id: 'settings', icon: '⚙️' },
    ];

    useEffect(() => {
        if (pathname !== '/admin') return;

        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -40% 0px',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Sections to observe
        const sections = ['cakes-section', 'bakes-section'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Set initial state based on scroll position or hash
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash) {
            setActiveSection(currentHash);
        } else if (window.scrollY < 200) {
            setActiveSection('overview');
        }

        return () => observer.disconnect();
    }, [pathname]);

    const isLinkActive = (link: typeof links[0]) => {
        if (pathname !== '/admin') {
            return pathname === link.href;
        }
        
        // Special case for dashboard overview
        if (link.id === 'overview') {
            return activeSection === 'overview' || !['cakes-section', 'bakes-section'].includes(activeSection);
        }

        return activeSection === link.id;
    };

    return (
        <>
            {/* Mobile backdrop overlay */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" 
                    onClick={onClose}
                />
            )}

            <aside className={`fixed lg:static top-0 left-0 h-full z-50 flex w-72 flex-shrink-0 border-r border-brand-border/60 bg-[#FDFBF9] flex-col transition-transform duration-300 shadow-[20px_0_40px_rgba(109,80,96,0.05)] lg:shadow-none lg:w-64 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Branding */}
                <div className="h-[88px] shrink-0 flex items-center justify-between px-8 border-b border-brand-border/60 bg-white/50 backdrop-blur-md">
                    <Link href="/admin" onClick={onClose} className="font-serif text-2xl font-semibold text-foreground tracking-tight hover:opacity-80 transition-opacity">
                        Arzish<span className="text-primary italic font-light">Admin</span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden text-2xl text-text-soft hover:text-foreground">
                        ×
                    </button>
                </div>
                
                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-soft/60 mb-4">Core Management</p>
                    {links.slice(0,3).map(link => {
                        const isActive = isLinkActive(link);
                        
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                        setActiveSection(link.id);
                                    }
                                    onClose();
                                }}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-[inset_2px_0_0_#967386]' : 'text-text-soft hover:bg-black/[0.03] hover:text-foreground'}`}
                            >
                                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                                <span className="tracking-wide">{link.name}</span>
                            </Link>
                        );
                    })}

                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-soft/60 mt-8 mb-4">Business</p>
                    {links.slice(3, 7).map(link => {
                        const isActive = isLinkActive(link);
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={onClose}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-[inset_2px_0_0_#967386]' : 'text-text-soft hover:bg-black/[0.03] hover:text-foreground'}`}
                            >
                                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                                <span className="tracking-wide">{link.name}</span>
                            </Link>
                        );
                    })}

                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-soft/60 mt-8 mb-4">System</p>
                    {links.slice(7).map(link => {
                        const isActive = isLinkActive(link);
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={onClose}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-[inset_2px_0_0_#967386]' : 'text-text-soft hover:bg-black/[0.03] hover:text-foreground'}`}
                            >
                                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                                <span className="tracking-wide">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                
                <div className="p-6 shrink-0 border-t border-brand-border/60 bg-gradient-to-t from-white to-transparent">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#eedbce] to-[#f4e6de] p-5 shadow-sm border border-brand-border/80 group cursor-pointer hover:shadow-md transition-all">
                        <div className="absolute right-0 top-0 opacity-20 text-5xl translate-x-4 -translate-y-4">✨</div>
                        <p className="relative z-10 text-[10px] font-black text-primary uppercase tracking-[0.14em] mb-1.5 drop-shadow-sm">Enterprise Plan</p>
                        <p className="relative z-10 text-xs text-foreground/80 font-medium">All features unlocked</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
