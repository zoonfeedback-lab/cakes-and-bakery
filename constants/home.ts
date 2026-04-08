import { CakeProduct, Testimonial, JourneyStep } from '@/types';

export const FEATURED_CAKES: CakeProduct[] = [
    {
        id: '1',
        name: 'Mehfil Signature',
        category: 'Signature',
        price: 45,
        image: '/images/signature-cake.png',
        description: 'Elegant custom cakes crafted for family gatherings, dholkis, and memorable celebrations',
    },
    {
        id: '2',
        name: 'Rozana Bakes',
        category: 'Daily',
        price: 35,
        image: '/images/daily-bakes.png',
        description: 'Freshly baked treats perfect for chai time, gifting, and everyday sweet cravings',
    },
    {
        id: '3',
        name: 'Shaadi Aur Birthday',
        category: 'Birthday',
        price: 55,
        image: '/images/birthday-cake.png',
        description: 'Celebrate birthdays and festive moments with joyful custom cake designs',
    },
];

export const GALLERY_ITEMS: CakeProduct[] = [
    {
        id: 'g1',
        name: 'Gulabo Velvet',
        category: 'Premium',
        price: 89,
        image: '/images/velvet-rose.png',
        description: 'A graceful white celebration cake with floral styling and soft desi wedding charm',
    },
    {
        id: 'g2',
        name: 'Badami Caramel',
        category: 'Premium',
        price: 49,
        image: '/images/salted-caramel.png',
        description: 'Smooth caramel layers finished with a rich bakery touch and nutty warmth',
    },
    {
        id: 'g3',
        name: 'Shehnai Celebration',
        category: 'Premium',
        price: 99,
        image: '/images/celestial.png',
        description: 'A luxurious gold-accented cake designed for weddings, engagements, and grand events',
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
