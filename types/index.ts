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
