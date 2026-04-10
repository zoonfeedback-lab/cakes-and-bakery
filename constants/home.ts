import { CakeProduct, Testimonial, JourneyStep } from '@/types';

export const FEATURED_CAKES: CakeProduct[] = [
    {
        id: 'chocolate-fudge',
        name: 'Chocolate Fudge',
        category: 'Signature',
        price: 4000,
        image: '/chocolate-cake.png',
        description: 'Dense, gooey Chocolate Fudge cake for the ultimate chocolate lover.',
    },
    {
        id: 'pineapple-fresh',
        name: 'Fresh Pineapple',
        category: 'Classic',
        price: 4000,
        image: '/pastery.png',
        description: 'Tropical pineapple cake beautifully presented for fresh celebrations.',
    },
    {
        id: 'butterscotch-dream',
        name: 'Butterscotch Dream',
        category: 'Premium',
        price: 3600,
        image: '/cake.png',
        description: 'Nostalgic butterscotch flavor with delightful crunchy bits.',
    },
];

export const GALLERY_ITEMS: CakeProduct[] = [
    {
        id: 'vanilla-classic',
        name: 'Vanilla Classic',
        category: 'Classic',
        price: 3000,
        image: '/cake.png',
        description: 'Fluffy vanilla sponge, light, elegant, and timelessly delicious.',
    },
    {
        id: 'caramel-delight',
        name: 'Caramel Delight',
        category: 'Signature',
        price: 3600,
        image: '/pastery.png',
        description: 'Sweet, buttery caramel notes infused into a soft sponge.',
    },
    {
        id: 'chocolate-rich',
        name: 'Rich Chocolate',
        category: 'Premium',
        price: 3600,
        image: '/chocolate-cake.png',
        description: 'Rich and moist chocolate cake layered with creamy perfection.',
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
        author: 'Ayesha Khan',
        content: 'The cake for my kids wedding was next in taste and exceeded my dreams. Don’t hesitate.',
        rating: 5,
    },
    {
        id: 't2',
        author: 'Hamza Sheikh',
        content: "The cake we planned for our daughter's engagement turned out better than we imagined.",
        rating: 5,
    },
    {
        id: 't3',
        author: 'Maham Raza',
        content: 'The attention to detail is outstanding. Every celebration deserves their cakes. Highly recommend!',
        rating: 5,
    },
];
