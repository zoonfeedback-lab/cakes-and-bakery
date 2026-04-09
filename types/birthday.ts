export type BirthdayStep = 
  | 'theme' 
  | 'type' 
  | 'flavor' 
  | 'design' 
  | 'personalize' 
  | 'size' 
  | 'addons' 
  | 'preview' 
  | 'delivery';

export interface ThemeOption {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number;
}

export interface CakeTypeOption {
  id: string;
  title: string;
  description: string;
  image: string;
  priceMultiplier: number;
}

export interface FlavorOption {
  id: string;
  title: string;
  isPremium: boolean;
  premiumSurcharge: number;
}

export interface SizeOption {
  id: string;
  title: string;
  servings: string;
  basePrice: number;
}

export interface AddOnOption {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface BirthdayState {
  currentStepIndex: number;
  theme: ThemeOption | null;
  cakeType: CakeTypeOption | null;
  flavor: FlavorOption | null;
  frosting: string;
  decorations: string[];
  personalization: {
    name: string;
    age: string;
    message: string;
    photoUrl?: string;
  };
  size: SizeOption | null;
  addOns: Record<string, number>; // id -> quantity
  delivery: {
    date: string;
    time: string;
    address: string;
    instructions: string;
  };
}
