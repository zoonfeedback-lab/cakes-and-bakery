import Link from 'next/link';
import { SITE_NAME } from '@/theme';
import { FOOTER_COLUMNS, FOOTER_TRUST_BAR } from '@/constants/footer';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Mapping existing components into the "Cactus Style" 12-column grid structure
  // Row 1 (Top Tier): Identity | Menus | Support | Info
  const headerLinks = [
    { title: 'Quick Links', items: FOOTER_COLUMNS[0].links.slice(0, 4) },
    { title: 'Services', items: FOOTER_COLUMNS[2].links.slice(0, 4) },
    { title: 'Careers', items: FOOTER_COLUMNS[5].links.slice(0, 4) },
  ];

  // The 12-Column Attribute Hub (2 rows of 6)
  const attributeGrid = [
    // Row 1
    { title: 'Shop Options', items: FOOTER_COLUMNS[0].links.slice(0, 4) },
    { title: 'Bakes Menu', items: FOOTER_COLUMNS[1].links.slice(0, 4) },
    { title: 'Customizations', items: FOOTER_COLUMNS[2].links.slice(0, 4) },
    { title: 'Occasions', items: FOOTER_COLUMNS[3].links.slice(0, 4) },
    { title: 'Ordering', items: FOOTER_COLUMNS[4].links.slice(0, 4) },
    { title: 'Company', items: FOOTER_COLUMNS[5].links.slice(0, 4) },
    // Row 2
    { title: 'Amenities', items: FOOTER_COLUMNS[6].links.slice(0, 4) },
    { title: 'Resources', items: FOOTER_COLUMNS[7].links.slice(0, 4) },
    { title: 'Atmosphere', items: [
        { label: 'Artisanal', href: '#' },
        { label: 'Crafted', href: '#' },
        { label: 'Fresh', href: '#' },
        { label: 'Local', href: '#' }
    ]},
    { title: 'Payments', items: [
        { label: 'Credit Cards', href: '#' },
        { label: 'Debit Cards', href: '#' },
        { label: 'JazzCash', href: '#' },
        { label: 'EasyPaisa', href: '#' }
    ]},
    { title: 'Logistics', items: FOOTER_COLUMNS[4].links.slice(4, 8) },
    { title: 'Foundations', items: FOOTER_COLUMNS[5].links.slice(4, 8) },
  ];

  return (
    <footer className="mt-24 border-t border-brand-border bg-background text-text-soft">
      
      {/* SECTION 1: Identity & Primary Links (Top Row) */}
      <div className="container-max py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          
          {/* Identity */}
          <div className="space-y-6 lg:col-span-1">
             <h3 className="text-2xl font-black tracking-tighter text-foreground uppercase">
                {SITE_NAME}
             </h3>
             <p className="text-[13px] leading-relaxed text-text-soft/70">
                A curated space for creativity, artisanal bakes, and handcrafted memories. 
                Explore the harmony of flavor and art.
             </p>
          </div>

          {/* Header Link Groups */}
          {headerLinks.map((group) => (
             <div key={group.title} className="space-y-6">
                <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-foreground">
                    {group.title}
                </h4>
                <ul className="space-y-3">
                    {group.items.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-[13px] hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div>
          ))}

          {/* Contact & Hours */}
          <div className="space-y-8">
             <div className="space-y-3">
                <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-foreground">Opening Hours</h4>
                <p className="text-[12px] font-medium text-text-soft/80">Mon-Fri: 10 am – 11:30 pm</p>
                <p className="text-[12px] font-medium text-text-soft/80">Sat-Sun: 10 am – 1 am</p>
             </div>
             <div className="space-y-4 pt-2">
                 <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-foreground">Contact</h4>
                 <div className="flex flex-col gap-3 text-[12px] font-medium text-text-soft/80">
                    <div className="flex gap-2">
                        <span className="text-primary">📍</span>
                        <span>PMA Link Rd, Jinnahabad Abbottabad</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-primary">📞</span>
                        <span>(+92) 310 4557777</span>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 12-Column Attribute Hub (Cactus Style) */}
      <div className="border-y border-brand-border/10 bg-surface-muted/5 py-20">
        <div className="container-max">
            <div className="grid grid-cols-2 gap-y-16 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {attributeGrid.map((col) => (
                    <div key={col.title} className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground">
                            {col.title}
                        </h4>
                        <ul className="flex flex-col space-y-3">
                            {col.items.map((link) => (
                                <li key={link.label}>
                                    <Link 
                                        href={link.href}
                                        className="group flex items-start gap-2 text-[12px] font-medium text-text-soft hover:text-primary transition-all"
                                    >
                                        <span className="text-[10px] text-primary group-hover:scale-125 transition-transform mt-0.5">✓</span>
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

      {/* SECTION 3: Featured Engagement (Centered Newsletter) */}
      <div className="container-max py-24">
        <div className="mx-auto max-w-2xl space-y-12 text-center">
            <div className="space-y-4">
                <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-foreground">Join the Atelier</h3>
                <p className="text-[13px] text-text-muted">Get updates on new seasonal bakes and collection launches.</p>
            </div>
            
            <form className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-2xl border border-brand-border bg-surface-muted/10 px-6 py-4 text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-white"
                />
                <button 
                   type="submit"
                   className="w-full rounded-2xl bg-primary py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                    Subscribe
                </button>
            </form>
        </div>
      </div>

      {/* SECTION 4: Final Base Bar */}
      <div className="border-t border-brand-border/10 py-10">
        <div className="container-max flex flex-col items-center justify-between gap-8 sm:flex-row">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-soft/40">
                &copy; {currentYear} {SITE_NAME}. All culinary rights reserved.
            </p>
            
            <div className="flex gap-8">
                {['instagram', 'facebook', 'twitter'].map((s) => (
                   <SocialIcon key={s} platform={s} />
                ))}
            </div>
        </div>
      </div>

    </footer>
  );
};

// --- Sub Components ---

const SocialIcon = ({ platform }: { platform: string }) => (
    <a href="#" className="text-text-soft/30 hover:text-primary transition-all hover:-translate-y-1">
        {platform === 'instagram' && <InstagramIcon />}
        {platform === 'facebook' && <FacebookIcon />}
        {platform === 'twitter' && <TwitterIcon />}
    </a>
)

// --- Icons ---

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
);

export default Footer;
