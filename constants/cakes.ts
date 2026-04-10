import { CakeProduct, FilterPill, FilterSection } from '@/types';

export const CAKE_HERO = {
    title: 'Custom Cakes',
    subtitle: 'Freshly baked, premium cakes crafted to perfection. A minimum of 2 pounds of pure delight for your celebrations.',
    image1: '/cake.png',
    image2: '/chocolate-cake.png',
};

export const CAKE_SORT_OPTIONS = ['Popularity', 'Price Low to High', 'Price High to Low'];

export const CAKE_FILTER_PILLS: FilterPill[] = [
    { id: 'all', label: 'All Flavors', active: true },
    { id: 'chocolate', label: 'Chocolate' },
    { id: 'vanilla', label: 'Vanilla' },
    { id: 'caramel', label: 'Caramel & Butterscotch' },
    { id: 'fruit', label: 'Fruity & Exotic' },
];

export const CAKE_SIDEBAR_FILTERS: FilterSection[] = [
    {
        id: 'size',
        title: 'Cake Weight',
        style: 'radio',
        options: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
    },
];

export const CAKE_SHOP_ITEMS: CakeProduct[] = [
    {
        id: 'vanilla-classic',
        name: 'Vanilla',
        price: 3000, // 1500 per pound * 2
        image: '/cake.png', // Fallback generic image
        description: 'Classic, fluffy vanilla sponge. Light, elegant, and timelessly delicious. Price is for 2 lbs (Rs. 1500/lb).',
        category: 'vanilla',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        tags: ['Classic'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 3,000',
    },
    {
        id: 'chocolate-rich',
        name: 'Chocolate',
        price: 3600, // 1800 per pound * 2
        image: '/chocolate-cake.png',
        description: 'Rich and moist chocolate cake layered with creamy perfection. Price is for 2 lbs (Rs. 1800/lb).',
        category: 'chocolate',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        tags: ['Popular'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 3,600',
    },
    {
        id: 'chocolate-fudge',
        name: 'Chocolate Fudge',
        price: 4000, // 2000 per pound * 2
        image: '/chocolate-cake.png',
        description: 'Dense, gooey Chocolate Fudge cake for the ultimate chocolate lover. Price is for 2 lbs (Rs. 2000/lb).',
        category: 'chocolate',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        tags: ['Best Seller'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 4,000',
    },
    {
        id: 'caramel-delight',
        name: 'Caramel',
        price: 3600, // 1800 per pound * 2
        image: '/pastery.png',
        description: 'Sweet, buttery caramel notes infused into a soft sponge. Price is for 2 lbs (Rs. 1800/lb).',
        category: 'caramel',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 3,600',
    },
    {
        id: 'butterscotch-dream',
        name: 'Butterscotch',
        price: 3600, // 1800 per pound * 2
        image: '/cake.png',
        description: 'Nostalgic butterscotch flavor with delightful crunchy bits. Price is for 2 lbs (Rs. 1800/lb).',
        category: 'caramel',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        tags: ['Signature'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 3,600',
    },
    {
        id: 'pineapple-fresh',
        name: 'Pineapple',
        price: 4000, // 2000 per pound * 2
        image: '/cake.png',
        description: 'Fresh, tropical pineapple cake with light aerated cream. Price is for 2 lbs (Rs. 2000/lb).',
        category: 'fruit',
        sizeOptions: ['2 Pounds (Min)', '3 Pounds', '4 Pounds', '5+ Pounds'],
        occasions: ['Birthday', 'Anniversary', 'Custom Event'],
        dimensions: 'Minimum 2 Pounds',
        priceLabel: 'From PKR 4,000',
    },
];
