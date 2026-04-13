# 🚀 Quick Start Guide

## Installation & Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### 3. Open in Browser

The landing page should display with all sections:

- Header with navigation
- Hero section with CTAs
- Featured categories
- Gallery showcase
- Journey process
- Testimonials
- Call-to-action
- Footer

## Project Structure Quick Reference

```
components/          → Reusable React components
  ├── Header.tsx    → Navigation
  ├── HeroSection.tsx
  ├── FeaturedCategories.tsx
  ├── GallerySection.tsx
  ├── JourneySection.tsx
  ├── TestimonialsSection.tsx
  ├── CTASection.tsx
  └── Footer.tsx

types/               → TypeScript definitions
constants/           → Data & configuration
app/                 → Next.js pages & layout
```

## Common Tasks

### Add a New Component

1. Create file in `components/`
2. Define TypeScript types
3. Export from `components/index.ts`
4. Import in `page.tsx`

### Update Styling

- Tailwind classes in component JSX
- Edit `tailwind.config.ts` for theme
- Check `app/globals.css` for global styles

### Add New Data

- Update `constants/index.ts` with new data
- Define types in `types/index.ts`
- Pass to component via props

### Admin Dashboard Access

To access the admin panel at `/admin`, you must configure environment variables:



3. Restart the development server for changes to take effect.

### Run Linting


```bash
npm run lint
```

### Build for Production

```bash
npm run build
npm start
```

## Key Files to Know

| File                 | Purpose                             |
| -------------------- | ----------------------------------- |
| `app/page.tsx`       | Home page (orchestrates components) |
| `app/layout.tsx`     | Root layout with metadata           |
| `types/index.ts`     | Type definitions                    |
| `constants/index.ts` | Mock data                           |
| `tailwind.config.ts` | Design system config                |

## Customization

### Change Brand Colors

Edit `tailwind.config.ts` colors section:

```typescript
colors: {
  primary: 'amber-900',  // Change primary color
  accent: 'rose-600',    // Change accent color
}
```

### Update Company Info

Edit `constants/index.ts`:

```typescript
export const COMPANY_NAME = "Your Bakery Name";
export const COMPANY_EMAIL = "hello@example.com";
```

### Modify Content

Edit component content directly or pass via props using data from `constants/index.ts`

## Troubleshooting

### Port 3000 Already in Use

```bash
PORT=3001 npm run dev
```

### Build Errors

```bash
rm -r .next node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors

Check `tsconfig.json` settings or file paths

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t cakes-bakes .
docker run -p 3000:3000 cakes-bakes
```

### Traditional Server

```bash
npm run build
npm start
```

## Performance Tips

✅ Use Next.js Image component for images
✅ Enable compression in deployment
✅ Monitor Core Web Vitals
✅ Use CDN for static assets
✅ Implement caching strategies

## Resources

- 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture
- 📖 [DEVELOPMENT.md](./DEVELOPMENT.md) - Best practices
- 📖 [README-COMPLETION.md](./README-COMPLETION.md) - Project summary

---

**Ready to start? Run `npm install && npm run dev` and open http://localhost:3000**
