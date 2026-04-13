'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveProductAction } from '@/app/admin/actions';
import type { BakeProduct, CakeProduct, ProductKind } from '@/types';

interface ProductFormModalProps {
    readonly kind: ProductKind;
    readonly item?: CakeProduct | BakeProduct | null;
    readonly onClose: () => void;
}

function inputClassName() {
    return 'mt-1.5 w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-text-soft/50';
}

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-foreground">{children}</span>
            {hint ? (
                <span className="mt-0.5 block text-[11px] text-text-soft">{hint}</span>
            ) : null}
        </label>
    );
}

function SubmitButton({ isEdit, isCake }: { isEdit: boolean; isCake: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary disabled:opacity-50"
        >
            {pending
                ? 'Saving...'
                : isEdit
                    ? '💾 Save Changes'
                    : `✨ Create ${isCake ? 'Cake' : 'Bake'}`}
        </button>
    );
}

function SelectWithCustom({ 
    name, 
    defaultValue, 
    options, 
    placeholder, 
    className,
    required = false
}: { 
    name: string, 
    defaultValue: string, 
    options: string[], 
    placeholder: string,
    className: string,
    required?: boolean
}) {
    const isInitialCustom = Boolean(defaultValue && !options.includes(defaultValue));
    const [isCustom, setIsCustom] = useState(isInitialCustom);
    const [selectValue, setSelectValue] = useState(isInitialCustom ? 'Custom' : (defaultValue || ''));

    return (
        <div className="flex flex-col">
            {!isCustom ? (
                <select
                    className={`${className} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23967386%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat`}
                    value={selectValue}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectValue(val);
                        if (val === 'Custom') setIsCustom(true);
                        else setIsCustom(false);
                    }}
                    required={required}
                    name={name}
                >
                    <option value="" disabled>Select {placeholder}</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    <option value="Custom" className="font-bold text-primary">Custom Option...</option>
                </select>
            ) : (
                <div className="relative animate-[slideUp_0.2s_ease-out]">
                    <input 
                        name={name}
                        className={`${className} pr-14`} 
                        placeholder={`Enter custom ${placeholder.toLowerCase()}...`}
                        defaultValue={isInitialCustom ? defaultValue : ''}
                        autoFocus
                        required={required}
                    />
                    <button 
                        type="button"
                        onClick={() => {
                            setIsCustom(false);
                            setSelectValue('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-soft hover:text-primary uppercase tracking-widest bg-white/80 px-2 py-1 rounded-md"
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}

export function ProductFormModal({ kind, item, onClose }: ProductFormModalProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(item?.image ?? null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isCake = kind === 'cake';
    const cakeItem = item as CakeProduct | undefined;
    const bakeItem = item as BakeProduct | undefined;

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm sm:px-6">
            <div
                className="relative flex w-full max-w-3xl max-h-[90vh] flex-col animate-[slideUp_0.35s_ease-out] rounded-[2rem] border border-brand-border bg-[#fdfaf7] shadow-[0_32px_80px_rgba(109,80,96,0.18)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header (Sticky inside modal) */}
                <div className="flex shrink-0 items-center justify-between border-b border-brand-border/60 px-8 py-6">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                            {item ? 'Edit Product' : 'New Product'}
                        </p>
                        <h2 className="mt-1 font-serif text-2xl text-foreground">
                            {item ? item.name : `Add ${isCake ? 'Cake' : 'Bake'}`}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-border bg-white text-lg text-text-soft transition-all hover:bg-[#f8f1ea] hover:text-foreground"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Form (Scrollable body) */}
                <form action={async (formData) => {
                    await saveProductAction(formData);
                    onClose();
                }} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
                    <input type="hidden" name="kind" value={kind} />
                    <input type="hidden" name="id" value={item?.id ?? ''} />

                    {/* Image upload area */}
                    <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Image preview */}
                        <div
                            className="group relative flex aspect-square w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand-border bg-gradient-to-br from-[#f8f1ea] to-[#efe5d8] transition-all hover:border-primary/40 sm:w-48"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                                        <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                                            Change Image
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-2 p-6 text-center">
                                    <span className="text-4xl">📸</span>
                                    <span className="text-xs font-medium text-text-soft">
                                        Click to upload
                                    </span>
                                    <span className="text-[10px] text-text-soft/70">
                                        JPG, PNG, WebP
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Core fields */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <Label>Product Name</Label>
                                <input
                                    className={inputClassName()}
                                    name="name"
                                    defaultValue={item?.name ?? ''}
                                    placeholder={isCake ? 'e.g. Red Velvet Cake' : 'e.g. Chocolate Brownies'}
                                    required
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label>Category</Label>
                                    <SelectWithCustom
                                        name="category"
                                        defaultValue={item?.category ?? ''}
                                        options={['Signature Cake', 'Vintage Cake', 'Mini Cake', 'Cookies', 'Brownies', 'Cupcakes']}
                                        placeholder="Category"
                                        className={inputClassName()}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label hint="In PKR">Price (PKR)</Label>
                                    <input
                                        className={inputClassName()}
                                        name="price"
                                        type="number"
                                        min="0"
                                        defaultValue={item?.price || ''}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hidden file & image inputs */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <input type="hidden" name="image" value={item?.image ?? ''} />

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <textarea
                            className={inputClassName()}
                            name="description"
                            rows={3}
                            defaultValue={item?.description ?? ''}
                            placeholder="Describe this product — flavors, sizes, what makes it special..."
                            required
                        />
                    </div>

                    {/* Additional fields grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label>Image Alt Text</Label>
                            <input
                                className={inputClassName()}
                                name="imageAlt"
                                defaultValue={item?.imageAlt ?? ''}
                                placeholder="Describe the image for accessibility"
                            />
                        </div>
                        <div>
                            <Label hint="Comma separated if multiple">Tags</Label>
                            <SelectWithCustom
                                name="tags"
                                defaultValue={item?.tags?.join(', ') ?? ''}
                                options={['Best Seller', 'New', 'Classic', 'Gluten-Free', 'Sugar-Free', 'Nut-Free']}
                                placeholder="Tags"
                                className={inputClassName()}
                            />
                        </div>
                        <div>
                            <Label hint="Comma separated if multiple">Occasions</Label>
                            <SelectWithCustom
                                name="occasions"
                                defaultValue={item?.occasions?.join(', ') ?? ''}
                                options={['Birthday', 'Anniversary', 'Wedding', 'Engagement', 'Baby Shower', 'Bridal Shower', 'Graduation']}
                                placeholder="Occasion"
                                className={inputClassName()}
                            />
                        </div>
                        <div>
                            <Label hint="Comma separated if multiple">
                                {isCake ? 'Size Options' : 'Box Options'}
                            </Label>
                            <SelectWithCustom
                                name={isCake ? 'sizeOptions' : 'boxOptions'}
                                defaultValue={isCake ? (cakeItem?.sizeOptions?.join(', ') ?? '') : (bakeItem?.boxOptions?.join(', ') ?? '')}
                                options={isCake ? ['1 Pound', '2 Pounds', '3 Pounds', '4 Pounds'] : ['Box of 6', 'Box of 8', 'Box of 12', 'Box of 16']}
                                placeholder="Options"
                                className={inputClassName()}
                            />
                        </div>
                        {isCake ? (
                            <div className="sm:col-span-2">
                                <Label hint="Optional serving/tier note">Dimensions</Label>
                                <SelectWithCustom
                                    name="dimensions"
                                    defaultValue={cakeItem?.dimensions ?? ''}
                                    options={['Minimum 2 Pounds', 'Minimum 3 Pounds', 'Minimum 4 Pounds', '2-Tier Cake', '3-Tier Cake', 'Tall Cake']}
                                    placeholder="Dimensions"
                                    className={inputClassName()}
                                />
                            </div>
                        ) : null}
                    </div>

                    {/* Footer - Fixed inside scrolling form at the bottom */}
                    <div className="flex shrink-0 items-center justify-end gap-3 border-t border-brand-border/60 pt-6 pb-2 position-sticky bottom-0 bg-[#fdfaf7] rounded-b-[2rem]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-brand-border bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-text-soft transition-all hover:bg-[#f8f1ea] hover:text-foreground"
                        >
                            Cancel
                        </button>
                        <SubmitButton isEdit={!!item} isCake={isCake} />
                    </div>
                </form>
            </div>
        </div>
    );
}
