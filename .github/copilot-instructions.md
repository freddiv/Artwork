# Copilot Instructions - Art Feathers E-commerce

## Project Overview
This is an **art feather e-commerce platform** built with **Nuxt 4** and **Supabase**. The codebase features an artwork gallery and shopping cart system for selling hand-painted feather artwork.

## Architecture & Key Patterns

### Technology Stack
- **Nuxt 4** with Vue 3 and TypeScript
- **Supabase** for authentication and database (PostgreSQL)
- **@nuxtjs/supabase** module for seamless integration
- **Nuxt UI** for component library and design system
- **Tailwind CSS 4** for styling
- **pnpm** as the package manager

### Project Structure
- **`app/`** - Main application directory (Nuxt 4 pattern)
- **`app/composables/`** - Vue composables for shared logic
- **`app/types/`** - TypeScript type definitions
- **`server/api/`** - Nuxt server API routes
- **`app/layouts/`** - Page layouts (sidenav)

### Data Patterns

#### Composables Pattern
Follow the established composable pattern in [`app/composables/`](app/composables/):
- **`useAuth()`** - Supabase authentication wrapper
- **`useCart()`** - Shopping cart with localStorage persistence
- **`useOrder()`** - Order management

#### State Management
- Use **`useState()`** for reactive global state
- Persist cart data in **localStorage** with client-side checks: `import.meta.client`
- Authentication state managed through **Supabase client**

#### Type Safety
- Database types auto-generated in [`app/types/database.types.ts`](app/types/database.types.ts)
- Custom types in [`app/types.ts`](app/types.ts) for application interfaces
- Follow established TypeScript patterns for type definitions

### API & Data Handling

#### Server API Pattern
- API routes in [`server/api/`](server/api/) return JSON directly
- Use **`defineLazyEventHandler()`** for optimized API handlers
- See [`server/api/artwork.ts`](server/api/artwork.ts) for the established pattern

#### Data Sources
- **Static data**: JSON files in [`app/data/`](app/data/)
- **Dynamic data**: Supabase tables (artwork_stock, order_items, orders, etc.)
- API endpoints return structured objects with `id`, `title`, `image`, `price`, `description`

### UI & Styling Conventions

#### Component Library
- Use **Nuxt UI** components (`UButton`, `UApp`, etc.)
- Follow established button styling pattern:
  ```vue
  <UButton class="focus-visible:outline-4 focus-visible:outline-yellow-400 focus-visible:outline-offset-2 focus-visible:bg-blue-700 hover:bg-blue-600 transition-colors">
  ```

#### Layout System
- **`sidenav.vue`** for all pages with navigation sidebar
- Set layout via `definePageMeta({ layout: "sidenav" })`

#### CSS Patterns
- Use **Tailwind CSS 4** classes
- Custom font: `font-comic` (defined in CSS)
- Color scheme: Gray backgrounds (`bg-gray-100`, `bg-gray-800`) with white text
- Images stored in [`public/images/`](public/images/) directory

### Development Workflow

#### Environment Setup
- Copy `.env.example` to `.env` and configure Supabase credentials
- Install with: **`pnpm install`**
- Dev server: **`pnpm dev`** (runs on localhost:3000)
- Build: **`pnpm build`**

#### Code Quality
- **ESLint** configured with Nuxt defaults + custom rules (single quotes, 2-space indent)
- **Husky** for git hooks
- Lint commands: `pnpm lint` / `pnpm lint:fix`

#### Page Meta Pattern
Always include `definePageMeta()` with:
```vue
<script setup lang="ts">
definePageMeta({
  layout: "sidenav", // or "default"
  title: "Page Title
  meta: [{ name: "description", content: "Page description" }]
});
</script>
```

### Key Integration Points

#### Supabase Integration
- Auth managed via **`@nuxtjs/supabase`** module
- Use `useSupabaseClient()` in composables
- Database types in [`app/types/database.types.ts`](app/types/database.types.ts)
- Auth methods: `signInWithPassword()`, `signUp()`, `signOut()`

