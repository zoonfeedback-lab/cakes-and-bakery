export const SITE_NAME = 'Central Cakes';

export const SITE_DESCRIPTION =
    'Craft your perfect celebration with our premium custom cakes. Artisan quality, delicious taste, and unforgettable moments since 1995.';

export const SITE_URL = 'https://centralcakes.com';

export const BRAND_THEME = {
    colors: {
        surface: '#F8F5F1',
        surfaceMuted: '#F0ECE5',
        text: '#3A3536',
        textMuted: '#6F6570',
        textSoft: '#7B6A69',
        primary: '#6D5060',
        primaryLight: '#8A6579',
        primaryGhost: '#E8DED3',
        blush: '#DE99A6',
        gold: '#D8C1A0',
        cream: '#E9DFD1',
    },
    fonts: {
        sans: 'var(--font-inter)',
        serif: 'var(--font-playfair)',
        script: 'var(--font-great-vibes)',
    },
} as const;

export const PRIMARY_NAV_ITEMS = [
    { href: '#cakes', label: 'Cakes' },
    { href: '#bakes', label: 'Bakes' },
    { href: '#birthdays', label: 'Birthdays' },
] as const;
