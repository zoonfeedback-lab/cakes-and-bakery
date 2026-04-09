import { AddOnOption, CakeTypeOption, FlavorOption, SizeOption, ThemeOption } from '@/types/birthday';

export const STEPS = [
  { id: 'theme', label: 'Theme' },
  { id: 'type', label: 'Cake Type' },
  { id: 'flavor', label: 'Flavor' },
  { id: 'design', label: 'Design' },
  { id: 'personalize', label: 'Personalize' },
  { id: 'size', label: 'Size' },
  { id: 'addons', label: 'Add-Ons' },
  { id: 'preview', label: 'Preview' },
] as const;

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'cartoon', category: 'Kids Birthday', title: 'Cartoon Paradise', image: '/images/hero-cake.png', price: 15 },
  { id: 'superhero', category: 'Kids Birthday', title: 'Superhero City', image: '/images/velvet-rose.png', price: 15 },
  { id: 'princess', category: 'Kids Birthday', title: 'Princess Castle', image: '/images/journey-1.png', price: 18 },
  { id: 'minimalist', category: 'Adult Birthday', title: 'Minimalist Chic', image: '/images/signature-cake.png', price: 0 },
  { id: 'elegant', category: 'Adult Birthday', title: 'Elegant Floral', image: '/images/journey-2.png', price: 20 },
  { id: 'number', category: 'Milestone Birthday', title: 'Number Cake', image: '/images/birthday-cake.png', price: 10 },
  { id: 'photo', category: 'Teen Birthday', title: 'Edible Photo', image: '/images/daily-bakes.png', price: 12 },
];

export const CAKE_TYPE_OPTIONS: CakeTypeOption[] = [
  { id: 'single', title: 'Single Tier', description: 'Classic and elegant for any party.', image: '/images/salted-caramel.png', priceMultiplier: 1 },
  { id: 'two-tier', title: 'Two Tier', description: 'Make a statement with a stacked design.', image: '/images/journey-4.png', priceMultiplier: 1.8 },
  { id: 'three-tier', title: 'Three Tier', description: 'A showstopper for large gatherings.', image: '/images/journey-3.png', priceMultiplier: 2.5 },
  { id: 'cupcake-tower', title: 'Cupcake Tower', description: 'Easy to share, perfectly matching.', image: '/images/celestial.png', priceMultiplier: 1.2 },
];

export const FLAVOR_OPTIONS: FlavorOption[] = [
  { id: 'chocolate', title: 'Chocolate', isPremium: false, premiumSurcharge: 0 },
  { id: 'vanilla', title: 'Vanilla', isPremium: false, premiumSurcharge: 0 },
  { id: 'red-velvet', title: 'Red Velvet', isPremium: false, premiumSurcharge: 0 },
  { id: 'pineapple', title: 'Pineapple', isPremium: false, premiumSurcharge: 0 },
  { id: 'lotus', title: 'Lotus Biscoff', isPremium: true, premiumSurcharge: 5 },
  { id: 'ferrero', title: 'Ferrero Rocher', isPremium: true, premiumSurcharge: 8 },
  { id: 'nutella', title: 'Nutella', isPremium: true, premiumSurcharge: 5 },
];

export const FROSTING_OPTIONS = ['Buttercream', 'Fondant', 'Whipped Cream', 'Ganache'];
export const DECORATION_OPTIONS = ['Sprinkles', 'Chocolates', 'Fruits', 'Macarons', 'Flowers', 'Edible Toppers'];

export const SIZE_OPTIONS: SizeOption[] = [
  { id: '1lb', title: '1 Pound', servings: 'Serves 4-6 people', basePrice: 20 },
  { id: '2lb', title: '2 Pound', servings: 'Serves 8-10 people', basePrice: 35 },
  { id: '3lb', title: '3 Pound', servings: 'Serves 12-15 people', basePrice: 50 },
  { id: '5lb', title: '5 Pound', servings: 'Serves 20-25 people', basePrice: 80 },
];

export const ADDONS_OPTIONS: AddOnOption[] = [
  { id: 'candles', title: 'Premium Birthday Candles', price: 3, image: '/images/birthday-cake.png' },
  { id: 'topper', title: 'Custom Cake Topper', price: 8, image: '/images/journey-1.png' },
  { id: 'card', title: 'Greeting Card', price: 2, image: '/images/journey-2.png' },
  { id: 'balloons', title: 'Party Balloons (Set of 3)', price: 5, image: '/images/daily-bakes.png' },
];