#### Authentication Pattern
- **Public Access**: Gallery, cart, and product viewing require no authentication
- **Protected Pages**: Only checkout requires authentication
- **Auth Middleware**: Use `definePageMeta({ middleware: 'auth' })` for protected pages
- **Login Flow**: Redirect to `/login` when authentication required
- **Public Routes Configuration**: Set via `supabase.redirectOptions.exclude` in `nuxt.config.ts`

#### Authentication Configuration
```typescript
// nuxt.config.ts
supabase: {
  redirectOptions: {
    login: '/login',
    callback: '/confirm', 
    exclude: ['/', '/gallery', '/gallery/**', '/artwork/**', '/cart', '/order-confirmation']
  }
}
```

#### Cart & E-commerce Logic
- Cart state persisted in localStorage
- Follow the pattern in [`useCart()`](app/composables/useCart.ts): add/remove/clear methods
- Price formatting and qty management established

### Deployment & Production

#### Vercel Deployment
- **Framework**: Auto-detected as Nuxt.js
- **Build Command**: `pnpm build` (or use default)
- **Output Directory**: `.output/public` (Nuxt 4 default)
- **Install Command**: `pnpm install`

**Environment Variables for Vercel:**
```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only
```

**Vercel Configuration** (optional `vercel.json`):
```json
{
  "functions": {
    "server/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Testing Strategy

#### Vitest Setup
Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  },
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^15.0.0"
  }
}
```

**Vitest Config** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url))
    }
  }
})
```

#### Testing Patterns
- **Composables**: Test `useCart()`, `useAuth()` logic with mocked Supabase
- **Components**: Test gallery item rendering, cart interactions
- **API Routes**: Test artwork endpoint responses
- **Integration**: Test cart persistence with localStorage

## Supabase Database Schema

### Core Tables Structure

#### `users` - User Management
```typescript
{
  id: string (UUID, Primary Key)
  email: string (Required)
  name: string | null
  is_admin: boolean | null (Default: false)
  created_at: string | null (Timestamp)
}
```

#### `orders` - Order Management
```typescript
{
  id: string (UUID, Primary Key, Auto-generated)
  user_id: string | null (FK → users.id)
  total: number | null (Order total amount)
  status: string | null (e.g., "pending", "completed", "cancelled")
  created_at: string | null (Timestamp)
}
// Foreign Key: orders.user_id → users.id
```

#### `order_items` - Order Line Items
```typescript
{
  id: string (UUID, Primary Key, Auto-generated)
  order_id: string | null (FK → orders.id)
  artwork_id: number | null (References artwork from static data)
  title: string | null (Artwork title snapshot)
  price: number | null (Price at time of order)
  qty: number | null (Quantity ordered)
}
// Foreign Key: order_items.order_id → orders.id
```

#### `artwork_stock` - Inventory Management
```typescript
{
  artwork_id: number (Primary Key, matches static artwork data)
  stock: number | null (Available quantity, null = unlimited)
}
```

#### `tasks` - Task Management (Development/Admin)
```typescript
{
  id: number (Primary Key, Auto-increment)
  user: string (Required - user identifier)
  title: string | null (Task description)
  completed: boolean | null (Default: false)
  created_at: string | null (Timestamp)
}
```

### Database Integration Patterns

#### Order Creation Flow
```typescript
// 1. Create order record
const { data: order } = await supabase
  .from("orders")
  .insert({ user_id: user.id, total, status: "pending" })
  .select().single()

// 2. Create order items
const items = cart.map(item => ({
  order_id: order.id,
  artwork_id: item.id,
  title: item.title,
  price: item.price,
  qty: item.qty
}))
await supabase.from("order_items").insert(items)
```

#### RLS (Row Level Security)
- Enable RLS on all tables
- Users can only access their own orders/order_items
- Admins (`is_admin: true`) have full access
- Public read access for artwork_stock

#### Type Usage
```typescript
import type { Tables } from '~/types/database.types'

type Order = Tables<'orders'>
type OrderItem = Tables<'order_items'>
type User = Tables<'users'>
```