# VietTrop – E-Commerce Website

> **Tagline:** *Taste Vietnam. Live Healthy.*  
> **Brand Location:** Adelaide, South Australia  
> **Target Market:** Australia  
> **Repository:** `thanhtamm142-cell/viettrop-website2`  
> **Live Site:** [https://thanhtamm142-cell.github.io/viettrop-website2/](https://thanhtamm142-cell.github.io/viettrop-website2/)  

---

## 🥭 Project Overview

**VietTrop** is a proposed digital-first e-commerce startup based in **Adelaide, South Australia**, delivering authentic Vietnamese tropical dried fruit snacks directly to Australian consumers.

This project is an academic digital marketing prototype website showcasing:
- **Product Range:**
  1. **Vietnamese Dried Mango** (*Xoài Sấy Dẻo* – Tiền Giang, Mekong Delta)
  2. **Vietnamese Dried Jackfruit** (*Mít Sấy Giòn* – Đắk Lắk, Central Highlands)
  3. **Vietnamese Dried Banana** (*Chuối Sấy Dẻo* – Đồng Nai, Southeast Region)
  4. **Tropical Discovery Pack** (*Bộ Ba Khám Phá* – Curated 3-Pack Trial Bundle)
- **Brand Value Proposition:** Authentic Vietnamese tropical fruit flavours delivered through convenient online ordering, unembellished ingredient transparency, genuine regional provenance, and culturally respectful storytelling.
- **Academic Project Notice:** All listings, order flows, customer testimonials, and checkout mechanics are simulation prototypes designed for educational digital marketing analysis. No actual card payments are processed.

---

## 🎨 Visual Identity & Brand Design

- **Tropical Green:** `#176B45` (Primary brand color, representing lush Mekong Delta foliage)
- **Mango Yellow:** `#F5B841` (Sun-ripened tropical sweetness and joy)
- **Warm Cream:** `#FFF9EC` (Natural canvas, authentic unbleached paper aesthetic)
- **Soft Orange:** `#F29B38` (Sunset warmth, caramelized banana notes)
- **Dark Charcoal:** `#26352D` (High-contrast, accessible typography)
- **Typography:**
  - Display & Headings: `Outfit`
  - Body: `Plus Jakarta Sans`
  - Editorial Accents: `Fraunces`

---

## 👥 Dual Target Audiences & Marketing Strategy

1. **Emily Thompson (Primary Persona):**
   - *Profile:* Australian young professional (25–40).
   - *Needs:* Healthy desk snacks, lunchbox convenience, transparent ingredient lists (no artificial sulphur dioxide 220).
   - *Approach:* Emphasizes clean single-ingredient labelling, convenient resealable pouches, fast Adelaide-based Australia Post dispatch, and trial starter bundles.

2. **Sophie Nguyen (Secondary Persona):**
   - *Profile:* Asian-Australian young professional familiar with Vietnamese culinary heritage.
   - *Needs:* Cultural authenticity, traditional soft-dried (*sấy dẻo*) and vacuum-crisped (*sấy giòn*) textures, memories of home.
   - *Approach:* Highlights specific Vietnamese provinces (Tiền Giang, Đắk Lắk, Đồng Nai), traditional Cat Chu and Chuối Xiêm varieties, and genuine harvest traditions.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8 (Base path: `/viettrop-website2/`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7 (`HashRouter` for 100% reliable GitHub Pages subfolder refreshes)
- **Icons:** Lucide React
- **Persistence:** LocalStorage shopping cart engine with dynamic tax, free shipping meter, and promo codes (`VIETTROP10`)
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) without lockfile-dependent caching.

---

## 🚀 Local Development Setup

Follow these steps to run the website locally on your computer:

### 1. Prerequisites
- **Node.js**: Version 20.x or higher recommended
- **npm**: Version 9.x or higher

### 2. Installation
Install dependencies:

```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

### 4. Build for Production
To test the production build locally with the subfolder base path:

```bash
npm run build
npm run preview
```

---

## 🌐 GitHub Pages Deployment Configuration

The deployment workflow in `.github/workflows/deploy.yml` has been updated to resolve the `Dependencies lock file is not found` error:

1. **Lockfile Independence:** Removed `cache: 'npm'` from `actions/setup-node@v4` so GitHub Actions does not fail if `package-lock.json` is omitted or uncommitted.
2. **Install Command:** Uses `npm install --legacy-peer-deps` instead of `npm ci`.
3. **Subfolder Base Path:** Sets `VITE_BASE_PATH: /viettrop-website2/` so all JS/CSS/image assets load from `/viettrop-website2/assets/`.
4. **Artifact Upload:** Publishes `./dist` to GitHub Pages using `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`.

### How to Sync to Your Repository `thanhtamm142-cell/viettrop-website2`

From your local machine or terminal:

```bash
git add .
git commit -m "Fix GitHub Pages deployment: remove lockfile cache and set base path to /viettrop-website2/"
git push origin main
```

Once pushed, GitHub Actions will automatically execute the build and publish to:
**`https://thanhtamm142-cell.github.io/viettrop-website2/`**
