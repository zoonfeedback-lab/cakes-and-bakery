import { useRouter } from 'next/navigation';

type BoxSelections = {
  boxSize: string;
  assortment: Record<string, number>;
  packaging: string;
  notes: string;
};

type BuildBoxStudioFormProps = Readonly<{
  selections: BoxSelections;
  onSelectionChange: <K extends keyof BoxSelections>(
    category: K,
    value: BoxSelections[K]
  ) => void;
}>;

const BAKES_CATALOGUE = [
  'Chocolate Brownies',
  'Chocolate Chip Cookies',
  'Mini Chocolate Chip Cookies',
  'Simple Cupcakes',
  'Customized Cupcakes',
];

export const BuildBoxStudioForm = ({ 
  selections, 
  onSelectionChange 
}: BuildBoxStudioFormProps) => {
  const router = useRouter();

  // Parse box capacity
  const capacity = parseInt(selections.boxSize.replace(/\D/g, '')) || 6;
  const currentTotal = Object.values(selections.assortment).reduce((sum, qty) => sum + qty, 0);
  const remaining = capacity - currentTotal;

  function handleAddToOrder() {
    if (remaining > 0) {
      alert(`Please select ${remaining} more items to fill your box.`);
      return;
    }

    // Convert assortment object to string format: "2x Fudge Brownies, 3x Lemon Tarts"
    const assortmentString = Object.entries(selections.assortment)
      .filter(([, qty]) => qty > 0)
      .map(([item, qty]) => `${qty}x ${item}`)
      .join(', ');

    const params = new URLSearchParams({
      type: 'box',
      boxSize: selections.boxSize,
      assortment: assortmentString,
      packaging: selections.packaging,
      msg: selections.notes,
    });
    router.push(`/custom/review?${params.toString()}`);
  }

  const handleAdjustQuantity = (item: string, delta: number) => {
    const currentQty = selections.assortment[item] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    // Prevent exceeding capacity
    if (delta > 0 && remaining <= 0) return;

    onSelectionChange('assortment', {
      ...selections.assortment,
      [item]: newQty,
    });
  };

  const boxSizes = ['Box of 8', 'Box of 16', 'Box of 24'];
  const packagingStyles = ['Classic Pink Ribbon', 'Gold Foil Gift Box', 'Rustic Twine & Tag', 'Executive Black Box'];

  return (
    <div className="flex flex-col space-y-12 py-6">
      <div className="max-w-md">
        <h1 className="font-serif text-5xl text-[#4a2b3d] md:text-6xl">
          Build Your Box
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-[#6b5c65]">
          Curate the perfect assortment. Mix and match our finest bakes to create a bespoke box exactly to your taste.
        </p>
      </div>

      {/* 01 Box Size */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            01
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Box Size</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {boxSizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                onSelectionChange('boxSize', size);
                // Reset assortment when shrinking box size to avoid invalid states
                if (parseInt(size.replace(/\D/g, '')) < currentTotal) {
                  onSelectionChange('assortment', {});
                }
              }}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.boxSize === size
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* 02 Assortment */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            02
          </span>
          <div className="flex flex-col">
            <h3 className="font-serif text-2xl text-[#4a2b3d]">The Assortment</h3>
            <span className="text-[0.7rem] text-[#b31429] font-medium tracking-wide">
              {remaining > 0 ? `${remaining} slots remaining` : 'Box is full!'}
            </span>
          </div>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-3">
          {BAKES_CATALOGUE.map((item) => {
            const qty = selections.assortment[item] || 0;
            return (
              <div key={item} className="flex items-center justify-between rounded-xl border border-[#d3c8be]/40 p-4 transition-colors hover:border-[#4a2b3d]/30 bg-white">
                <span className="text-[0.85rem] font-medium text-[#4a2b3d]">{item}</span>
                <div className="flex items-center gap-4 rounded-full border border-[#d3c8be]/40 bg-[#f8f5f1] px-2 py-1">
                  <button 
                    onClick={() => handleAdjustQuantity(item, -1)}
                    disabled={qty === 0}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4a2b3d] shadow-sm disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-4 text-center text-sm font-bold text-[#4a2b3d]">{qty}</span>
                  <button 
                    onClick={() => handleAdjustQuantity(item, 1)}
                    disabled={remaining <= 0}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4a2b3d] text-white shadow-sm disabled:opacity-50 disabled:bg-[#d3c8be]"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03 Packaging */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            03
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Packaging Finish</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {packagingStyles.map((pkg) => (
            <button
              key={pkg}
              onClick={() => onSelectionChange('packaging', pkg)}
              className={`flex flex-col items-center justify-center p-4 w-full rounded-xl border transition-all ${
                selections.packaging === pkg
                  ? 'border-[#4a2b3d] bg-[#f8f5f1] shadow-sm'
                  : 'border-[#d3c8be]/40 bg-white hover:border-[#4a2b3d]/30'
              }`}
            >
              <div className="text-xl mb-2">🎁</div>
              <span className="text-[0.7rem] uppercase tracking-widest font-medium text-[#4a2b3d] text-center">
                {pkg}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 04 Note */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            04
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Custom Note</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-2">
          <textarea
            value={selections.notes}
            onChange={(e) => onSelectionChange('notes', e.target.value)}
            placeholder="Add a special message to be handwritten inside the box..."
            className="h-32 w-full rounded-xl border border-[#d3c8be]/40 bg-[#f8f5f1]/50 p-4 text-[0.85rem] placeholder-[#9a8a7a] focus:border-[#4a2b3d] focus:outline-none focus:ring-1 focus:ring-[#4a2b3d]/10"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button 
          onClick={handleAddToOrder}
          disabled={remaining > 0}
          className="flex-1 rounded-lg bg-[#4a0404] py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {remaining > 0 ? `Select ${remaining} more items` : 'Add Curated Box to Order'}
        </button>
      </div>
    </div>
  );
};

export default BuildBoxStudioForm;
