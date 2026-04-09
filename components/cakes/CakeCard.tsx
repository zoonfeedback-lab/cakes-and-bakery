import { CakeProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type CakeCardProps = Readonly<{
  cake: CakeProduct;
}>;

export const CakeCard = ({ cake }: CakeCardProps) => {
  const formattedPrice = cake.priceLabel ?? `PKR ${cake.price.toLocaleString()}`;
  
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_38px_rgba(109,80,96,0.06)] transition-all hover:shadow-[0_20px_45px_rgba(109,80,96,0.12)] sm:rounded-[2rem]">
      <div className="relative aspect-[0.92] w-full overflow-hidden">
        <Image
          alt={cake.imageAlt ?? cake.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          src={cake.image}
        />
        
        {/* Floating Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
            {(cake.tags?.includes('Best Seller') || cake.tags?.includes('Most Loved')) && (
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-widest text-white shadow-lg sm:text-[11px]">
                    Signature
                </span>
            )}
            {cake.category === 'wedding-cake' && (
                 <span className="rounded-full bg-[#f1d6df] px-3 py-1 text-[10px] uppercase tracking-widest text-[#4a2b3d] shadow-lg sm:text-[11px]">
                    Artistry
                 </span>
            )}
             {cake.tags?.includes('Custom') && (
                 <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur-md shadow-lg sm:text-[11px]">
                    Bespoke
                 </span>
            )}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-3 px-4 py-4 sm:space-y-4 sm:px-5 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="max-w-[10rem] text-[1.5rem] font-serif leading-[1.02] text-text sm:max-w-[11rem] sm:text-[2rem]">
            {cake.name}
          </h3>
          <span className="pt-1 text-xs uppercase tracking-[0.16em] text-primary sm:pt-2 sm:text-sm">
            {formattedPrice}
          </span>
        </div>
        
        <p className="body-copy min-h-[3.5rem] text-xs sm:min-h-[4.25rem] sm:text-sm">
            {cake.description}
        </p>
        
        <Link
          href={`/custom?cake=${cake.id}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-primary bg-transparent px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-primary transition-all hover:bg-primary hover:text-white sm:px-5 sm:py-3 sm:text-sm"
        >
          Customize
        </Link>
      </div>
    </article>
  );
};

export default CakeCard;
