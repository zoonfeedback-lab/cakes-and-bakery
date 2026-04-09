import { CakeProduct, FilterPill, FilterSection } from '@/types';

export const CAKE_HERO = {
    title: 'Cakes for Every Occasion',
    subtitle: 'Meticulously crafted with the finest ingredients and a touch of artistic flourish for your most cherished moments.',
    image1: '/images/cake-hero-bg.png',
    image2: '/images/cake-hero-showcase.png',
};

export const CAKE_SORT_OPTIONS = ['Popularity', 'Newest', 'Price Low to High'];

export const CAKE_FILTER_PILLS: FilterPill[] = [
    { id: 'all', label: 'All', active: true },
    { id: 'chocolate', label: 'Chocolate' },
    { id: 'red-velvet', label: 'Red Velvet' },
    { id: 'vanilla', label: 'Vanilla' },
    { id: 'photo-cake', label: 'Photo Cake' },
    { id: 'wedding-cake', label: 'Wedding Cake' },
];

export const CAKE_SIDEBAR_FILTERS: FilterSection[] = [
    {
        id: 'size',
        title: 'Cake Size',
        style: 'radio',
        options: ['4" Bento Cake', '6" Standard', '8" Celebration', 'Tiered Artistry'],
    },
    {
        id: 'occasion',
        title: 'Occasion',
        style: 'pill',
        options: ['Birthday', 'Wedding', 'Anniversary', 'Graduation'],
    },
];

export const CAKE_SHOP_ITEMS: CakeProduct[] = [
    {
        id: 'royal-velvet',
        name: 'Royal Velvet',
        price: 64,
        image: '/images/velvet-rose.png',
        description: 'Deep cocoa infused with crimson elegance and silky smooth cream cheese.',
        category: 'red-velvet',
        sizeOptions: ['6" Standard', '8" Celebration'],
        occasions: ['Birthday', 'Anniversary'],
        tags: ['Most Loved'],
    },
    {
        id: 'citrus-bloom',
        name: 'Citrus Bloom',
        price: 48,
        image: '/images/daily-bakes.png',
        description: 'Zesty lemon sponge layered with citrus curd and whipped mascarpone.',
        category: 'vanilla',
        sizeOptions: ['4" Bento Cake', '6" Standard'],
        occasions: ['Birthday', 'Graduation'],
    },
    {
        id: 'midnight-ganache',
        name: 'Midnight Ganache',
        price: 72,
        image: '/images/celestial.png',
        description: 'Rich chocolate infusion with 70% dark Belgian ganache and sea salt flakes.',
        category: 'chocolate',
        sizeOptions: ['6" Standard', '8" Celebration'],
        occasions: ['Wedding', 'Anniversary'],
        tags: ['Best Seller'],
    },
    {
        id: 'summer-berry',
        name: 'Summer Berry',
        price: 55,
        image: '/images/birthday-cake.png',
        description: 'Light vanilla sponge with locally sourced berries and chantilly cream.',
        category: 'vanilla',
        sizeOptions: ['4" Bento Cake', '6" Standard'],
        occasions: ['Birthday', 'Graduation'],
    },
    {
        id: 'ivory-orchid',
        name: 'Ivory Orchid',
        price: 240,
        image: '/images/signature-cake.png',
        description: 'A two-tiered architectural masterpiece with almond and honey notes.',
        category: 'wedding-cake',
        sizeOptions: ['Tiered Artistry'],
        occasions: ['Wedding', 'Anniversary'],
        tags: ['Best Seller', 'Most Loved'],
    },
    {
        id: 'caramel-drift',
        name: 'Caramel Drift',
        price: 58,
        image: '/images/salted-caramel.png',
        description: 'Dense coffee cake with burnt caramel glaze and sea salt crunch.',
        category: 'chocolate',
        sizeOptions: ['6" Standard', '8" Celebration'],
        occasions: ['Anniversary', 'Graduation'],
    },
    {
        id: 'pixel-party',
        name: 'Pixel Party',
        price: 84,
        image: '/images/hero-cake.png',
        description: 'Custom edible photo print cake with buttercream frame and confetti texture.',
        category: 'photo-cake',
        sizeOptions: ['6" Standard', '8" Celebration'],
        occasions: ['Birthday', 'Graduation'],
        tags: ['Custom'],
    },
    {
        id: 'gold-ribbon',
        name: 'Gold Ribbon',
        price: 132,
        image: '/images/journey-1.png',
        description: 'Floral fondant styling with smooth vanilla sponge for elegant gatherings.',
        category: 'wedding-cake',
        sizeOptions: ['8" Celebration', 'Tiered Artistry'],
        occasions: ['Wedding', 'Anniversary'],
    },
    {
        id: 'crimson-frost',
        name: 'Crimson Frost',
        price: 68,
        image: '/images/journey-2.png',
        description: 'Classic red velvet layers with whipped cream cheese and berry glaze.',
        category: 'red-velvet',
        sizeOptions: ['6" Standard', '8" Celebration'],
        occasions: ['Birthday', 'Wedding'],
    },
];
