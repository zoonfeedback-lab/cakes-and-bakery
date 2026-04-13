import { deleteProductAction, saveProductAction } from '@/app/admin/actions';
import type { BakeProduct, CakeProduct, ProductKind } from '@/types';

type ProductEditorProps = Readonly<{
    kind: ProductKind;
    items: CakeProduct[] | BakeProduct[];
}>;

type ProductFormProps = Readonly<{
    kind: ProductKind;
    item?: CakeProduct | BakeProduct;
}>;

function inputClassName() {
    return 'mt-2 w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary';
}

function FieldLabel({ label, description }: { label: string; description?: string }) {
    return (
        <label className="block text-sm font-medium text-foreground">
            {label}
            {description ? (
                <span className="mt-1 block text-xs font-normal uppercase tracking-[0.14em] text-text-soft">
                    {description}
                </span>
            ) : null}
        </label>
    );
}

function ProductForm({ kind, item }: ProductFormProps) {
    const isCake = kind === 'cake';
    const bakeItem = item as BakeProduct | undefined;
    const cakeItem = item as CakeProduct | undefined;

    return (
        <form action={saveProductAction} className="space-y-5 rounded-[2rem] border border-brand-border bg-white/90 p-6 shadow-[0_18px_42px_rgba(109,80,96,0.08)]">
            <input type="hidden" name="kind" value={kind} />
            <input type="hidden" name="id" value={item?.id ?? ''} />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-2xl text-foreground">
                        {item ? `Edit ${item.name}` : `Add New ${isCake ? 'Cake' : 'Bake'}`}
                    </h3>
                    <p className="mt-1 text-sm text-text-soft">
                        {item
                            ? 'Update pricing, description, category, tags, or replace the product image.'
                            : 'Create a new item that will appear on the public storefront right away.'}
                    </p>
                </div>

                {item ? (
                    <div className="rounded-full bg-[#f8f1ea] px-4 py-2 text-xs uppercase tracking-[0.16em] text-primary">
                        {item.id}
                    </div>
                ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <FieldLabel label="Name" />
                    <input className={inputClassName()} name="name" defaultValue={item?.name ?? ''} required />
                </div>
                <div>
                    <FieldLabel
                        label="Category"
                        description={isCake ? 'Examples: Chocolate, Wedding Cake, Red Velvet' : 'Examples: Brownies, Cookies, Cupcakes'}
                    />
                    <input className={inputClassName()} name="category" defaultValue={item?.category ?? ''} required />
                </div>
                <div>
                    <FieldLabel label="Price" />
                    <input className={inputClassName()} name="price" type="number" min="0" defaultValue={item?.price ?? 0} required />
                </div>
                <div>
                    <FieldLabel label="Price Label" description="Optional. Leave blank to auto-generate one." />
                    <input className={inputClassName()} name="priceLabel" defaultValue={item?.priceLabel ?? ''} />
                </div>
                <div className="md:col-span-2">
                    <FieldLabel label="Description" />
                    <textarea className={inputClassName()} name="description" rows={4} defaultValue={item?.description ?? ''} required />
                </div>
                <div>
                    <FieldLabel label="Image Path" description="Existing image path inside `/public`, for example `/images/hero-cake.png`." />
                    <input className={inputClassName()} name="image" defaultValue={item?.image ?? ''} placeholder="/images/example.png" />
                </div>
                <div>
                    <FieldLabel label="Upload Image" description="Optional. If a file is selected it replaces the image path above." />
                    <input className={inputClassName()} name="imageFile" type="file" accept="image/*" />
                </div>
                <div>
                    <FieldLabel label="Image Alt Text" />
                    <input className={inputClassName()} name="imageAlt" defaultValue={item?.imageAlt ?? ''} />
                </div>
                <div>
                    <FieldLabel label="Tags" description="Comma separated, for example `Best Seller, Custom Box`." />
                    <input className={inputClassName()} name="tags" defaultValue={item?.tags?.join(', ') ?? ''} />
                </div>
                <div>
                    <FieldLabel label="Occasions" description="Comma separated, for example `Birthday, Anniversary`." />
                    <input className={inputClassName()} name="occasions" defaultValue={item?.occasions?.join(', ') ?? ''} />
                </div>
                <div>
                    <FieldLabel label={isCake ? 'Size Options' : 'Box Options'} description="Comma separated values." />
                    <input
                        className={inputClassName()}
                        name={isCake ? 'sizeOptions' : 'boxOptions'}
                        defaultValue={isCake ? cakeItem?.sizeOptions?.join(', ') ?? '' : bakeItem?.boxOptions?.join(', ') ?? ''}
                    />
                </div>
                {isCake ? (
                    <div className="md:col-span-2">
                        <FieldLabel label="Dimensions" description="Optional serving or tier note used in the custom flow." />
                        <input className={inputClassName()} name="dimensions" defaultValue={cakeItem?.dimensions ?? ''} />
                    </div>
                ) : null}
            </div>

            <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                    {item ? 'Save Changes' : `Create ${isCake ? 'Cake' : 'Bake'}`}
                </button>
            </div>
        </form>
    );
}

export function ProductEditor({ kind, items }: ProductEditorProps) {
    const title = kind === 'cake' ? 'Cakes' : 'Bakes';
    const description =
        kind === 'cake'
            ? 'Manage cake names, categories, prices, descriptions, and photo uploads.'
            : 'Manage bake products, their categories, price labels, box options, and photo uploads.';

    return (
        <section className="space-y-6">
            <div className="rounded-[2rem] border border-brand-border bg-[#fff8f3] p-6">
                <h2 className="text-3xl text-foreground">{title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-text-soft">{description}</p>
            </div>

            <ProductForm kind={kind} />

            <div className="grid gap-6">
                {items.map((item) => (
                    <details
                        key={item.id}
                        className="overflow-hidden rounded-[2rem] border border-brand-border bg-[#fdfaf7] shadow-[0_10px_28px_rgba(109,80,96,0.05)]"
                    >
                        <summary className="cursor-pointer list-none px-6 py-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-2xl text-foreground">{item.name}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-soft">
                                        {item.category} • {item.priceLabel ?? `PKR ${item.price.toLocaleString()}`}
                                    </p>
                                </div>
                                <span className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.16em] text-primary">
                                    Edit
                                </span>
                            </div>
                        </summary>

                        <div className="space-y-4 border-t border-brand-border/70 p-6 pt-5">
                            <div className="flex justify-end">
                                <form action={deleteProductAction}>
                                    <input type="hidden" name="kind" value={kind} />
                                    <input type="hidden" name="id" value={item.id} />
                                    <button
                                        type="submit"
                                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-red-700 transition hover:bg-red-100"
                                    >
                                        Delete Item
                                    </button>
                                </form>
                            </div>
                            <ProductForm kind={kind} item={item} />
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}

export default ProductEditor;
