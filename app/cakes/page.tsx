import { Footer, Header } from '@/components/layout';
import { CakesCtaBanner, CakesGrid, CakesHero, CakesSidebar, CakesToolbar } from '@/components/cakes';
import {
    CAKE_CATEGORY_PILLS,
    CAKE_OCCASIONS,
    CAKE_PRODUCTS,
    CAKE_SIZE_OPTIONS,
    CAKE_SORT_LABEL,
    CAKES_CTA,
    CAKES_HERO,
} from '@/constants/cakes';

export default function CakesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f3ef] text-[#2d242a]">
            <Header />

            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 md:px-8 lg:px-10">
                    <CakesHero hero={CAKES_HERO} />
                    <CakesToolbar categories={CAKE_CATEGORY_PILLS} sortLabel={CAKE_SORT_LABEL} />

                    <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
                        <CakesSidebar sizeOptions={CAKE_SIZE_OPTIONS} occasions={CAKE_OCCASIONS} />
                        <CakesGrid items={CAKE_PRODUCTS} />
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button
                            className="rounded-full bg-[#ece9e3] px-7 py-3 text-sm text-[#665a61] transition hover:bg-[#e1ddd6]"
                            type="button"
                        >
                            Load More Pastries
                        </button>
                    </div>

                    <CakesCtaBanner
                        title={CAKES_CTA.title}
                        description={CAKES_CTA.description}
                        actionLabel={CAKES_CTA.actionLabel}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
