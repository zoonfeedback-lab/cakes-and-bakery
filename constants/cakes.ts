import type { CakeProduct } from '@/types';

export type CakeHeroContent = {
    title: string;
    description: string;
    primaryActionLabel: string;
    primaryActionHref: string;
    accentImage: string;
    featuredImage: string;
};

export const CAKES_HERO: CakeHeroContent = {
    title: 'Cakes for Every Occasion',
    description:
        'Meticulously crafted with the finest ingredients and a touch of artistic flourish for your most cherished moments.',
    primaryActionLabel: 'Explore Collection',
    primaryActionHref: '#cakes-grid',
    accentImage: '/images/hero-cake.png',
    featuredImage: '/images/salted-caramel.png',
};

export const CAKE_CATEGORY_PILLS = [
    'All',
    'Chocolate',
    'Red Velvet',
    'Vanilla',
    'Photo Cake',
    'Wedding Cake',
] as const;

export const CAKE_SIZE_OPTIONS = [
    '4" Bento Cake',
    '6" Standard',
    '8" Celebration',
    'Tiered Artistry',
] as const;

export const CAKE_OCCASIONS = [
    'Birthday',
    'Wedding',
    'Anniversary',
    'Graduation',
] as const;

export const CAKE_SORT_LABEL = 'Popularity';

export const CAKE_PRODUCTS: CakeProduct[] = [
    {
        id: 'royal-velvet',
        name: 'Royal Velvet',
        category: 'Red Velvet',
        price: 64,
        image: '/images/velvet-rose.png',
        description: 'Deep cocoa infused with crimson elegance and silky smooth cream cheese.',
    },
    {
        id: 'citrus-bloom',
        name: 'Citrus Bloom',
        category: 'Vanilla',
        price: 48,
        image: '/images/daily-bakes.png',
        description: 'Zesty lemon sponge layered with citrus curd and whipped mascarpone.',
    },
    {
        id: 'midnight-ganache',
        name: 'Midnight Ganache',
        category: 'Chocolate',
        price: 72,
        image: '/images/celestial.png',
        description: 'Rich chocolate infusion with 70% dark Belgian ganache and sea salt flakes.',
    },
    {
        id: 'summer-berry',
        name: 'Summer Berry',
        category: 'Vanilla',
        price: 55,
        image: '/images/birthday-cake.png',
        description: 'Light vanilla sponge with locally sourced berries and chantilly cream.',
    },
    {
        id: 'ivory-orchid',
        name: 'Ivory Orchid',
        category: 'Wedding Cake',
        price: 240,
        image: '/images/signature-cake.png',
        description: 'A two-tiered architectural masterpiece with almond and honey notes.',
    },
    {
        id: 'caramel-drift',
        name: 'Caramel Drift',
        category: 'Chocolate',
        price: 58,
        image: '/images/salted-caramel.png',
        description: 'Dense coffee cake with burnt caramel glaze and sea salt crunch.',
    },
];

export const CAKES_CTA = {
    title: "Can't find your cake?",
    description:
        "Our master bakers can turn your wildest imagination into a delicious reality. Let's create something unique.",
    actionLabel: 'Design Custom Cake',
};
