import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { BakesCatalog, BakesCtaBanner, BakesShopHero } from '@/components/bakes';
import { BAKES_HERO, BAKE_SORT_OPTIONS } from '@/constants/bakes';
import { getCatalogData } from '@/lib/catalog';
import { buildBakesFilterPills, buildBakesSidebarFilters } from '@/lib/catalog-ui';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Bakes | ${SITE_NAME}`,
    description:
        'Browse brownies, cookies, cupcakes, custom boxes, and celebration-ready baked treats from Central Cakes.',
};

export default async function BakesPage() {
    const catalog = await getCatalogData();
    const bakeItems = catalog.bakes;

    return (
        <div className="flex min-h-screen flex-col bg-surface">
            <Header />

            <main className="flex flex-1 flex-col">
                <BakesShopHero
                    title={BAKES_HERO.title}
                    subtitle={BAKES_HERO.subtitle}
                    image1={BAKES_HERO.image1}
                    image2={BAKES_HERO.image2}
                />
                <BakesCatalog
                    items={bakeItems}
                    pills={buildBakesFilterPills(bakeItems)}
                    sortOptions={BAKE_SORT_OPTIONS}
                    filters={buildBakesSidebarFilters(bakeItems)}
                />
                <BakesCtaBanner />
            </main>

            <Footer />
        </div>
    );
}
