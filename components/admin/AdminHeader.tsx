'use client';

import { logoutAction } from '@/app/admin/auth-actions';

interface AdminHeaderProps {
    readonly onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex h-[88px] shrink-0 items-center justify-between border-b border-brand-border/60 bg-white/70 px-4 md:px-8 backdrop-blur-2xl shadow-[0_4px_30px_rgba(109,80,96,0.03)]">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-text-soft hover:text-primary transition-colors"
                    aria-label="Open sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                {/* Search */}
                <div className="relative w-full max-w-md group hidden sm:block">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft/60 group-focus-within:text-primary transition-colors">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search products, orders, customers..." 
                        className="w-full bg-white border border-brand-border/80 shadow-sm rounded-full py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 placeholder:text-text-soft/50" 
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-text-soft hover:text-primary transition-all duration-300 hover:scale-110">
                    <span className="text-xl">🔔</span>
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse border border-white shadow-sm"></span>
                </button>
                <div className="h-8 w-px bg-brand-border/60"></div>
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-foreground leading-none group-hover:text-primary transition-colors">Anna Baker</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-text-soft mt-1">Store Owner</span>
                    </div>
                    {/* Logout Button replacing the avatar */}
                    <form action={logoutAction} className="relative z-50">
                        <button 
                            type="submit" 
                            title="Logout safely"
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-lg hover:shadow-lg hover:-translate-y-0.5 hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:border-primary/40"
                        >
                            🚪
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
