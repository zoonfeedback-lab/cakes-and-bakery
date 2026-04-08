import { CakeProduct, Testimonial, JourneyStep } from '@/types';

export const FEATURED_CAKES: CakeProduct[] = [
    {
        id: '1',
        name: 'Signature Cakes',
        category: 'Signature',
        price: 45,
        image: '/images/signature-cake.png',
        description: 'Artisan cakes, delicious taste, and unforgettable birthdays',
    },
    {
        id: '2',
        name: 'Daily Bakes',
        category: 'Daily',
        price: 35,
        image: '/images/daily-bakes.png',
        description: 'Fresh baked goodies perfect for any occasion',
    },
    {
        id: '3',
        name: 'Birthday Cakes',
        category: 'Birthday',
        price: 55,
        image: '/images/birthday-cake.png',
        description: 'Make your celebration special with custom designs',
    },
];

export const GALLERY_ITEMS: CakeProduct[] = [
    {
        id: 'g1',
        name: 'Velvet Rose Boutique',
        category: 'Premium',
        price: 89,
        image: '/images/velvet-rose.png',
        description: 'Elegant white cake with premium decoration',
    },
    {
        id: 'g2',
        name: 'Salted Caramel Cloud',
        category: 'Premium',
        price: 49,
        image: '/images/salted-caramel.png',
        description: 'Smooth caramel layers with specialty flavoring',
    },
    {
        id: 'g3',
        name: 'Celestial Celebration',
        category: 'Premium',
        price: 99,
        image: '/images/celestial.png',
        description: 'Luxurious gold-accented celebration cake',
    },
];

export const JOURNEY_STEPS: JourneyStep[] = [
    {
        id: 'j1',
        icon: 'Palette',
        title: 'Choose',
        description: 'Explore a stunning collection of our bespoke designs',
    },
    {
        id: 'j2',
        icon: 'Sparkles',
        title: 'Customize',
        description: "Tell us what you need and we'll make it perfect for you",
    },
    {
        id: 'j3',
        icon: 'Gift',
        title: 'Receive',
        description: 'Celebrate with your freshly baked creation ready to impress',
    },
    {
        id: 'j4',
        icon: 'Heart',
        title: 'Enjoy',
        description: 'Share the delicious moments with your loved ones',
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 't1',
        author: 'Robert Jones',
        content: 'The cake for my kids wedding was next in taste and exceeded my dreams. Don’t hesitate.',
        rating: 5,
    },
    {
        id: 't2',
        author: 'Elena Wilson',
        content: "The cake we planned for our daughter's engagement turned out better than we imagined.",
        rating: 5,
    },
    {
        id: 't3',
        author: 'Marcus Anderson',
        content: 'The attention to detail is outstanding. Every celebration deserves their cakes. Highly recommend!',
        rating: 5,
    },
];
