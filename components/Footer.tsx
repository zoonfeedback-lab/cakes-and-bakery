import Link from 'next/link';
import { SITE_NAME } from '@/theme';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#f0ece5] rounded-t-[3rem] mt-10 text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <h3 className="text-xl font-serif text-primary tracking-wide">{SITE_NAME}</h3>
                        <p className="text-xs leading-relaxed max-w-xs text-gray-500">
                            A family bakery where we specialize in custom artisan cakes and bakes. Crafted with delicious ingredients and love for every occasion.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors shadow-sm" aria-label="Twitter">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors shadow-sm" aria-label="LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-xs uppercase tracking-widest text-gray-500">
                            <li><Link href="#cakes" className="hover:text-primary transition-colors">Cakes</Link></li>
                            <li><Link href="/bakes" className="hover:text-primary transition-colors">Bakes</Link></li>
                            <li><Link href="#birthdays" className="hover:text-primary transition-colors">Birthdays</Link></li>
                            <li><Link href="#classic-cakes" className="hover:text-primary transition-colors">Classic Cakes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-6">Company</h4>
                        <ul className="space-y-3 text-xs uppercase tracking-widest text-gray-500">
                            <li><Link href="#our-story" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="#contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-6">Newsletter</h4>
                        <p className="text-xs text-gray-500 mb-4 tracking-wide max-w-[200px]">
                            Join our club for sweet updates and exclusive offers
                        </p>
                        <div className="relative max-w-xs">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white rounded-full py-3 px-5 text-xs text-text border border-transparent focus:outline-none focus:border-primary shadow-sm"
                            />
                            <button
                                type="button"
                                className="absolute right-1 top-1 bottom-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 rounded-full hover:bg-primary-light transition-colors"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        &copy; {currentYear} {SITE_NAME}. Artistry in every bite.
                    </p>
                    <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-400">
                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-primary transition-colors">Facebook</a>
                        <a href="#" className="hover:text-primary transition-colors">Youtube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
