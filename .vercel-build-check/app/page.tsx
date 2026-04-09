'use client';

import { useCallback } from 'react';
import { Footer, Header } from '@/components/layout';
import {
    CTASection,
    FeaturedCategories,
    GallerySection,
    HeroSection,
    JourneySection,
    TestimonialsSection,
} from '@/components/home';
import { FEATURED_CAKES, GALLERY_ITEMS, JOURNEY_STEPS, TESTIMONIALS } from '@/constants/home';

export default function HomePage() {
    const handleOrderClick = useCallback(() => {
        // TODO: Implement order flow / modal
        console.log('Order clicked');
    }, []);

    const handleViewAll = useCallback(() => {
        // TODO: Navigate to gallery page
        console.log('View all gallery clicked');
    }, []);

    const handleCTAClick = useCallback(() => {
        // TODO: Navigate to customization flow
        console.log('CTA clicked');
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex flex-grow flex-col">
                <HeroSection onOrderClick={handleOrderClick} />
                <FeaturedCategories items={FEATURED_CAKES} />
                <GallerySection items={GALLERY_ITEMS} onViewAll={handleViewAll} />
                <JourneySection steps={JOURNEY_STEPS} />
                <TestimonialsSection items={TESTIMONIALS} />
                <CTASection onCTAClick={handleCTAClick} />
            </main>

            <Footer />
        </div>
    );
}
