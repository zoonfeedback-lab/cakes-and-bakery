import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { CakeCatalog, CakeHero, CakeCtaBanner } from '@/components/cakes';
import { CAKE_HERO, CAKE_SORT_OPTIONS } from '@/constants/cakes';
import { getCatalogData } from '@/lib/catalog';
import { buildCakeFilterPills, buildCakeSidebarFilters } from '@/lib/catalog-ui';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Cakes | ${SITE_NAME}`,
    description:
        'Explore our collection of meticulously crafted cakes for birthdays, weddings, and every special occasion.',
};

export default async function CakesPage() {
    const catalog = await getCatalogData();
    const cakeItems = catalog.cakes;

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
                    items={cakeItems}
                    pills={buildCakeFilterPills(cakeItems)}
                    sortOptions={CAKE_SORT_OPTIONS}
                    filters={buildCakeSidebarFilters(cakeItems)}
                />

                <CakeCtaBanner />
            </main>

            <Footer />
        </div>
    );
}
