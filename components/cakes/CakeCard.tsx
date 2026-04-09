import { CakeProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type CakeCardProps = Readonly<{
  cake: CakeProduct;
}>;

export const CakeCard = ({ cake }: CakeCardProps) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_38px_rgba(109,80,96,0.06)]">
      <div className="relative aspect-[0.92] w-full overflow-hidden">
        <Image
          alt={cake.name}
          className="h-full w-full object-cover"
          fill
          src={cake.image}
        />
      </div>
      <div className="flex flex-1 flex-col space-y-4 px-5 py-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="max-w-[11rem] text-[2rem] font-serif leading-[1.02] text-text">
            {cake.name}
          </h3>
          <span className="pt-2 text-sm uppercase tracking-[0.16em] text-primary">
            ${cake.price}
          </span>
        </div>
        <p className="body-copy min-h-[4.25rem] text-sm">{cake.description}</p>
        <Link
          href={`/studio?cake=${cake.id}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-primary bg-transparent px-5 py-3 text-sm uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Customize
        </Link>
      </div>
    </article>
  );
};

export default CakeCard;
