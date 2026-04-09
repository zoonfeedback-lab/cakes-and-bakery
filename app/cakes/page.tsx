import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { CakeCatalog, CakeHero, CakeCtaBanner } from '@/components/cakes';
import {
    CAKE_FILTER_PILLS,
    CAKE_HERO,
    CAKE_SHOP_ITEMS,
    CAKE_SIDEBAR_FILTERS,
    CAKE_SORT_OPTIONS,
} from '@/constants/cakes';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Cakes | ${SITE_NAME}`,
    description:
        'Explore our collection of meticulously crafted cakes for birthdays, weddings, and every special occasion.',
};

export default function CakesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-surface">
            <Header />

            <main className="flex flex-1 flex-col">
                <CakeHero
                    title={CAKE_HERO.title}
                    subtitle={CAKE_HERO.subtitle}
                    image1={CAKE_HERO.image1}
                    image2={CAKE_HERO.image2}
                />
                
                <CakeCatalog
                    items={CAKE_SHOP_ITEMS}
                    pills={CAKE_FILTER_PILLS}
                    sortOptions={CAKE_SORT_OPTIONS}
                    filters={CAKE_SIDEBAR_FILTERS}
                />

                <CakeCtaBanner />
            </main>

            <Footer />
        </div>
    );
}
