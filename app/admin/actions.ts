'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteCatalogItem, upsertCatalogItem } from '@/lib/catalog';
import type { ProductKind } from '@/types';

function toStringValue(value: FormDataEntryValue | null) {
    return typeof value === 'string' ? value.trim() : '';
}

function toNumberValue(value: FormDataEntryValue | null) {
    const parsed = Number(toStringValue(value));
    return Number.isFinite(parsed) ? parsed : 0;
}

function toList(value: FormDataEntryValue | null) {
    return toStringValue(value)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function revalidateCatalogPages() {
    revalidatePath('/admin');
    revalidatePath('/cakes');
    revalidatePath('/bakes');
    revalidatePath('/custom');
    revalidatePath('/custom/review');
}

export async function saveProductAction(formData: FormData) {
    const kind = toStringValue(formData.get('kind')) as ProductKind;
    const imageFileEntry = formData.get('imageFile');
    const imageFile = imageFileEntry instanceof File ? imageFileEntry : undefined;

    await upsertCatalogItem(
        kind,
        {
            id: toStringValue(formData.get('id')) || undefined,
            name: toStringValue(formData.get('name')),
            category: toStringValue(formData.get('category')),
            price: toNumberValue(formData.get('price')),
            image: toStringValue(formData.get('image')),
            imageAlt: toStringValue(formData.get('imageAlt')) || undefined,
            description: toStringValue(formData.get('description')),
            priceLabel: toStringValue(formData.get('priceLabel')) || undefined,
            tags: toList(formData.get('tags')),
            occasions: toList(formData.get('occasions')),
            sizeOptions: kind === 'cake' ? toList(formData.get('sizeOptions')) : undefined,
            boxOptions: kind === 'bake' ? toList(formData.get('boxOptions')) : undefined,
            dimensions: kind === 'cake' ? toStringValue(formData.get('dimensions')) || undefined : undefined,
        },
        imageFile?.size ? imageFile : undefined,
    );

    revalidateCatalogPages();
    redirect('/admin');
}

export async function deleteProductAction(formData: FormData) {
    const kind = toStringValue(formData.get('kind')) as ProductKind;
    const id = toStringValue(formData.get('id'));

    if (id) {
        await deleteCatalogItem(kind, id);
        revalidateCatalogPages();
    }

    redirect('/admin');
}
