# Cryptography Atlas

An interactive cryptography reference focused on exploration rather than raw benchmarking. The current site combines a cinematic intro, a searchable atlas of 72 algorithms across 14 categories, a Caesar cipher workbench, and an educational attack-estimation lab.

## Live Site

GitHub Pages URL: [https://mahesh-2006.github.io/website-for-cryptographic-algorithms/](https://mahesh-2006.github.io/website-for-cryptographic-algorithms/)

## What’s Included

- Intro experience built with React Three Fiber and shader-driven visuals.
- Algorithm atlas covering symmetric ciphers, hashes, signatures, post-quantum schemes, homomorphic encryption, and zero-knowledge systems.
- Caesar cipher workbench for shift, numeric, and custom-symbol mapping experiments.
- Attack estimation lab comparing brute force, dictionary, Grover, and Shor-style models across multiple hardware profiles.

## Stack

- React 18 + TypeScript + Vite
- React Three Fiber, Drei, and postprocessing for the intro scene
- GSAP for motion
- Express for optional local serving and legacy API compatibility
- GitHub Actions for automated Pages deployment

## Development

Requirements:
- Node.js 20+
- npm

Commands:
- `npm install`
- `npm run dev` to start the Vite app locally
- `npm run dev:api` to run the Express server with nodemon
- `npm run build` to create a production bundle in `dist/`
- `npm run preview` to preview the built site locally
- `npm start` to serve the built site and any available API routes

For a Pages-equivalent local build, run:

```bash
VITE_PUBLIC_BASE=/website-for-cryptographic-algorithms/ npm run build
```

## Deployment

The site deploys automatically from `main` through [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml). The workflow installs dependencies, builds the root Vite app with the repository base path, and publishes `dist/` to GitHub Pages.

## Repository Layout

```text
.
├── public/                   # Static assets used by the current site
├── src/                      # Current React + TypeScript application
├── services/                 # Legacy API route modules kept for local compatibility
├── frontend/                 # Legacy frontend snapshot retained from earlier iterations
├── .github/workflows/        # Deployment automation
├── index.html                # Vite entry HTML
├── server.js                 # Local Express server
└── vite.config.ts            # Vite configuration
```

## Notes

- The attack estimates are intentionally educational and order-of-magnitude only.
- The current GitHub Pages deployment uses the root `src/` application, not the legacy `frontend/` directory.
- Use established, peer-reviewed libraries for any real cryptographic system.

## License

Released under the [MIT License](LICENSE).
