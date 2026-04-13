'use client';

import { useState } from 'react';
import { ProductFormModal } from './ProductFormModal';

export function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState<'cake' | 'bake' | null>(null);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
                {/* Secondary Actions */}
                <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' : 'scale-75 opacity-0 pointer-events-none translate-y-4'}`}>
                    <button 
                        onClick={() => { setShowModal('bake'); setIsOpen(false); }}
                        className="group flex items-center justify-end gap-3"
                    >
                        <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-soft shadow-sm border border-brand-border group-hover:border-primary group-hover:text-primary transition-colors">Add Bake</span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-md border border-brand-border/60 hover:scale-105 transition-transform group-hover:border-primary group-hover:text-primary">🧁</div>
                    </button>
                    <button 
                         onClick={() => { setShowModal('cake'); setIsOpen(false); }}
                        className="group flex items-center justify-end gap-3"
                    >
                        <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-soft shadow-sm border border-brand-border group-hover:border-primary group-hover:text-primary transition-colors">Add Cake</span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-md border border-brand-border/60 hover:scale-105 transition-transform group-hover:border-primary group-hover:text-primary">🎂</div>
                    </button>
                </div>
                
                {/* Main FAB */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#8A677B] text-3xl text-white shadow-[0_8px_30px_rgba(109,80,96,0.3)] hover:shadow-[0_12px_40px_rgba(109,80,96,0.4)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/40 relative"
                >
                    <span className={`transition-transform duration-300 absolute ${isOpen ? 'rotate-45 scale-110' : 'rotate-0'}`}>+</span>
                </button>
            </div>

            {showModal && (
                <ProductFormModal kind={showModal} onClose={() => setShowModal(null)} />
            )}
        </>
    );
}
