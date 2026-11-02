# VietTrop – E-Commerce Website

> **Tagline:** *Taste Vietnam. Live Healthy.*  
> **Brand Location:** Adelaide, South Australia  
> **Target Market:** Australia  
> **Business Model:** Digital-First Tropical Dried Fruit Snacking Startup  

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
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7 (`HashRouter` for 100% reliable GitHub Pages subfolder refreshes)
- **Icons:** Lucide React
- **Persistence:** LocalStorage shopping cart engine with dynamic tax, free shipping meter, and promo codes (`VIETTROP10`)
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 Local Development Setup

Follow these steps to run the website locally on your computer:

### 1. Prerequisites
- **Node.js**: Version 20.x or higher recommended
- **npm**: Version 9.x or higher

### 2. Installation
Clone or download this repository, then install dependencies:

```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### 4. Build for Production
To test the production build locally:

```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

This project is pre-configured for automated continuous deployment to GitHub Pages under a repository subfolder (e.g. `https://<your-username>.github.io/<repo-name>/`).

### Step 1: Create a GitHub Repository
1. Log into your [GitHub account](https://github.com).
2. Click **New Repository** (`+` icon at top right).
3. Name your repository (e.g., `viettrop` or `viet-trop`).
4. Keep the repository **Public** (required for free GitHub Pages).
5. Do **not** initialize with a README, .gitignore, or license (these already exist in the project).
6. Click **Create repository**.

### Step 2: Upload the Code
In your project folder, open terminal and run:

```bash
git init
git add .
git commit -m "Initial commit of VietTrop e-commerce website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

*(Replace `<your-username>` and `<repo-name>` with your actual GitHub username and repository name).*

### Step 3: Enable GitHub Pages in Repository Settings
1. Navigate to your repository on GitHub.
2. Click **Settings** (top tab) $\to$ **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment** $\to$ **Source**, select **GitHub Actions**.
4. Save the settings.

### Step 4: Automated Deployment via GitHub Actions
- The workflow file at `.github/workflows/deploy.yml` will automatically detect the push to `main`.
- It dynamically assigns `VITE_BASE_PATH="/<repo-name>/"` to match your repository name.
- It builds the static assets into `dist/` and publishes them to GitHub Pages.
- You can monitor the deployment under the **Actions** tab on your GitHub repository.
- Once completed (usually 1–2 minutes), your site will be live at:
  `https://<your-username>.github.io/<repo-name>/`

### Step 5: Updating the Repository Name or Base Path
If you ever rename your GitHub repository, the GitHub Actions workflow automatically reads the repository name via:
```yaml
VITE_BASE_PATH: /${{ github.event.repository.name }}/
```
If you wish to test a specific subfolder locally during build, run:
```bash
VITE_BASE_PATH="/my-custom-subfolder/" npm run build
```

---

## 🔍 SEO & Digital Marketing Assets

The project includes:
- **Semantic HTML & Clean Headings:** Structured H1/H2/H3 tags and balanced titles.
- **Open Graph & Twitter Cards:** Configured in `index.html` for rich link previews.
- **Structured Data:** Schema.org `OnlineStore` JSON-LD embedded in `index.html`.
- **Search Engine Directives:**
  - `public/robots.txt`: Search crawler permissions and sitemap link.
  - `public/sitemap.xml`: Priority-ranked URL index.
- **Zero-Pill Anti-Slop Design:** Compliant with modern design guidelines (no static badge spam, clean typography, accessible color contrast).

---

## 📝 Demonstration Disclaimer

VietTrop is a digital-first startup concept created as part of an academic digital marketing curriculum in Adelaide, South Australia. Product descriptions, origins, and ingredient analyses reflect real Vietnamese agricultural and food processing practices; however, all customer reviews, order confirmation numbers, and checkout forms are simulated demonstrations.
