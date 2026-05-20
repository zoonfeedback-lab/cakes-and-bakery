# 🎂 Arzish Cakes & Bakery Platform

> A full-stack artisan bakery platform for managing and ordering premium cakes and bakes.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · PostgreSQL · Cloudinary  
**Currency:** PKR (Pakistani Rupee)

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [System Architecture](#-system-architecture)
- [Route Map](#-route-map)
- [Admin Panel](#-admin-panel--complete-feature-breakdown)
- [Customer Features](#-customer-facing-features)
- [Admin vs Customer Comparison](#-admin-vs-customer-feature-comparison)
- [Data Types](#-data-type-definitions)
- [Known Limitations](#️-current-limitations--areas-for-growth)
- [Deploy](#-deploy-on-vercel)

---

## 🚀 Getting Started

First, set up your environment variables (see below), then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the customer site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Admin credentials
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password

# PostgreSQL connection
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Cloudinary (for product image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🗺️ Route Map

| Route | Who Uses It | Purpose |
|---|---|---|
| `/` | Customer | Home / Landing page |
| `/cakes` | Customer | Cake product catalog |
| `/bakes` | Customer | Bakes product catalog |
| `/birthday` | Customer | Birthday cake interactive customizer |
| `/custom` | Customer | Custom order studio |
| `/custom/review` | Customer | Order review & checkout |
| `/admin/login` | Admin | Admin login page |
| `/admin` | Admin | Admin dashboard & product management |

---

## 🔐 Admin Panel — Complete Feature Breakdown

### 1. Authentication System

The admin area is **fully protected** with a multi-layer security system:

- **Middleware Guard** (`middleware.ts`): Every request to `/admin/*` is intercepted. If no valid session cookie exists, the user is **automatically redirected** to `/admin/login`.
- **Cookie-based Session**: On successful login, an `httpOnly`, `secure` session cookie (`admin_session`) is set with a **7-day expiry**.
- **Server-side Credential Check**: Email and password are validated against `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables — credentials never leave the server.
- **Logout**: Instantly clears the session cookie and redirects to the login page.

```
Admin Access Flow:
  Visit /admin → Middleware checks cookie →
  ✅ Valid: Show Dashboard
  ❌ Invalid: Redirect to /admin/login → Enter credentials → Set cookie → /admin
```

---

### 2. Admin Layout

The admin interface is a **persistent shell layout** shared across all admin pages.

#### 🔲 Admin Sidebar
A collapsible, responsive sidebar with **3 navigation groups**:

| Group | Links |
|---|---|
| **Core Management** | 📊 Dashboard, 🎂 Cakes, 🧁 Bakes |
| **Business** | 🛍️ Orders, 👥 Customers, 📈 Analytics, ✨ Custom Orders |
| **System** | ⚙️ Settings |

**Smart Features:**
- Uses **IntersectionObserver API** to automatically highlight the active link as the admin scrolls between sections.
- On mobile, slides in as a **drawer** with a dark backdrop. Closes on outside tap or link click.
- Displays an **"Enterprise Plan — All Features Unlocked"** badge at the bottom.

#### 🔲 Admin Header
A sticky top bar (glassmorphism `backdrop-blur`) featuring:

- **Hamburger Button** (mobile only) to open the sidebar drawer.
- **Global Search Bar** — searches across products in real-time. Press `/` anywhere on the page to instantly focus it.
- **Notification Bell** — animated pulsing red dot.
- **Admin Profile** — shows name & role, with a hover-triggered **Logout** button.

---

### 3. Admin Dashboard

The main dashboard page loads **live data from the database**.

#### 📊 Stat Cards (4 Cards)

| Stat Card | Value Source | Example Trend |
|---|---|---|
| 📦 Active Products | `cakes.length + bakes.length` (live DB) | `+12% vs last week` |
| 🎂 Artisan Cakes | `cakes.length` (live DB) | `+3 new today` |
| 🧁 Fresh Bakes | `bakes.length` (live DB) | `-1 vs yesterday` |
| 🏷️ Total Categories | Unique category count (live DB) | `No change` |

#### 📈 Analytics Widgets

| Widget | Type |
|---|---|
| Orders This Week | Bar Chart (Mon–Sun) |
| Popular Flavors | Donut Chart (Signature 45%, Chocolate 35%, Fruit 20%) |

> **Note:** Analytics widgets currently display mock/hardcoded data.

---

### 4. Product Management

Two product grids render for **Cakes** and **Bakes** respectively, each with:

- **Live Search** — filters by name, description, or category instantly.
- **Category Pills** — dynamically generated from actual product data.
- **Add Product** button → opens the form modal.
- **Edit** button on each card → opens the pre-filled form modal.
- **Delete** button → instantly removes the product and revalidates all pages.

---

### 5. Product Form Modal

A full-screen centered modal for creating or editing products.

**Fields for Both Cakes & Bakes:**

| Field | Notes |
|---|---|
| Image | Click-to-upload. Previews instantly. Uploads to **Cloudinary CDN** on save. |
| Product Name | Required |
| Category | Dropdown with preset options + "Custom Option..." to free-type |
| Price (PKR) | Required, numeric |
| Description | Required |
| Image Alt Text | Accessibility description |
| Tags | Best Seller, New, Classic, Gluten-Free, etc. |
| Occasions | Birthday, Anniversary, Wedding, Baby Shower, etc. |

**Additional Fields for Cakes:** Size Options, Dimensions  
**Additional Fields for Bakes:** Box Options (Box of 6, 8, 12, 16)

**Save Action Flow:**
1. Verifies admin session server-side.
2. Parses & validates all form fields.
3. Uploads image to **Cloudinary** if a new file was attached.
4. Upserts the product into **PostgreSQL** (`bakery_catalog` table).
5. Revalidates all affected pages: `/admin`, `/cakes`, `/bakes`, `/custom`, `/custom/review`.

---

### 6. Database & Backend

- **PostgreSQL** via `pg` driver. Auto-creates the `bakery_catalog` table on first run.
- Schema: `(kind TEXT, item_id TEXT, payload JSONB, updated_at TIMESTAMPTZ)` with `PRIMARY KEY (kind, item_id)`.
- If the table is empty, it **seeds itself** from hardcoded constants.
- **Cloudinary** handles all product image uploads, stored under `cakes-and-bakes/{kind}/`.
- All mutations are Next.js **Server Actions** — every action verifies the admin session before executing.

---

## 🛍️ Customer-Facing Features

### 1. Home Page (`/`)

| Section | Description |
|---|---|
| **Hero** | Full-bleed background with headline *"Crafting Sweet Work — Moments for Every Celebration"* and a primary CTA to the custom studio |
| **Featured Categories** | Category tiles linking to catalog pages |
| **Gallery Section** | Product photography grid |
| **Journey Section** | How-it-works steps |
| **Testimonials** | Customer review cards with 5-star ratings |
| **CTA Section** | Final call-to-action banner |

---

### 2. Cakes Catalog (`/cakes`)

A **fully filterable, sortable product catalog**:

- **Price Range Slider** — real-time max price cap filter.
- **Size Filter** — filter by 1 Pound, 2 Pounds, etc.
- **Occasion Filter** — multi-select (Birthday, Anniversary, Wedding, etc.).
- **Sort Options** — Featured, Price Low to High, Newest.
- **Category Pills** — quick filter by category at the top.
- **Lazy Loading** — shows 6 products initially, loads 3 more on "Load More".
- Uses `useDeferredValue` for smooth, non-blocking UI during filtering.

---

### 3. Bakes Catalog (`/bakes`)

Similar to the cakes catalog with bakes-specific features:
- Box Options filter (Box of 6, 8, 12, 16)
- **BuildBox Section** — UI to build a custom assortment box
- Links to the custom order studio

---

### 4. Birthday Cake Customizer (`/birthday`) ⭐

An **interactive, real-time birthday cake design tool** — the flagship customer feature.

**What customers can configure:**

| Step | Options |
|---|---|
| Cake Type | Single Tier, Double Tier, Three Tier |
| Cake Size | 1lb (4-6 pax) · 2lb (8-10) · 3lb (12-15) · 5lb (20-25) |
| Flavor | Chocolate · Red Velvet · Vanilla · Butterscotch · Black Forest · Custom |
| Frosting | Whipped Cream · Buttercream · Fondant · Ganache |
| Decorations | Fruits, Sprinkles, Edible Toppers, Chocolate Drip, Macarons, Flowers, Candles |
| Theme | Cartoon Paradise (+PKR 15) · Princess (+18) · Superhero (+15) · Minimal (Free) · Kids (+12) · Floral (+20) |
| Personalization | Name on Cake · Age · Custom Message |
| Colors | Primary color + Secondary color picker |
| Add-ons | Candles, Cake Topper, Greeting Card, Cake Knife, Balloons (with `+/-` quantity) |

**Live Preview** — a dynamic SVG/CSS cake illustration updates in real-time as options change.

**Live Pricing Engine:**
```
Total = (size.price × tierMultiplier) + (decorations × PKR 3) + theme.price + add-ons
```

**Sticky Bottom CTA Bar:** Save Design · Add to Cart · Buy Now

---

### 5. Custom Order Studio (`/custom`) ⭐

A **multi-mode custom order form** that adapts based on URL query parameters:

| Mode | URL | Form |
|---|---|---|
| Standard Cake | `?cake={id}` | Sponge, Filling, Finish, Message |
| Bespoke Consultation | `?type=bespoke` | Occasion, Tiers, Palette, Notes |
| Build-a-Box | `?type=box` | Box size, assortment, packaging |
| Bakes | `?bake={id}` | Flavor, quantity, box type, add-ons |

---

### 6. Order Review Page (`/custom/review`)

The final step before checkout:

- **Left:** Full product image + calligraphy message display
- **Right:** 4 selection summary cards + itemized pricing

**Pricing breakdown:**

| Order Type | Subtotal | Extra Fee | Delivery |
|---|---|---|---|
| Standard Cake | Product price | PKR 3,500 calligraphy | PKR 1,200 |
| Bake | Product price | PKR 500 packaging | PKR 1,200 |
| Build-a-Box | PKR 2,800–8,400 | PKR 300 packaging | PKR 1,200 |
| Bespoke | PKR 20,000 retainer | Complimentary | Complimentary |

---

## 📊 Admin vs. Customer: Feature Comparison

| Feature | 👤 Customer | 🔐 Admin |
|---|---|---|
| Browse cakes & bakes | ✅ Full catalog with filters | ✅ Grid with search & category tabs |
| Filter by price/size/occasion | ✅ Sidebar filters | ✅ Category pills + global search |
| Add new products | ❌ | ✅ Full form with image upload |
| Edit existing products | ❌ | ✅ Pre-filled form modal |
| Delete products | ❌ | ✅ With instant page revalidation |
| See real-time stats | ❌ | ✅ Live stat cards from DB |
| Customize birthday cake | ✅ Full interactive builder | ❌ |
| Custom order studio | ✅ 4 different modes | ❌ |
| Review & checkout | ✅ Order summary + pricing | ❌ |
| Image upload to CDN | ❌ | ✅ Cloudinary integration |
| Authentication required | ❌ Public | ✅ Session cookie required |

---

## 🗃️ Data Type Definitions

```typescript
interface CakeProduct {
  id: string;
  name: string;
  category: string;       // e.g. "Signature Cake"
  price: number;          // In PKR
  image: string;          // Cloudinary URL or /images/ path
  description: string;
  sizeOptions?: string[]; // ["1 Pound", "2 Pounds", ...]
  occasions?: string[];   // ["Birthday", "Wedding", ...]
  tags?: string[];        // ["Best Seller", "New", ...]
  dimensions?: string;    // e.g. "2-Tier Cake"
  priceLabel?: string;
  imageAlt?: string;
}

// Bake extends CakeProduct, replacing sizeOptions with boxOptions
interface BakeProduct extends CakeProduct {
  boxOptions?: string[];  // ["Box of 6", "Box of 12", ...]
}
```

---

## ⚠️ Current Limitations / Areas for Growth

The following admin sidebar links exist in the UI but **do not have built-out pages yet:**

- 🛍️ **Orders** (`/admin/orders`)
- 👥 **Customers** (`/admin/customers`)
- 📈 **Analytics** (`/admin/analytics`)
- ✨ **Custom Orders** (`/admin/custom-orders`)
- ⚙️ **Settings** (`/admin/settings`)

The **analytics charts** in the admin dashboard display **mock/hardcoded data**, not real sales figures.

The **checkout buttons** (Buy Now, Add to Cart, Proceed to Checkout) are UI-only and not connected to a payment gateway.

---

## 🎨 Design System

| Token | Color | Usage |
|---|---|---|
| `primary` | `#967386` (dusty rose/mauve) | Buttons, active states |
| `brand-gold` | `#D4A853` | Accent gradients |
| `brand-border` | `#E8DED3` | Card borders, dividers |
| `text-soft` | `#9A7B8A` | Secondary text, labels |
| `foreground` | `#2D1C24` | Primary text |
| `surface` | `#F8F5F1` | Page background |

---

## 🚢 Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables in the Vercel dashboard.
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

*Built with ❤️ using Next.js, TypeScript, PostgreSQL & Cloudinary*
