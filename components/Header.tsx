'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV_ITEMS, SITE_NAME } from '@/theme';

export const Header = () => {
    const pathname = usePathname();

    return (
        <header className="border-b border-[#e8ded3] bg-[#F8F5F1]">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-4 pb-5 md:pt-5 md:pb-6">
                <Link
                    href="/"
                    className="wordmark text-[1rem] md:text-[1.18rem]"
                >
                    {SITE_NAME}
                </Link>

                <nav aria-label="Primary" className="mt-4 md:mt-5">
                    <ul className="flex items-center gap-7 md:gap-12">
                        {PRIMARY_NAV_ITEMS.map((item) => {
                            const isActive = item.href.startsWith('/')
                                ? pathname === item.href
                                : false;

                            return (
                                <li key={item.href} className="relative">
                                    <Link
                                        href={item.href}
                                        className={`nav-link text-[0.7rem] md:text-[0.82rem] ${
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
        </header>
    );
};

export default Header;
