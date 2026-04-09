import { useRouter } from 'next/navigation';

type BespokeStudioFormProps = Readonly<{
  selections: {
    occasion: string;
    tiers: string;
    palette: string;
    notes: string;
  };
  onSelectionChange: (category: string, value: string) => void;
}>;

export const BespokeStudioForm = ({ 
  selections, 
  onSelectionChange 
}: BespokeStudioFormProps) => {
  const router = useRouter();

  function handleRequestConsultation() {
    const params = new URLSearchParams({
      type: 'bespoke',
      occasion: selections.occasion,
      tiers: selections.tiers,
      palette: selections.palette,
      msg: selections.notes,
    });
    router.push(`/custom/review?${params.toString()}`);
  }

  const occasions = ['Wedding', 'Anniversary', 'Birthday', 'Corporate', 'Other'];
  const tiers = ['Single Tier', 'Two-Tier', 'Three-Tier Grand', 'Sculpted/3D'];
  const palettes = ['Classic Whites/Cream', 'Rich Jewels', 'Soft Pastels', 'Dark & Moody', 'Custom (List in Notes)'];

  return (
    <div className="flex flex-col space-y-12 py-6">
      <div className="max-w-md">
        <h1 className="font-serif text-5xl text-[#4a2b3d] md:text-6xl">
          Bespoke Consultation
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-[#6b5c65]">
          A blank canvas awaits. Share your vision and our master bakers will architect a one-of-a-kind masterpiece tailored exclusively to your event.
        </p>
      </div>

      {/* 01 Occasion */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            01
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">The Occasion</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {occasions.map((occasion) => (
            <button
              key={occasion}
              onClick={() => onSelectionChange('occasion', occasion)}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.occasion === occasion
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </section>

      {/* 02 Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            02
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Architecture & Tiers</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => onSelectionChange('tiers', tier)}
              className={`flex flex-col items-start p-4 w-full sm:w-[calc(50%-0.5rem)] rounded-xl border transition-all ${
                selections.tiers === tier
                  ? 'border-[#4a2b3d] bg-[#f8f5f1] shadow-sm'
                  : 'border-[#d3c8be]/40 bg-white hover:border-[#4a2b3d]/30'
              }`}
            >
              <span className="text-[0.9rem] font-medium text-[#4a2b3d]">
                {tier}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 03 Palette */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            03
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Aesthetic Palette</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {palettes.map((palette) => (
            <button
              key={palette}
              onClick={() => onSelectionChange('palette', palette)}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.palette === palette
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {palette}
            </button>
          ))}
        </div>
      </section>

      {/* 04 Image Upload */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            04
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Inspiration Board</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-[#d3c8be]/60 bg-[#f8f5f1]/30 p-10 transition-colors hover:bg-[#f8f5f1]/80 cursor-pointer">
          <div className="text-center space-y-2">
            <span className="block text-2xl">📸</span>
            <span className="block text-[0.8rem] font-medium text-[#4a2b3d]">Drop images here to upload</span>
            <span className="block text-[0.65rem] text-[#9a8a7a]">or click to browse from your device</span>
          </div>
        </div>
      </section>

      {/* 05 Instructions */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            05
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">The Vision</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-2">
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#b31429] font-bold">
            Design Notes
          </span>
          <textarea
            value={selections.notes}
            onChange={(e) => onSelectionChange('notes', e.target.value)}
            placeholder="Tell us everything about your dream cake... flavors, textures, florals, specific styling..."
            className="h-32 w-full rounded-xl border border-[#d3c8be]/40 bg-[#f8f5f1]/50 p-4 text-[0.85rem] placeholder-[#9a8a7a] focus:border-[#4a2b3d] focus:outline-none focus:ring-1 focus:ring-[#4a2b3d]/10"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button 
          onClick={handleRequestConsultation}
          className="flex-1 rounded-lg bg-[#4a0404] py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Submit for Atelier Review
        </button>
      </div>
    </div>
  );
};

export default BespokeStudioForm;
