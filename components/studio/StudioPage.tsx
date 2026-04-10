'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_STUDIO_CAKE, STUDIO_FILLINGS, STUDIO_FINISHES, STUDIO_SPONGES } from '@/constants/studio';
import type { BakeProduct, CakeProduct } from '@/types';
import StudioPreview from './StudioPreview';
import StudioForm from './StudioForm';
import BakeStudioForm from './BakeStudioForm';
import BespokeStudioForm from './BespokeStudioForm';
import BuildBoxStudioForm from './BuildBoxStudioForm';

type StudioPageProps = Readonly<{
  cakes: CakeProduct[];
  bakes: BakeProduct[];
}>;

export const StudioPage = ({ cakes, bakes }: StudioPageProps) => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Studio...</div>}>
      <StudioContent cakes={cakes} bakes={bakes} />
    </Suspense>
  );
};

const StudioContent = ({ cakes, bakes }: StudioPageProps) => {
  const searchParams = useSearchParams();
  const cakeId = searchParams.get('cake');
  const bakeId = searchParams.get('bake');
  const isBespokeType = searchParams.get('type') === 'bespoke';
  const isBoxType = searchParams.get('type') === 'box';

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

  const [bespokeSelections, setBespokeSelections] = useState({
    occasion: 'Wedding',
    tiers: 'Three-Tier Grand',
    palette: 'Classic Whites/Cream',
    notes: '',
  });

  const [boxSelections, setBoxSelections] = useState({
    boxSize: 'Box of 12',
    assortment: {} as Record<string, number>,
    packaging: 'Classic Pink Ribbon',
    notes: '',
  });

  const { currentItem, isBake } = useMemo(() => {
    if (isBespokeType || isBoxType) {
      return {
        isBake: false,
        currentItem: {
          ...DEFAULT_STUDIO_CAKE,
          name: isBoxType ? 'Assorted Bakery Box' : 'Bespoke Consultation',
          image: '/images/signature-cake.png', 
        }
      };
    } else if (bakeId) {
      const bake = bakes.find((b) => b.id === bakeId);
      if (bake) {
        return {
          isBake: true,
          currentItem: {
            id: bake.id,
            name: bake.name,
            price: bake.price * 100,
            weight: 'Standard Box',
            image: bake.image,
            dimensions: bake.boxOptions?.[0] ?? 'Standard Box',
          },
        };
      }
    }

    if (cakeId) {
      const cake = cakes.find((c) => c.id === cakeId);
      if (cake) {
        return {
          isBake: false,
          currentItem: {
            id: cake.id,
            name: cake.name,
            price: cake.price * 100,
            weight: '2.5KG',
            image: cake.image,
            dimensions: cake.dimensions ?? DEFAULT_STUDIO_CAKE.dimensions,
          },
        };
      }
    }

    return { isBake: false, currentItem: DEFAULT_STUDIO_CAKE };
  }, [bakeId, bakes, cakeId, cakes, isBespokeType, isBoxType]);

  const handleSelectionChange = (category: string, id: string) => {
    setSelections((prev) => ({ ...prev, [category]: id }));
  };

  const handleBakeSelectionChange = (category: string, value: string | string[]) => {
    setBakeSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleBespokeSelectionChange = (category: string, value: string) => {
    setBespokeSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleBoxSelectionChange = <K extends keyof typeof boxSelections>(
    category: K,
    value: (typeof boxSelections)[K]
  ) => {
    setBoxSelections((prev) => ({ ...prev, [category]: value }));
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
        {isBespokeType ? (
          <BespokeStudioForm
            selections={bespokeSelections}
            onSelectionChange={handleBespokeSelectionChange}
          />
        ) : isBoxType ? (
          <BuildBoxStudioForm
            selections={boxSelections}
            onSelectionChange={handleBoxSelectionChange}
          />
        ) : isBake ? (
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
