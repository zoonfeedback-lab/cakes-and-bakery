import { BakeCategory, BakeProduct, BoxSelection, FilterPill, FilterSection, InfoCard, OptionGroup } from '@/types';

export const BAKES_HERO = {
    title: 'Freshly Baked Goodies',
    subtitle: 'Cupcakes, brownies, and cookies baked fresh for every occasion.',
    primaryCta: 'Order Now',
    secondaryCta: 'Customize Your Box',
    image1: '/cupcake.png',
    image2: '/donut.png',
};

export const BAKE_CATEGORIES: BakeCategory[] = [
    {
        id: 'cupcakes',
        title: 'Cupcakes',
        description: 'Single-serving cakes crafted with love and perfectly frosted.',
        items: [
            {
                id: 'cupcake-simple',
                name: 'Simple Cupcakes',
                category: 'Cupcakes',
                price: 150,
                priceLabel: 'PKR 150 each',
                image: '/cupcake.png', // Generic image
                imageAlt: 'Simple decorated cupcake',
                description: 'Classic, delicious cupcakes with traditional frosting styles.',
                tags: ['Classic'],
                occasions: ['Tea Time', 'Kids Celebration'],
            },
            {
                id: 'cupcake-custom',
                name: 'Customized Cupcakes',
                category: 'Cupcakes',
                price: 200,
                priceLabel: 'PKR 200 each',
                image: '/muffin.png', // Generic image
                imageAlt: 'Customized themed cupcakes',
                description: 'Cupcakes tailored and decorated specifically to matching your theme.',
                tags: ['Custom'],
                occasions: ['Gifts & Favors', 'Kids Celebration', 'Party Platter'],
            },
        ],
    },
    {
        id: 'brownies',
        title: 'Brownies',
        description: 'Rich, dense, and glossy 2x2 inch chocolate brownies.',
        items: [
            {
                id: 'brownie-choc',
                name: 'Chocolate Brownies',
                category: 'Brownies',
                price: 2800, // 350 * 8
                priceLabel: 'PKR 2,800 (Box of 8)',
                image: '/pastery.png',
                imageAlt: 'Box of rich chocolate brownies',
                description: 'Traditional rich 2x2 inch chocolate brownies. Sold in boxes. (Minimum Order: 8 pieces, Rs. 350 per brownie).',
                boxOptions: ['Box of 8 (PKR 2,800)', 'Box of 16 (PKR 5,600)', 'Box of 24 (PKR 8,400)'],
                tags: ['Best Seller'],
                occasions: ['Tea Time', 'Gifts & Favors', 'Party Platter'],
            },
        ],
    },
    {
        id: 'cookies',
        title: 'Cookies',
        description: 'Comforting classics baked fresh.',
        items: [
            {
                id: 'cookie-choc-chip',
                name: 'Chocolate Chip Cookies',
                category: 'Cookies',
                price: 3600, // 300 * 12
                priceLabel: 'PKR 3,600 (Box of 12)',
                image: '/buiscuts.png',
                imageAlt: 'Fresh chocolate chip cookies',
                description: 'Classic, chunky chocolate chip cookies. (Minimum Order: 12 pieces, Rs. 300 each).',
                boxOptions: ['Box of 12 (PKR 3,600)', 'Box of 24 (PKR 7,200)'],
                tags: ['Classic'],
                occasions: ['Tea Time', 'Kids Celebration', 'Party Platter'],
            },
            {
                id: 'cookie-mini',
                name: 'Mini Chocolate Chip Cookies',
                category: 'Cookies',
                price: 1800,
                priceLabel: 'PKR 1,800 (500g)',
                image: '/biscuit.png',
                imageAlt: 'Mini chocolate chip cookies in a bag',
                description: 'Bite-sized mini chocolate chip cookies packaged in a convenient 500g bag.',
                boxOptions: ['500g Bag (PKR 1,800)', '1kg Bag (PKR 3,600)'],
                occasions: ['Tea Time', 'Gifts & Favors'],
            },
        ],
    },
];

// Combine all items for easy searching/filtering
export const BAKES_SHOP_ITEMS: BakeProduct[] = BAKE_CATEGORIES.flatMap(cat => cat.items);

export const BAKE_FILTER_PILLS: FilterPill[] = [
    { id: 'all', label: 'All Bakes', active: true },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'brownies', label: 'Brownies' },
    { id: 'cookies', label: 'Cookies' },
];

export const BAKE_SIDEBAR_FILTERS: FilterSection[] = [
    {
        id: 'occasion',
        title: 'Perfect For',
        style: 'pill',
        options: ['Tea Time', 'Gifts & Favors', 'Party Platter', 'Kids Celebration'],
    },
];

export const BAKE_SORT_OPTIONS = ['Popularity', 'Price Low to High', 'Price High to Low'];

export const BUILD_YOUR_BOX: BoxSelection[] = [
    {
        id: 'box-1',
        quantity: '8',
        item: 'Brownies',
        note: 'Classic rich chocolate brownies.',
    },
    {
        id: 'box-2',
        quantity: '12',
        item: 'Cookies',
        note: 'Classic chocolate chip cookies.',
    },
];

export const SPECIAL_OCCASIONS: InfoCard[] = [
    {
        id: 'occasion-1',
        title: 'Wedding Favors',
        description: 'Customized packaging for your special day.',
        image: '/roll.png',
    },
    {
        id: 'occasion-2',
        title: 'Corporate Gifts',
        description: 'Impress clients with our branded boxes.',
        image: '/biscuit.png',
    },
];

export const CUSTOMIZATION_OPTIONS: OptionGroup[] = [
    {
        id: 'flavor',
        title: 'Primary Flavor',
        options: ['Signature Sweet', 'Rich Dark Cocoa', 'Lotus Biscoff', 'Classic Vanilla'],
    },
    {
        id: 'quantity',
        title: 'Quantity',
        options: ['Standard Box', 'Double Box', 'Large Party Platter'],
    },
    {
        id: 'box-type',
        title: 'Box Style',
        options: ['Classic Box', 'Premium Hardcase', 'Wooden Assortment'],
    },
    {
        id: 'add-ons',
        title: 'Add-ons',
        options: ['Gold Leaf Touch', 'Extra Fudge Dip', 'Custom Ribbon', 'Birthday Tag'],
    },
];
