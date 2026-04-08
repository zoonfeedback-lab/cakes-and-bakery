'use client';

import {
  Header,
  HeroSection,
  FeaturedCategories,
  GallerySection,
  JourneySection,
  TestimonialsSection,
  CTASection,
  Footer,
} from '@/components';
import {
  FEATURED_CAKES,
  GALLERY_ITEMS,
  JOURNEY_STEPS,
  TESTIMONIALS,
} from '@/constants';
import { useCallback } from 'react';

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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Fixed/Sticky */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col flex-grow">
        {/* Hero Section */}
        <HeroSection onOrderClick={handleOrderClick} />

        {/* Featured Categories */}
        <FeaturedCategories items={FEATURED_CAKES} />

        {/* Gallery Section */}
        <GallerySection items={GALLERY_ITEMS} onViewAll={handleViewAll} />

        {/* Journey Section */}
        <JourneySection steps={JOURNEY_STEPS} />

        {/* Testimonials Section */}
        <TestimonialsSection items={TESTIMONIALS} />

        {/* CTA Section */}
        <CTASection onCTAClick={handleCTAClick} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
