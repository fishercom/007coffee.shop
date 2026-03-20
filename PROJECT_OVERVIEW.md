# 🕵️‍♂️ 007 COFFEE — Project Overview & Guidelines

Welcome to the **007 Coffee** repository. This document outlines the business vision, the technical architecture, design system guidelines, and the internal content structure for our elite coffee shop platform.

---

## 1. Business Vision
**007 Coffee** is a luxury, spy-themed coffee brand aimed at caffeine enthusiasts who appreciate premium roast quality, exclusivity, and a seamless, high-end digital experience. We don't just sell coffee—we deal in "intel" and "operatives." 

### Key Offerings:
*   **Elite Single-Origin Roasts:** Ethically sourced from top-tier estates globally.
*   **"Double-O" Delivery Subscriptions:** Recurring coffee deliveries for agents who never settle for ordinary.
*   **Geographic Briefings (Origins):** Educational dossiers breaking down flavor profiles and sourcing info.

---

## 2. Technology Stack

### 🚀 Frontend Architecture
*   **Framework:** Next.js (version 16.0+, Turbopack enabled)
*   **UI Library:** React.js
*   **Styling & Design System:** Tailwind CSS (Vanilla utilities)
*   **Component Strategy:** Reusable React components built with modern responsive practices.
*   **Payment Integration:** Stripe.js / Stripe Elements (pending API connection)

### ⚙️ Backend Architecture (WebAPI)
*   **Framework:** .NET Core / ASP.NET WebAPI
*   **Authentication:** ASP.NET Core Identity (JWT Tokens)
*   **Database:** Entity Framework Core (configured for multi-db compatibility: SQLite / PostgreSQL)
*   **Pattern:** CQRS logic utilizing MediatR

---

## 3. Design System & Aesthetics Guidelines
Our aesthetic relies on modern, premium UI trends (Glassmorphism, dark mode default, subtle micro-animations) to ensure the first impression is both stunning and sophisticated.

### 🎨 Color Palette (Defined in `tailwind.config.js`):
*   **Deep Obsidian** (`#0f0f11` and `#1a1a1d`) - The core background color.
*   **Liquid Gold** (`#d4af37` and `#f3e5ab`) - Used for active states, CTAs, highlights, and logos.
*   **Espresso Brown** (`#4b3621`) - Accent touches for warmth.
*   **Crisp White / Silver Text** (`#f4f4f5`, `#a1a1aa`) - High-contrast text for ultimate legibility.

### 🔤 Typography:
*   **Primary / UI:** `Inter` (Sans-serif) - Used for navigation, paragraphs, and descriptions.
*   **Headings / Display:** `Playfair Display` (Serif) - Used for main titles and dossiers to add an editorial, luxury spy feel.

### ✨ Visual Effects:
*   **Glassmorphism:** Navigation menus and overlay cards use heavily blurred translucency.
*   **Micro-animations:** Glow effects (`hover:shadow-gold`) and subtle translations (`hover:-translate-y-2`, `transition-transform duration-700`) apply to interactive elements.
*   **Imagery:** Background landscapes and coffee product images use Next.js `<Image>` with precise `object-contain` or `object-cover` styling to maintain proportions without squashing.

---

## 4. Platform Content Structure

Currently, the Next.js frontend is structured into the following operational zones:

### 📁 Pages (`/frontend/pages`)
*   `/` (**Home**): The main landing zone. Features the Hero banner ("Masterfully Crafted Roasts"), category filters, and animated product cards.
*   `/origins` (**Origins / The Intel**): Features geographic dossiers mapping out the flavor profiles of specific locations (e.g., Ethiopia Yirgacheffe, Colombian Andes).
*   `/subscriptions` (**Double-O Delivery**): Tiered subscription pricing page (Level 1: Operative, Level 2: Special Agent, Level 3: Double-O).
*   `/login` (**Agent Authentication**): Secure access portal for purchasing and checking order history.
*   `/products`, `/categories`: E-commerce catalog management and filtering.
*   `/cart`, `/checkout`: Fast-action checkout pipeline linking to Stripe.
*   `/orders`, `/admin/orders`: Post-purchase intel and logistics tracking.

### 🧩 Core Components (`/frontend/components`)
*   `Header.js`: The sticky glassmorphism command center. Houses the `logo-full.png` perfectly scaled responsive image.
*   `Footer.js`: "For Your Eyes Only." Holds supplementary links and copyright intel.
*   `Layout.js`: Global wrapper ensuring consistent theming and background resets across all views.

---

## 5. Development Workflows
*   **Frontend Command:** Run `npm run dev` from `/frontend` (Defaults to `localhost:3000`).
*   **Backend Command:** Run `dotnet run` from `/src/WebAPI` (Defaults to `localhost:5000`).
*   **Console Logging Policy:** Use `console.log(err.message)` instead of `console.error(err)` for operational API errors locally to prevent the Next.js Dev Error Overlay from popping up randomly.

**Status:** The UI Design overhaul is complete. The next operational phase is connecting the Next.js subscription tiers to the active backend Stripe Billing gateways.
