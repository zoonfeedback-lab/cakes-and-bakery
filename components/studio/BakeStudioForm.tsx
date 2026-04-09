import { CUSTOMIZATION_OPTIONS } from '@/constants/bakes';
import { useRouter } from 'next/navigation';

type BakeStudioFormProps = Readonly<{
  title: string;
  itemId?: string;
  onSelectionChange: (category: string, value: string | string[]) => void;
  selections: {
    flavor: string;
    quantity: string;
    boxType: string;
    addons: string[];
    message: string;
  };
  onMessageChange: (message: string) => void;
}>;

export const BakeStudioForm = ({ 
  title,
  itemId,
  onSelectionChange, 
  selections, 
  onMessageChange 
}: BakeStudioFormProps) => {
  const router = useRouter();

  function handleAddToOrder() {
    const paramsOptions: Record<string, string> = {
      bake: itemId || title,
      flavor: selections.flavor,
      quantity: selections.quantity,
      boxType: selections.boxType,
      addons: selections.addons.join(','),
      msg: selections.message,
    };

    const params = new URLSearchParams(paramsOptions);
    router.push(`/custom/review?${params.toString()}`);
  }

  const toggleAddon = (addon: string) => {
    const currentAddons = selections.addons;
    if (currentAddons.includes(addon)) {
      onSelectionChange('addons', currentAddons.filter((a) => a !== addon));
    } else {
      onSelectionChange('addons', [...currentAddons, addon]);
    }
  };

  const flavorOptions = CUSTOMIZATION_OPTIONS.find(o => o.id === 'flavor')?.options || [];
  const quantityOptions = CUSTOMIZATION_OPTIONS.find(o => o.id === 'quantity')?.options || [];
  const boxTypeOptions = CUSTOMIZATION_OPTIONS.find(o => o.id === 'box-type')?.options || [];
  const addOnsOptions = CUSTOMIZATION_OPTIONS.find(o => o.id === 'add-ons')?.options || [];

  return (
    <div className="flex flex-col space-y-12 py-6">
      <div className="max-w-md">
        <h1 className="font-serif text-5xl text-[#4a2b3d] md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-[#6b5c65]">
          Curate your perfect box. Hand-baked in small batches to guarantee 
          the ultimate artisanal dessert experience.
        </p>
      </div>

      {/* 01 Flavor */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            01
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Primary Flavor</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {flavorOptions.map((flavor) => (
            <button
              key={flavor}
              onClick={() => onSelectionChange('flavor', flavor)}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.flavor === flavor
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {flavor}
            </button>
          ))}
        </div>
      </section>

      {/* 02 Quantity */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            02
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Quantity</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {quantityOptions.map((qty) => (
            <button
              key={qty}
              onClick={() => onSelectionChange('quantity', qty)}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.quantity === qty
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {qty}
            </button>
          ))}
        </div>
      </section>

      {/* 03 Box Type */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            03
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Box Style</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {boxTypeOptions.map((boxType) => (
            <button
              key={boxType}
              onClick={() => onSelectionChange('boxType', boxType)}
              className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border py-5 transition-all ${
                selections.boxType === boxType
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f5f1]">
                <span className="text-[0.6rem]">🎁</span>
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest font-medium text-center px-2">
                {boxType}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 04 Add-ons */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            04
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Add-ons & Extras</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {addOnsOptions.map((addon) => (
            <button
              key={addon}
              onClick={() => toggleAddon(addon)}
              className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
                selections.addons.includes(addon)
                  ? 'border-[#4a2b3d] bg-[#f8f5f1] shadow-sm'
                  : 'border-[#d3c8be]/40 bg-white hover:border-[#4a2b3d]/30'
              }`}
            >
              <span className="text-[0.75rem] font-medium text-[#4a2b3d]">
                {addon}
              </span>
              {selections.addons.includes(addon) && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4a2b3d] text-[0.5rem] text-white">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 05 Message */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            05
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Custom Note</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-2">
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#b31429] font-bold">
            Message Card
          </span>
          <textarea
            value={selections.message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Add a sweet note to include inside the box..."
            className="h-32 w-full rounded-xl border border-[#d3c8be]/40 bg-[#f8f5f1]/50 p-4 text-[0.85rem] placeholder-[#9a8a7a] focus:border-[#4a2b3d] focus:outline-none focus:ring-1 focus:ring-[#4a2b3d]/10"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button 
          onClick={handleAddToOrder}
          className="flex-1 rounded-lg bg-[#4a0404] py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Add to Cart
        </button>
        <button className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f5d142] text-[#4a2b3d] shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0">
          <span className="text-2xl">♥</span>
        </button>
      </div>
    </div>
  );
};

export default BakeStudioForm;
