# Veloura — Setup Guide

## Prerequisites
- Node.js 18+ (install from https://nodejs.org or via nvm)

## 1. Install Dependencies
```bash
cd veloura
npm install
```

## 2. Configure Environment
Edit `.env.local` and add your Shopify store domain:
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-actual-store.myshopify.com
```
Your Storefront and Admin tokens are already filled in.

## 3. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

## 4. Configure Shopify Webhooks (for ISR)
In your Shopify Admin → Settings → Notifications → Webhooks, add:
- **products/create** → `https://your-domain.com/api/revalidate?secret=veloura_revalidate_2024`
- **products/update** → same URL
- **collections/update** → same URL

## 5. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```
Set the same env vars in the Vercel dashboard.

## Architecture Overview

```
app/
  page.tsx                    → Homepage (SSG, revalidate 1h)
  products/[handle]/page.tsx  → Product Detail Page (SSG per handle)
  collections/[handle]/page.tsx → Collection Grid (SSG)
  api/revalidate/route.ts     → Shopify webhook handler (ISR)

components/
  layout/    → Navbar, Footer
  home/      → Hero, FeatureGrid, HowItWorks, ProductShowcase, SocialProof, Urgency
  product/   → ProductGallery, ProductInfo
  cart/      → CartDrawer

lib/shopify/ → Storefront API client, queries, types, helpers
context/     → CartContext (useReducer + localStorage persistence)
```

## Key CRO Features
- Flash sale countdown timer (Urgency)
- Stock scarcity indicator ("Only 12 left")
- Social proof section (reviews + stats)
- FAQ accordion on PDP
- Free shipping banner
- Trust badges (SSL, Returns, Shipping)
- Cart drawer with subtotal
- Sticky nav with cart counter
