import { promises as fs } from 'fs';
import path from 'path';
import { BAKES_SHOP_ITEMS } from '@/constants/bakes';
import { CAKE_SHOP_ITEMS } from '@/constants/cakes';
import { formatPriceLabel, slugifyLabel } from '@/lib/catalog-ui';
import { db } from '@/lib/db';
import type { BakeProduct, CakeProduct, CatalogData, ProductKind } from '@/types';

const UPLOADS_DIRECTORY = path.join(process.cwd(), 'public', 'uploads');

function normalizeText(value: string | undefined) {
    return value?.trim() ?? '';
}

function normalizeList(values: string[] | undefined) {
    const normalized = values?.map((value) => value.trim()).filter(Boolean) ?? [];
    return normalized.length > 0 ? [...new Set(normalized)] : undefined;
}

function normalizeCakeProduct(item: CakeProduct): CakeProduct {
    const price = Number(item.price) || 0;

    return {
        id: normalizeText(item.id) || slugifyLabel(item.name) || `cake-${Date.now()}`,
        name: normalizeText(item.name),
        category: normalizeText(item.category),
        price,
        image: normalizeText(item.image) || '/images/signature-cake.png',
        description: normalizeText(item.description),
        sizeOptions: normalizeList(item.sizeOptions),
        occasions: normalizeList(item.occasions),
        tags: normalizeList(item.tags),
        dimensions: normalizeText(item.dimensions) || undefined,
        imageAlt: normalizeText(item.imageAlt) || undefined,
        priceLabel: normalizeText(item.priceLabel) || formatPriceLabel('cake', price),
    };
}

function normalizeBakeProduct(item: BakeProduct): BakeProduct {
    const price = Number(item.price) || 0;

    return {
        id: normalizeText(item.id) || slugifyLabel(item.name) || `bake-${Date.now()}`,
        name: normalizeText(item.name),
        category: normalizeText(item.category),
        price,
        image: normalizeText(item.image) || '/images/daily-bakes.png',
        description: normalizeText(item.description),
        boxOptions: normalizeList(item.boxOptions),
        occasions: normalizeList(item.occasions),
        tags: normalizeList(item.tags),
        imageAlt: normalizeText(item.imageAlt) || undefined,
        priceLabel: normalizeText(item.priceLabel) || formatPriceLabel('bake', price),
    };
}

const DEFAULT_CATALOG: CatalogData = {
    cakes: CAKE_SHOP_ITEMS.map(normalizeCakeProduct),
    bakes: BAKES_SHOP_ITEMS.map(normalizeBakeProduct),
};

type CatalogRow = {
    kind: ProductKind;
    item_id: string;
    payload: CakeProduct | BakeProduct;
};

async function ensureCatalogTable() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS bakery_catalog (
            kind TEXT NOT NULL,
            item_id TEXT NOT NULL,
            payload JSONB NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            PRIMARY KEY (kind, item_id)
        )
    `);

    const { rows } = await db.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM bakery_catalog');
    const count = Number(rows[0]?.count ?? '0');

    if (count > 0) {
        return;
    }

    for (const cake of DEFAULT_CATALOG.cakes) {
        await db.query(
            `
                INSERT INTO bakery_catalog (kind, item_id, payload)
                VALUES ($1, $2, $3::jsonb)
            `,
            ['cake', cake.id, JSON.stringify(cake)],
        );
    }

    for (const bake of DEFAULT_CATALOG.bakes) {
        await db.query(
            `
                INSERT INTO bakery_catalog (kind, item_id, payload)
                VALUES ($1, $2, $3::jsonb)
            `,
            ['bake', bake.id, JSON.stringify(bake)],
        );
    }
}

export async function getCatalogData(): Promise<CatalogData> {
    await ensureCatalogTable();

    const { rows } = await db.query<CatalogRow>(
        `
            SELECT kind, item_id, payload
            FROM bakery_catalog
            ORDER BY updated_at DESC, item_id ASC
        `,
    );

    return {
        cakes: rows
            .filter((row) => row.kind === 'cake')
            .map((row) => normalizeCakeProduct(row.payload as CakeProduct)),
        bakes: rows
            .filter((row) => row.kind === 'bake')
            .map((row) => normalizeBakeProduct(row.payload as BakeProduct)),
    };
}

async function saveUploadedImage(kind: ProductKind, file: File) {
    if (!file || file.size === 0) {
        return null;
    }

    const safeExtension = path.extname(file.name) || '.png';
    const fileName = `${kind}-${Date.now()}-${slugifyLabel(path.basename(file.name, safeExtension))}${safeExtension}`;
    const filePath = path.join(UPLOADS_DIRECTORY, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.mkdir(UPLOADS_DIRECTORY, { recursive: true });
    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
}

type UpsertPayload = Omit<CakeProduct, 'id'> & {
    id?: string;
    boxOptions?: string[];
};

export async function upsertCatalogItem(kind: ProductKind, item: UpsertPayload, imageFile?: File) {
    await ensureCatalogTable();
    const normalizedId = normalizeText(item.id) || `${slugifyLabel(item.name)}-${Date.now()}`;
    const uploadedImage = imageFile ? await saveUploadedImage(kind, imageFile) : null;

    if (kind === 'cake') {
        const nextItem = normalizeCakeProduct({
            ...item,
            id: normalizedId,
            image: uploadedImage ?? item.image,
        });
        await db.query(
            `
                INSERT INTO bakery_catalog (kind, item_id, payload, updated_at)
                VALUES ($1, $2, $3::jsonb, NOW())
                ON CONFLICT (kind, item_id)
                DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()
            `,
            ['cake', normalizedId, JSON.stringify(nextItem)],
        );
    } else {
        const nextItem = normalizeBakeProduct({
            ...(item as BakeProduct),
            id: normalizedId,
            image: uploadedImage ?? item.image,
        });
        await db.query(
            `
                INSERT INTO bakery_catalog (kind, item_id, payload, updated_at)
                VALUES ($1, $2, $3::jsonb, NOW())
                ON CONFLICT (kind, item_id)
                DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()
            `,
            ['bake', normalizedId, JSON.stringify(nextItem)],
        );
    }
}

export async function deleteCatalogItem(kind: ProductKind, id: string) {
    await ensureCatalogTable();
    await db.query('DELETE FROM bakery_catalog WHERE kind = $1 AND item_id = $2', [kind, id]);
}
