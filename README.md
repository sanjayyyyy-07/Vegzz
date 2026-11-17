# VEGZZ Grocery Store — Frontend

A responsive React + Vite grocery e-commerce frontend concept.

## Run locally

1. Install Node.js (LTS).
2. Extract this project folder.
3. Open a terminal in the folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Included

- VEGZZ grocery storefront design
- Responsive desktop and mobile layout
- Product cards with grocery photos, prices and offer labels
- Search and category filters
- Add-to-basket and quantity controls
- Basket drawer and subtotal calculation
- Demo newsletter form

## Important

This is frontend-only. Cart data is held in React state and resets on refresh. Login, database storage, order creation, online payment, delivery tracking and backend APIs are not connected. Product photos load from Unsplash and require an internet connection. Update product details and image URLs in `src/App.jsx` as needed.
