import Link from 'next/link';
import { SITE_NAME } from '@/theme';
import { FOOTER_COLUMNS } from '@/constants/footer';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // The 6 specific columns the user requested
  const gridColumns = [
    FOOTER_COLUMNS[0], // Shop Cakes
    FOOTER_COLUMNS[1], // Bakes
    FOOTER_COLUMNS[2], // Customization
    FOOTER_COLUMNS[3], // Occasions
    FOOTER_COLUMNS[4], // Delivery & Orders
    FOOTER_COLUMNS[5], // Company
  ];

  return (
    // Replicating the Cactus Coffee dark botanical theme
    <footer className="mt-24 relative overflow-hidden bg-[#1f2b23] text-[#d4ded7] font-sans">
      
      {/* Background Texture Overlay (mimicking the dotted/grid pattern in the image) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />

      <div className="relative z-10">
        
        {/* SECTION 1: Top Header Row */}
        <div className="border-b border-[#2d3b31] border-dotted">
            <div className="container-max py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
                
                {/* Brand */}
                <div className="space-y-6">
                <h3 className="text-[17px] font-black tracking-wide text-white">
                    {SITE_NAME}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#a8b6ae]">
                    A curated space for creativity, artisanal bakes, and handcrafted memories. 
                    Explore the harmony of flavor and art.
                </p>
                </div>

                {/* Info Links */}
                <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                    Quick Links
                </h4>
                <ul className="space-y-3.5">
                    {FOOTER_COLUMNS[0].links.slice(0, 3).map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-[13px] hover:text-white transition-colors">
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>

                <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                    Services
                </h4>
                <ul className="space-y-3.5">
                    {FOOTER_COLUMNS[2].links.slice(0, 3).map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-[13px] hover:text-white transition-colors">
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Contact & Hours */}
                <div className="space-y-8">
                <div className="space-y-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">Opening Hours</h4>
                    <p className="text-[13px] text-[#a8b6ae]">Mon-Fri: 10 am – 11:30 pm</p>
                    <p className="text-[13px] text-[#a8b6ae]">Sat-Sun: 10 am – 1 am</p>
                </div>
                <div className="space-y-4 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">Contact</h4>
                    <div className="flex flex-col gap-3 text-[13px] text-[#a8b6ae]">
                        <div className="flex gap-3 items-start">
                            <span className="text-[#a8b6ae] mt-0.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            <span>PMA Link Rd, Jinnahabad<br/>Abbottabad, 22010, Pakistan</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-[#a8b6ae]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </span>
                            <span>(+92) 310 4557777</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* SECTION 2: Dense 6-Column Grid */}
        <div className="border-b border-[#2d3b31] border-dotted">
            <div className="container-max py-16">
                <div className="grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
                    {gridColumns.map((col) => (
                        <div key={col.title} className="space-y-6">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                                {col.title}
                            </h4>
                            <ul className="flex flex-col space-y-3.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="group flex items-start gap-2.5 text-[13px] text-[#a8b6ae] hover:text-white transition-colors"
                                        >
                                            {/* Minimalist Checkmark */}
                                            <span className="text-[#657a6c] text-[10px] mt-1 font-bold group-hover:text-white">✓</span>
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* SECTION 3: Engagement Hub */}
        <div className="border-b border-[#2d3b31] border-dotted">
            <div className="container-max py-20">
                <div className="mx-auto max-w-[480px] space-y-8 text-center">
                    <div className="space-y-3">
                        <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">Join the Atelier</h3>
                        <p className="text-[13px] text-[#a8b6ae]">Get updates on new seasonal bakes and exclusive launches.</p>
                    </div>
                    
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full rounded-full border border-[#2d3b31] bg-[#223026] px-6 py-4 text-[13px] text-white outline-none transition-all focus:border-[#4d6355] placeholder:text-[#657a6c]"
                        />
                        <button 
                        type="submit"
                        className="w-full rounded-full bg-[#8fb39c] text-[#1f2b23] py-4 text-[13px] font-bold transition-all hover:bg-[#a9c9b4]"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* SECTION 4: Base Bar */}
        <div className="py-8">
            <div className="container-max flex flex-col items-center justify-between gap-6 sm:flex-row">
                <p className="text-[12px] text-[#657a6c]">
                    &copy; {currentYear} {SITE_NAME}. All rights reserved.
                </p>
                
                <div className="flex gap-4">
                    {['instagram', 'facebook', 'twitter'].map((s) => (
                    <SocialIcon key={s} platform={s} />
                    ))}
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
};

// --- Sub Components ---

const SocialIcon = ({ platform }: { platform: string }) => (
    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2d3b31] text-[#a8b6ae] hover:bg-[#2d3b31] hover:text-white transition-all">
        {platform === 'instagram' && <InstagramIcon />}
        {platform === 'facebook' && <FacebookIcon />}
        {platform === 'twitter' && <TwitterIcon />}
    </a>
)

// --- Icons ---

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
);

export default Footer;
