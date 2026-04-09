'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { PRIMARY_NAV_ITEMS, SITE_NAME } from '@/theme';

export const Header = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setMobileMenuOpen((prev) => !prev);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <header className="border-b border-[#e8ded3] bg-[#F8F5F1] relative z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:flex-col md:items-center md:justify-center md:px-4 md:pt-5 md:pb-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="wordmark text-[0.9rem] sm:text-[1rem] md:text-[1.18rem]"
                >
                    {SITE_NAME}
                </Link>

                {/* Hamburger button — visible on mobile only */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-surface-muted md:hidden"
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    <span
                        className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${
                            mobileMenuOpen ? 'translate-y-[0.375rem] rotate-45' : ''
                        }`}
                    />
                    <span
                        className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${
                            mobileMenuOpen ? 'opacity-0' : ''
                        }`}
                    />
                    <span
                        className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${
                            mobileMenuOpen ? '-translate-y-[0.375rem] -rotate-45' : ''
                        }`}
                    />
                </button>

                {/* Desktop nav */}
                <nav aria-label="Primary" className="mt-5 hidden md:block">
                    <ul className="flex items-center gap-7 md:gap-12">
                        {PRIMARY_NAV_ITEMS.map((item) => {
                            const isActive = item.href.startsWith('/')
                                ? pathname === item.href
                                : false;

                            return (
                                <li key={item.href} className="relative">
                                    <Link
                                        href={item.href}
                                        className={`nav-link text-[0.82rem] ${
                                            isActive ? 'text-primary' : ''
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-1/2 top-full mt-3 h-px -translate-x-1/2 bg-primary transition-opacity ${
                                            isActive ? 'w-8 opacity-100' : 'w-0 opacity-0'
                                        }`}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMenu}
                aria-hidden="true"
            />

            {/* Mobile menu panel */}
            <nav
                aria-label="Mobile navigation"
                className={`fixed right-0 top-0 z-40 flex h-full w-[280px] max-w-[80vw] flex-col bg-[#F8F5F1] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-end px-4 pt-4">
                    <div className="h-10 w-10" /> {/* Spacer for alignment with hamburger */}
                </div>

                <ul className="mt-8 flex flex-col gap-2 px-6">
                    {PRIMARY_NAV_ITEMS.map((item) => {
                        const isActive = item.href.startsWith('/')
                            ? pathname === item.href
                            : false;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.25em] transition-colors ${
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-soft hover:bg-surface-muted hover:text-primary'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto border-t border-brand-border px-6 py-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        © {new Date().getFullYear()} {SITE_NAME}
                    </p>
                </div>
            </nav>
        </header>
    );
};

export default Header;
