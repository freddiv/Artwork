# 🪶 Art Feathers and More

An elegant e-commerce platform for hand-painted feather artwork, built with modern web technologies. Browse unique feather art pieces, add them to your cart, and purchase original artwork by Kathryn.

## ✨ Features

- **🎨 Artwork Gallery**: Browse a curated collection of hand-painted feather artwork
- **🛒 Shopping Cart**: Add items to cart with persistent localStorage storage
- **🔐 Selective Authentication**: Public browsing, secure checkout experience
- **👤 User Profiles**: Account management with name and role information
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🌟 Artistic Theme**: Feather-inspired gradients, backgrounds, and styling

## 🛠️ Tech Stack

- **Frontend**: Nuxt 4 (Vue 3 + TypeScript)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS 4 + Nuxt UI
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nuxt-ai-chat
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**
Copy `.env.example` to `.env` and configure your Supabase credentials:
```bash
cp .env.example .env
```

Required environment variables:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**
Set up your Supabase database with the required tables (see `.github/copilot-instructions.md` for schema details).

## 🏃‍♂️ Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## 🏗️ Production

Build the application for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

## 📁 Project Structure

```
app/
├── assets/css/          # Global styles and Tailwind CSS
├── components/          # Vue components (FeatherHeader, etc.)
├── composables/         # Vue composables (useAuth, useCart, useOrder)
├── data/               # Static artwork data (JSON)
├── layouts/            # Page layouts (sidenav)
├── pages/              # File-based routing (gallery, cart, checkout)
├── types/              # TypeScript type definitions
public/
├── images/             # Static artwork images
server/
├── api/               # Server-side API routes
```

## 🔐 Authentication Flow

- **Public Access**: Home, gallery, cart, and product viewing
- **Protected Routes**: Checkout requires authentication
- **User Registration**: Collects name during signup process
- **Session Management**: Handled via Supabase Auth

## 🗄️ Database Schema

Core tables:
- `users` - User profiles with name and admin roles
- `orders` - Order management with status tracking
- `order_items` - Individual order line items
- `artwork_stock` - Inventory management

## 🎨 Design System

- **Color Palette**: Purple, blue, and pink gradients with nature-inspired tones
- **Typography**: Comic Sans MS for artistic feel
- **Components**: Feather-themed cards, buttons, and backgrounds
- **Layout**: Single responsive layout with artistic header and footer

## 📚 Documentation

For detailed development guidelines, API patterns, and deployment instructions, see [`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## 🚢 Deployment

### Vercel Deployment
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🧪 Testing

Run tests with Vitest:
```bash
pnpm test        # Run tests
pnpm test:ui     # Run tests with UI
pnpm test:run    # Run tests once
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Art Feathers and More** - Where Art Takes Flight 🪶
