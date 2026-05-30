# Aethel — React E-Commerce Application

A modern, responsive e-commerce web application built with React.js. Designed with a clean, minimal aesthetic and powered by the Fake Store API for real product and authentication data.

---

## ✨ Features

### Core
- 🛍️ **Product Listing** — responsive grid with real data from Fake Store API
- 🔍 **Search & Filter** — live search by title/description, category filter chips, and sort by price/rating
- 📦 **Product Detail Page** — image, rating stars, size selector (clothing only), quantity stepper
- 🛒 **Cart Page** — add/remove items, quantity controls, per-item subtotal
- 💰 **Order Summary** — dynamic subtotal, shipping calculation, order total
- 🚚 **Free Shipping Nudge** — animated progress bar showing how close the user is to free shipping (unlocks at $150)
- 🔐 **Authentication** — login/signup flow with real JWT from Fake Store API, persisted in localStorage
- 🔒 **Protected Routes** — cart is accessible only when logged in, redirects back after auth
- 📱 **Fully Responsive** — mobile-first design, tested across screen sizes

### UX Details
- ⚡ Skeleton loading states on product grid and detail page
- 🔔 Toast notifications on add to cart (with product name)
- 🏷️ Product badges — Top Rated, Popular based on rating
- 🧭 Smooth scroll to top on every route change
- 🙈 404 page for unknown routes
- ✅ Add to Cart button turns green briefly on click

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite |
| Routing | React Router v6 |
| State Management | Context API |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui |
| Icons | Lucide React |
| API | Fake Store API |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── ui/                   # shadcn auto-generated components
│   ├── Footer.jsx            # Site footer with trust bar and links
│   ├── Navbar.jsx            # Sticky navbar with search, auth, cart
│   ├── ProductCard.jsx       # Product grid card with quick add
│   ├── ProductCardSkeleton.jsx  # Loading placeholder for product card
│   ├── ProtectedRoute.jsx    # Route guard for authenticated pages
│   └── ScrollToTop.jsx       # Scroll reset on route change
├── context/
│   ├── CartContext.jsx       # Global cart state — add, remove, update, totals
│   └── AuthContext.jsx       # Global auth state — login, signup, logout, JWT
├── hooks/
│   └── useFetch.js           # Generic data fetching hook with loading/error states
├── pages/
│   ├── Home.jsx              # Product listing with search, filter, sort, hero banner
│   ├── ProductDetail.jsx     # Single product view with size selector and cart action
│   ├── Cart.jsx              # Cart items, quantity controls, order summary
│   ├── Login.jsx             # Login/Signup form with JWT auth
│   └── NotFound.jsx          # 404 fallback page
└── main.jsx                  # App entry — providers, router, toaster
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Hrishik03/Aethel_e-commerce_app.git

# Navigate into the project
cd e-com-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

---

## 🔐 Demo Credentials

The app uses the [Fake Store API](https://fakestoreapi.com) for authentication which returns a real JWT token.

```
Username : mor_2314
Password : 83r5^_
```

> You can also use the Signup flow. New accounts are registered via the API — since Fake Store API does not persist new users, the app auto-authenticates using demo credentials while preserving your entered name and username throughout the UI.

---

## 🗺️ Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home — product listing | ❌ |
| `/product/:id` | Product Detail | ❌ |
| `/cart` | Cart | ✅ |
| `/login` | Login / Signup | ❌ |
| `*` | 404 Not Found | ❌ |

---

## 🏗️ Architecture Decisions

**Context API over Redux** — The app's state (cart + auth) is contained and doesn't require the overhead of Redux. Context with `useMemo` for derived values (totals, counts) keeps things performant and readable.

**useFetch custom hook** — Centralizes loading/error/data state for all API calls, avoiding repetitive boilerplate across pages.

**JWT in localStorage** — Mirrors real-world auth patterns. Token persists across page refreshes; logout clears both token and user from storage.

**Immutable cart updates** — All cart state updates use `.map()` and spread operators to return new arrays/objects, avoiding mutation bugs (especially important with React StrictMode's double-invocation in development).

---

## 📄 License

This project was built as part of a frontend developer assignment. Feel free to use it as a reference.