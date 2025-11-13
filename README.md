# ShopSmart AI — Demo (Static Frontend)

This is a lightweight demo of a **modern shopping web app** with a simple AI product research simulation.
It is designed to be a static site (HTML/CSS/JS) so you can host it on **GitHub Pages**.

## Files included
- `index.html` — main page (entry point)
- `style.css` — modern responsive styling
- `script.js` — app logic (products, cart, auth, UI)
- `ai.js` — AI integration placeholder (simulates or can call real API)
- `products.json` — sample product data (embedded in index via script tag)

## How to use
1. Upload all files to your GitHub repository root.
2. In GitHub repo Settings → Pages:
   - Source: Branch `main`
   - Folder: `/ (root)`
3. Save — GitHub will provide a URL like `https://<username>.github.io/<repo>/` within a minute.

## To enable real AI product research
- Replace the simulated `analyzeProductQuery` in `ai.js` with a real API call to a model (OpenAI / Google Gemini).
- Keep your API keys secret; for production, call the AI from a server (not directly from client-side JS).

## Notes
- This is a demo static frontend only (no backend). For full e-commerce features (payments, user accounts),
  you'll need a backend and secure APIs.