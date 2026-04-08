export interface CakeProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

export interface Testimonial {
    id: string;
    author: string;
    content: string;
    rating: number;
    avatar?: string;
}

export interface JourneyStep {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface BakeProduct extends CakeProduct {
    priceLabel?: string;
    imageAlt?: string;
    boxOptions?: string[];
    tags?: string[];
    occasions?: string[];
}

export interface BakeCategory {
    id: string;
    title: string;
    description: string;
    items: BakeProduct[];
}

export interface OptionGroup {
    id: string;
    title: string;
    options: string[];
}

export interface BoxSelection {
    id: string;
    quantity: string;
    item: string;
    note: string;
}

export interface InfoCard {
    id: string;
    title: string;
    description: string;
}

export interface FilterPill {
    id: string;
    label: string;
    active?: boolean;
}

export interface FilterSection {
    id: string;
    title: string;
    options: string[];
    style?: 'radio' | 'pill';
}
