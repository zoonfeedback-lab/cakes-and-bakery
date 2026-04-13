'use client';

import type { BakeProduct, CakeProduct } from '@/types';

interface AdminDashboardProps {
    readonly cakes: CakeProduct[];
    readonly bakes: BakeProduct[];
}

function StatCard({
    label,
    value,
    icon,
    trend,
    positive,
}: {
    label: string;
    value: string | number;
    icon: string;
    trend: string;
    positive: boolean;
}) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-brand-border bg-white p-6 shadow-[0_8px_30px_rgba(109,80,96,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(109,80,96,0.08)] hover:-translate-y-1">
            <div className="relative flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                         <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fdf5ed] text-xl transition-transform group-hover:scale-110">
                             {icon}
                         </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-soft">
                        {label}
                    </p>
                    <div className="mt-1 flex items-baseline gap-3">
                        <p className="font-serif text-3xl font-semibold text-foreground">
                            {value}
                        </p>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {trend}
                        </span>
                    </div>
                </div>
            </div>
            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/10 via-brand-gold/20 to-transparent" />
        </div>
    );
}

function MiniChart({ title, type }: { title: string, type: 'bar' | 'donut' }) {
    if (type === 'donut') {
        return (
            <div className="rounded-[2rem] border border-brand-border bg-white/60 p-6 flex items-center justify-between shadow-[0_8px_30px_rgba(109,80,96,0.02)]">
                <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-text-soft mb-4">{title}</p>
                     <ul className="space-y-3">
                         <li className="flex items-center gap-2 text-sm text-foreground"><span className="w-2 h-2 rounded-full bg-primary/80"></span> Signature (45%)</li>
                         <li className="flex items-center gap-2 text-sm text-foreground"><span className="w-2 h-2 rounded-full bg-[#de99a6]"></span> Chocolate (35%)</li>
                         <li className="flex items-center gap-2 text-sm text-text-soft"><span className="w-2 h-2 rounded-full bg-brand-gold/80"></span> Fruit (20%)</li>
                     </ul>
                </div>
                {/* SVG mock donut */}
                <div className="relative w-24 h-24">
                     <svg viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#f0e6dd" strokeWidth="16" />
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#967386" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="138" />
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#de99a6" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="210" className="rotate-[-100deg] origin-center" />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-primary">85</div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-[2rem] border border-brand-border bg-white/60 p-6 shadow-[0_8px_30px_rgba(109,80,96,0.02)]">
             <p className="text-xs font-bold uppercase tracking-widest text-text-soft mb-6">{title}</p>
             <div className="flex items-end gap-2 h-24 overflow-hidden border-b border-brand-border/60 pb-2">
                 {[40, 25, 60, 45, 80, 55, 90].map((h, i) => (
                     <div key={i} className="w-full bg-primary/10 rounded-t-sm hover:bg-primary/30 transition-colors relative group">
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-md transition-all duration-500 hover:opacity-80" style={{ height: `${h}%` }}></div>
                     </div>
                 ))}
             </div>
             <div className="flex justify-between mt-2 text-[10px] text-text-soft font-medium">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
        </div>
    );
}

export function AdminDashboard({ cakes, bakes }: AdminDashboardProps) {
    const totalProducts = cakes.length + bakes.length;
    const categories = new Set([...cakes.map(c => c.category), ...bakes.map(b => b.category)]).size;

    return (
        <div className="space-y-8 animate-[slideUp_0.8s_ease-out]">
            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Active Products"
                    value={totalProducts}
                    icon="📦"
                    trend="+12% vs last week"
                    positive={true}
                />
                <StatCard
                    label="Artisan Cakes"
                    value={cakes.length}
                    icon="🎂"
                    trend="+3 new today"
                    positive={true}
                />
                <StatCard
                    label="Fresh Bakes"
                    value={bakes.length}
                    icon="🧁"
                    trend="-1 vs yesterday"
                    positive={false}
                />
                <StatCard
                    label="Total Categories"
                    value={categories}
                    icon="🏷️"
                    trend="No change"
                    positive={true}
                />
            </div>

            {/* Analytics Mini Section */}
            <div className="grid gap-6 md:grid-cols-2">
                 <MiniChart title="Orders This Week" type="bar" />
                 <MiniChart title="Popular Flavors" type="donut" />
            </div>
        </div>
    );
}
