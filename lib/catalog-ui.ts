import type { BakeProduct, CakeProduct, FilterPill, FilterSection, ProductKind } from '@/types';

export function slugifyLabel(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function formatCategoryLabel(value: string) {
    return value
        .trim()
        .split(/[\s-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function uniqueOptions(values: string[]) {
    return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function buildPills(labels: string[]) {
    return [
        { id: 'all', label: 'All', active: true },
        ...uniqueOptions(labels).map((label) => ({
            id: slugifyLabel(label),
            label: formatCategoryLabel(label),
        })),
    ] satisfies FilterPill[];
}

export function buildCakeFilterPills(items: CakeProduct[]) {
    return buildPills(items.map((item) => item.category));
}

export function buildCakeSidebarFilters(items: CakeProduct[]) {
    return [
        {
            id: 'size',
            title: 'Cake Size',
            style: 'radio',
            options: uniqueOptions(items.flatMap((item) => item.sizeOptions ?? [])),
        },
        {
            id: 'occasion',
            title: 'Occasion',
            style: 'pill',
            options: uniqueOptions(items.flatMap((item) => item.occasions ?? [])),
        },
    ] satisfies FilterSection[];
}

export function buildBakesFilterPills(items: BakeProduct[]) {
    const pills = buildPills(items.map((item) => item.category));

    if (items.some((item) => item.tags?.includes('Gift Boxes'))) {
        pills.push({ id: 'gift-boxes', label: 'Gift Boxes' });
    }

    if (items.some((item) => item.tags?.includes('Custom Box'))) {
        pills.push({ id: 'custom', label: 'Custom Box' });
    }

    return pills;
}

export function buildBakesSidebarFilters(items: BakeProduct[]) {
    return [
        {
            id: 'size',
            title: 'Box Size',
            style: 'radio',
            options: uniqueOptions(items.flatMap((item) => item.boxOptions ?? [])),
        },
        {
            id: 'occasion',
            title: 'Occasion',
            style: 'pill',
            options: uniqueOptions(items.flatMap((item) => item.occasions ?? [])),
        },
    ] satisfies FilterSection[];
}

export function formatPriceLabel(kind: ProductKind, price: number) {
    return kind === 'cake'
        ? `PKR ${price.toLocaleString()}`
        : `from PKR ${price.toLocaleString()}`;
}
