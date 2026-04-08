# Development Guide & Best Practices

## 🎯 Code Quality Standards

This project maintains production-grade code quality with the following standards:

### TypeScript Configuration

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true
}
```

### Component Pattern

**Good ✅**

```tsx
type ButtonProps = Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}>;

export const Button = ({
  children,
  onClick,
  variant = "primary",
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`btn-${variant}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
```

**Avoid ❌**

```tsx
// Missing types
export const Button = ({ children, onClick }) => {
  // No readonly, no proper typing
  return <button onClick={onClick}>{children}</button>;
};
```

## 📝 File Naming Conventions

- **Components**: PascalCase with .tsx
  - `Header.tsx`
  - `HeroSection.tsx`
  - `ProductCard.tsx`

- **Utilities**: camelCase with .ts
  - `formatPrice.ts`
  - `validateEmail.ts`

- **Types**: lowercase with .ts
  - `types/index.ts`
  - `types/api.ts`

- **Constants**: UPPER_SNAKE_CASE
  - `FEATURED_CAKES`
  - `API_BASE_URL`

## 🎨 Component Guidelines

### 1. Single Responsibility

Each component should have ONE clear purpose.

```tsx
// ✅ Good - Single responsibility
export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  return (
    <article>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </article>
  );
};

// ❌ Bad - Multiple responsibilities
export const Dashboard = (): JSX.Element => {
  return (
    <>
      <Header />
      <Gallery />
      <Cart />
      <Checkout />
      <Payment />
      <Footer />
    </>
  );
};
```

### 2. Prop Drilling Prevention

Use context for widely-needed data:

```tsx
// ✅ Good - Context API
export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

// ❌ Bad - Prop drilling
<Header theme={theme} />
  <Hero theme={theme} />
    <Card theme={theme} />
      <Button theme={theme} />
```

### 3. Accessibility First

Always include ARIA attributes and semantic HTML:

```tsx
// ✅ Good
<button
  aria-label="Close menu"
  onClick={handleClose}
>
  ✕
</button>

// ❌ Bad
<button onClick={handleClose}>✕</button>
```

### 4. Error Boundaries

Implement error boundaries for production:

```tsx
import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

## 🎯 CSS/Tailwind Standards

### Utility Class Organization

Follow this order in classes:

1. Layout (flex, grid, display)
2. Sizing (w, h, p, m)
3. Typography (text, font, leading)
4. Colors (bg, text, border)
5. Effects (shadow, opacity, transform)
6. Responsive prefixes (md:, lg:)
7. State modifiers (hover:, focus:)

```tsx
// ✅ Good
<button className="inline-flex items-center justify-center px-4 py-2 bg-amber-900 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors">
  Click me
</button>

// ❌ Bad - No organization
<button className="hover:bg-amber-800 text-white rounded-lg px-4 bg-amber-900 font-medium py-2 transition-colors inline-flex items-center justify-center">
  Click me
</button>
```

### Dark Mode Support

Always consider dark mode compatibility:

```tsx
// ✅ Good
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>;

// Enable dark mode in tailwind.config.ts
export default {
  darkMode: "class",
  // ...
};
```

## 🔄 State Management Patterns

### Local State (Preferred for most cases)

```tsx
"use client";

export const Counter = (): JSX.Element => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Server Components (When no interactivity needed)

```tsx
// No 'use client' - this is a Server Component by default
export const ProductList = async (): Promise<JSX.Element> => {
  const products = await fetchProducts();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};
```

## 🧪 Testing Pattern

### Unit Test Example

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports variant prop", () => {
    const { container } = render(<Button variant="secondary">Click</Button>);
    expect(container.querySelector(".btn-secondary")).toBeInTheDocument();
  });
});
```

## 🔒 Security Best Practices

### 1. Sanitize User Input

```tsx
// ✅ Good - React escapes by default
<div>{userContent}</div>

// ❌ Dangerous - Only if content is trusted
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### 2. Environment Variables

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_API_KEY=your-secret-key

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Safe in browser
const apiKey = process.env.SECRET_API_KEY; // Server-only
```

### 3. CSRF Protection

Implement CSRF tokens for form submissions (when adding backend).

## 🚀 Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

// ✅ Good
<Image
  src="/cake.jpg"
  alt="Chocolate cake"
  width={300}
  height={300}
  loading="lazy"
  placeholder="blur"
/>

// ❌ Slower
<img src="/cake.jpg" alt="Chocolate cake" />
```

### Code Splitting

```tsx
import dynamic from "next/dynamic";

// Load component only when needed
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

### Memoization

```tsx
import { memo } from "react";

// ✅ Prevent unnecessary re-renders
export const ProductCard = memo(({ product }: Props): JSX.Element => {
  return <div>{product.name}</div>;
});
```

## 🔍 Debugging Tips

### React DevTools

- Use React DevTools browser extension
- Check component render counts
- Inspect props and state

### Performance Profiling

```tsx
import { Profiler } from "react";

<Profiler id="section" onRender={onRenderCallback}>
  <Component />
</Profiler>;
```

### Console Debugging

```typescript
// Useful console tricks
console.table(data); // Display arrays/objects as tables
console.groupCollapsed("Group"); // Collapsible logs
console.assert(condition, "Message"); // Conditional logging
```

## 📚 Additional Resources

- [React Best Practices](https://react.dev/learn)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs)
- [Web Accessibility](https://www.w3.org/WAI/ARIA/apg/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Maintain these standards for a professional, maintainable codebase.**
