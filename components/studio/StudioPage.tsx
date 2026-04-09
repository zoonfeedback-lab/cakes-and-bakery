'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { DEFAULT_STUDIO_CAKE, STUDIO_FILLINGS, STUDIO_FINISHES, STUDIO_SPONGES } from '@/constants/studio';
import { CAKE_SHOP_ITEMS } from '@/constants/cakes';
import StudioPreview from './StudioPreview';
import StudioForm from './StudioForm';

export const StudioPage = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
};

const StudioContent = () => {
  const searchParams = useSearchParams();
  const cakeId = searchParams.get('cake');

  const [selections, setSelections] = useState({
    sponge: STUDIO_SPONGES[0].id,
    filling: STUDIO_FILLINGS[0].id,
    finish: STUDIO_FINISHES[0].id,
    message: '',
  });

  const [currentCake, setCurrentCake] = useState(DEFAULT_STUDIO_CAKE);

  useEffect(() => {
    if (cakeId) {
      const cake = CAKE_SHOP_ITEMS.find((c) => c.id === cakeId);
      if (cake) {
        setCurrentCake({
          id: cake.id,
          name: cake.name,
          price: cake.price * 100, // PKRs are usually higher than USD constants
          weight: '2.5KG',
          image: cake.image,
        });
      }
    }
  }, [cakeId]);

  const handleSelectionChange = (category: string, id: string) => {
    setSelections((prev) => ({ ...prev, [category]: id }));
  };

  const handleMessageChange = (message: string) => {
    setSelections((prev) => ({ ...prev, message }));
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] px-4 py-12 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <StudioPreview
          name={currentCake.name}
          price={currentCake.price}
          weight={currentCake.weight}
          image={currentCake.image}
        />
        <StudioForm
          title={currentCake.name}
          selections={selections}
          onSelectionChange={handleSelectionChange}
          onMessageChange={handleMessageChange}
        />
      </div>
    </main>
  );
};

export default StudioPage;
