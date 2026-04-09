import Image from 'next/image';

type StudioPreviewProps = Readonly<{
  name: string;
  price: number;
  weight: string;
  image: string;
}>;

export const StudioPreview = ({ name, price, weight, image }: StudioPreviewProps) => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-[2rem] lg:h-full">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay Card */}
      <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-auto md:w-[320px]">
        <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-md shadow-2xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#8b7a6a] font-medium">
            Live Preview
          </span>
          <h2 className="mt-2 text-3xl font-serif text-[#4a2b3d] leading-tight">
            {name}
          </h2>
          <p className="mt-4 text-[0.7rem] leading-relaxed text-[#6b5c65]">
            A symphony of traditional flavors and royal aesthetics, crafted uniquely for your occasion.
          </p>
          
          <div className="mt-8 flex items-end justify-between border-t border-[#d3c8be]/30 pt-4">
            <div>
              <span className="block text-[0.6rem] uppercase tracking-wider text-[#9a8a7a]">
                Price
              </span>
              <span className="text-xl font-medium text-[#4a2b3d]">
                PKR {price.toLocaleString()}
              </span>
            </div>
            <span className="text-[0.6rem] uppercase tracking-[0.1em] text-[#9a8a7a]">
              Est. Weight: {weight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPreview;
