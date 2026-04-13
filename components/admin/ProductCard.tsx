'use client';

import { useState } from 'react';
import { deleteProductAction } from '@/app/admin/actions';
import type { BakeProduct, CakeProduct, ProductKind } from '@/types';

interface ProductCardProps {
    readonly kind: ProductKind;
    readonly item: CakeProduct | BakeProduct;
    readonly onEdit: (item: CakeProduct | BakeProduct) => void;
}

export function ProductCard({ kind, item, onEdit }: ProductCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to completely delete ${item.name}?`)) return;
        setIsDeleting(true);
        const formData = new FormData();
        formData.set('kind', kind);
        formData.set('id', item.id);
        await deleteProductAction(formData);
    };

    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-brand-border/60 bg-white shadow-[0_8px_30px_rgba(109,80,96,0.03)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(109,80,96,0.12)] hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden bg-[#Fdfaf7]">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-4xl opacity-20">📸</div>
                )}
                
                {/* Floating Status & Price Tags */}
                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-700 shadow-sm backdrop-blur-md border border-green-200">
                        {isDeleting ? 'Deleting...' : 'Active'}
                    </span>
                    {item.tags?.slice(0,1).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary shadow-sm backdrop-blur-md border border-white">
                            {tag}
                        </span>
                    ))}
                </div>
                
                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm backdrop-blur-md border border-white">
                     <span className="text-xs font-bold text-foreground">
                        {item.priceLabel || `PKR ${item.price.toLocaleString()}`}
                    </span>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 flex items-end justify-center pb-6 gap-3">
                     <button onClick={() => onEdit(item)} className="p-2 sm:p-3 bg-white hover:bg-primary hover:text-white text-primary rounded-full shadow-lg transition-colors sm:transform sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 duration-300 delay-75" title="Edit Product">
                         ✏️
                     </button>
                     <button className="p-2 sm:p-3 bg-white hover:bg-primary-light hover:text-white text-text-soft rounded-full shadow-lg transition-colors sm:transform sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 duration-300 delay-100" title="Duplicate">
                         📑
                     </button>
                     <button className="p-2 sm:p-3 bg-white hover:bg-brand-gold hover:text-white text-text-soft rounded-full shadow-lg transition-colors sm:transform sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 duration-300 delay-150" title="Preview Live">
                         👁️
                     </button>
                     <button onClick={handleDelete} className="p-2 sm:p-3 bg-white hover:bg-red-500 hover:text-white text-red-500 rounded-full shadow-lg transition-colors sm:transform sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 duration-300 delay-200" title="Delete">
                         🗑️
                     </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">
                            {item.category}
                        </p>
                        <h3 className="truncate font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
                            {item.name}
                        </h3>
                    </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-soft">
                    {item.description}
                </p>

                {/* Meta info */}
                {item.occasions && item.occasions.length > 0 && (
                     <div className="mt-4 flex flex-wrap gap-2">
                         {item.occasions.slice(0, 3).map((occ) => (
                             <span
                                 key={occ}
                                 className="rounded-lg bg-black/[0.03] px-2.5 py-1 text-[10px] font-medium tracking-wide text-text-soft"
                             >
                                 {occ}
                             </span>
                         ))}
                     </div>
                )}
            </div>
        </div>
    );
}
