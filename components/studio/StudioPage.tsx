'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, Suspense } from 'react';
import { DEFAULT_STUDIO_CAKE, STUDIO_FILLINGS, STUDIO_FINISHES, STUDIO_SPONGES } from '@/constants/studio';
import { CAKE_SHOP_ITEMS } from '@/constants/cakes';
import { BAKES_SHOP_ITEMS } from '@/constants/bakes';
import StudioPreview from './StudioPreview';
import StudioForm from './StudioForm';
import BakeStudioForm from './BakeStudioForm';

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
  const bakeId = searchParams.get('bake');

  const [selections, setSelections] = useState({
    sponge: STUDIO_SPONGES[0].id,
    filling: STUDIO_FILLINGS[0].id,
    finish: STUDIO_FINISHES[0].id,
    message: '',
  });

  const [bakeSelections, setBakeSelections] = useState({
    flavor: 'Chocolate',
    quantity: 'Box of 6',
    boxType: 'Classic Box',
    addons: [] as string[],
    message: '',
  });

  const { currentItem, isBake } = useMemo(() => {
    if (bakeId) {
      const bake = BAKES_SHOP_ITEMS.find((b) => b.id === bakeId);
      if (bake) {
        return {
          isBake: true,
          currentItem: {
            id: bake.id,
            name: bake.name,
            price: bake.price * 100, // Matching the price scale
            weight: 'Standard Box',
            image: bake.image,
          }
        };
      }
    } else if (cakeId) {
      const cake = CAKE_SHOP_ITEMS.find((c) => c.id === cakeId);
      if (cake) {
        return {
          isBake: false,
          currentItem: {
            id: cake.id,
            name: cake.name,
            price: cake.price * 100,
            weight: '2.5KG',
            image: cake.image,
          }
        };
      }
    }
    return { isBake: false, currentItem: DEFAULT_STUDIO_CAKE };
  }, [cakeId, bakeId]);

  const handleSelectionChange = (category: string, id: string) => {
    setSelections((prev) => ({ ...prev, [category]: id }));
  };

  const handleBakeSelectionChange = (category: string, value: string | string[]) => {
    setBakeSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleMessageChange = (message: string) => {
    setSelections((prev) => ({ ...prev, message }));
    setBakeSelections((prev) => ({ ...prev, message }));
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] px-4 py-12 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <StudioPreview
          name={currentItem.name}
          price={currentItem.price}
          weight={currentItem.weight}
          image={currentItem.image}
        />
        {isBake ? (
          <BakeStudioForm
            title={currentItem.name}
            itemId={currentItem.id}
            selections={bakeSelections}
            onSelectionChange={handleBakeSelectionChange}
            onMessageChange={handleMessageChange}
          />
        ) : (
          <StudioForm
            title={currentItem.name}
            itemId={currentItem.id}
            isBake={isBake}
            selections={selections}
            onSelectionChange={handleSelectionChange}
            onMessageChange={handleMessageChange}
          />
        )}
      </div>
    </main>
  );
};

export default StudioPage;
