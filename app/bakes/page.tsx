import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { BakesCatalog, BakesCtaBanner, BakesShopHero } from '@/components/bakes';
import {
    BAKE_FILTER_PILLS,
    BAKES_HERO,
    BAKES_SHOP_ITEMS,
    BAKE_SIDEBAR_FILTERS,
    BAKE_SORT_OPTIONS,
} from '@/constants/bakes';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Bakes - ${SITE_NAME}`,
    description:
        'Browse brownies, cookies, cupcakes, custom boxes, and celebration-ready baked treats from Central Cakes.',
};

export default function BakesPage() {
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
                    items={BAKES_SHOP_ITEMS}
                    pills={BAKE_FILTER_PILLS}
                    sortOptions={BAKE_SORT_OPTIONS}
                    filters={BAKE_SIDEBAR_FILTERS}
                />
                <BakesCtaBanner />
            </main>

            <Footer />
        </div>
    );
}
