# Gatsby to Next.js Migration Guide

## Overview
This document outlines the migration from Gatsby to Next.js for the unthink-ui web-client project.

## Key Changes

### 1. **Project Structure**

#### Before (Gatsby)
```
src/
  pages/          # Automatic file-based routing
  components/
  style/
  context/
  state/
  helper/
  images/
gatsby-config.js
gatsby-browser.js
gatsby-ssr.js
```

#### After (Next.js)
```
pages/            # File-based routing (same as Gatsby)
src/
  components/
  style/
  context/
  state/
  helper/
  images/
next.config.js
pages/_app.js     # Replaces gatsby-browser.js wrapRootElement
pages/_document.js # Global HTML structure
```

### 2. **Installation & Setup**

```bash
# Navigate to the new Next.js project
cd packages/web-client-next

# Install dependencies
npm install

# Copy your environment variables
cp ../web-client-gatsby/.env packages/web-client-next/.env.local
# Then update .env.local to use NEXT_PUBLIC_ prefix for browser-exposed variables

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 3. **Major Dependency Changes**

| Gatsby Package | Next.js Equivalent | Notes |
|---|---|---|
| `gatsby` | `next` | Core framework |
| `gatsby-plugin-image` | `next/image` | Built-in image component |
| `gatsby-plugin-react-helmet` | `next/head` or `next-seo` | Head management |
| `gatsby-plugin-google-gtag` | Manual gtag setup in `_document.js` | See below |
| `gatsby-source-filesystem` | File system (public/src) | No plugin needed |
| `gatsby-transformer-sharp` | Built-in | Image optimization |
| All other gatsby-plugin-* | Remove | Not needed in Next.js |

### 4. **Routing**

**Gatsby and Next.js both use file-based routing**, so the migration is straightforward:

- `src/pages/index.js` → `pages/index.js`
- `src/pages/about.js` → `pages/about.js`
- `src/pages/product/[id].js` → `pages/product/[id].js` (dynamic routes work the same)
- `src/pages/404.js` → `pages/404.js`

### 5. **Layout & App Wrapper (Critical!)**

**Gatsby**: Used `wrapRootElement` in `gatsby-browser.js`
**Next.js**: Use `pages/_app.js` and `pages/_document.js`

**Example Migration:**
```javascript
// gatsby-browser.js (Gatsby)
export const wrapRootElement = ({ element }) => (
  <ReduxWrapper>
    <YourComponent>{element}</YourComponent>
  </ReduxWrapper>
)

// pages/_app.js (Next.js)
function MyApp({ Component, pageProps }) {
  return (
    <ReduxWrapper>
      <Component {...pageProps} />
    </ReduxWrapper>
  )
}
export default MyApp
```

### 6. **Styling**

**Tailwind, SASS, and Ant Design** are already configured in `next.config.js`:

```javascript
// next.config.js
sassOptions: {
  includePaths: ['./src'],
},
```

Import SCSS files in `pages/_app.js`:
```javascript
import '../src/style/global.scss';
import '../src/style/index.scss';
```

### 7. **Environment Variables**

**Gatsby**: Any variable is accessible via `process.env.VAR_NAME`
**Next.js**: Variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser

```env
# .env.local
GA_TRACKING_ID=your_id              # Backend-only
NEXT_PUBLIC_GA_TRACKING_ID=your_id # Browser-accessible
```

### 8. **Google Analytics Setup**

**Next.js** doesn't have a built-in gtag plugin. Add manually to `pages/_document.js`:

```javascript
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
/>
<script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
`}} />
```

### 9. **SVG Handling**

**Already configured** in `next.config.js` with `@svgr/webpack`:

```javascript
// Import SVG as React component
import { ReactComponent as MyIcon } from '../path/to/icon.svg';
// Or with SVGR:
import MyIcon from '../path/to/icon.svg';
```

### 10. **Image Component**

**Gatsby**:
```javascript
import { GatsbyImage, getImage } from "gatsby-plugin-image";
<GatsbyImage image={getImage(data.file)} alt="Description" />
```

**Next.js**:
```javascript
import Image from 'next/image';
<Image src="/path/to/image.jpg" alt="Description" width={200} height={200} />
```

For static images without known dimensions:
```javascript
import Image from 'next/image';
<Image src={imgPath} alt="Description" fill />
```

### 11. **Link Navigation**

**Both frameworks use the same pattern:**
```javascript
import Link from 'next/link'; // or 'gatsby' for Gatsby
<Link href="/about">About</Link> {/* Next.js */}
<Link to="/about">About</Link> {/* Gatsby */}
```

### 12. **Dynamic Page Data**

**Gatsby** uses GraphQL and `getStaticProps` / `getServerSideProps`
**Next.js** also uses `getStaticProps` / `getServerSideProps` (same API)

```javascript
export async function getServerSideProps(context) {
  // This runs on the server
  const data = await fetchData();
  return { props: { data } }
}

export default function Page({ data }) {
  return <div>{data}</div>
}
```

### 13. **API Routes**

Both Gatsby and Next.js support backend routes:
- Gatsby: `src/api/` (not commonly used)
- Next.js: `pages/api/` (built-in first-class support)

### 14. **Removed Gatsby Plugins**

The following Gatsby plugins are **not needed** in Next.js:

```
- gatsby-plugin-force-trailing-slashes ✓ (Use trailingSlash: true in next.config.js)
- gatsby-plugin-manifest ✓ (Manual public/manifest.json)
- gatsby-plugin-offline ✓ (Use next-pwa if needed)
- gatsby-plugin-nprogress ✗ (Use nprogress library directly)
- gatsby-plugin-smoothscroll ✗ (Use CSS scroll-behavior)
- gatsby-plugin-purgecss ✗ (Next.js handles CSS optimization)
- gatsby-plugin-postcss ✓ (Built-in)
- gatsby-plugin-sharp ✓ (Built-in)
```

### 15. **Migration Checklist**

- [ ] Copy all `src/` files to new `packages/web-client-next/src/` directory
- [ ] Move all `src/pages/` files to `packages/web-client-next/pages/`
- [ ] Create/update `.env.local` with NEXT_PUBLIC_ prefixes
- [ ] Update all imports from `gatsby` to `next`
- [ ] Remove all Gatsby-specific code (GraphQL queries, etc.)
- [ ] Test all routes and dynamic pages
- [ ] Update API endpoints if any URLs changed
- [ ] Test image optimization with `next/image`
- [ ] Verify styling (Tailwind, SASS, Ant Design)
- [ ] Check Google Analytics implementation
- [ ] Test in production build (`npm run build && npm start`)
- [ ] Update Docker configuration if using containers
- [ ] Update CI/CD pipelines
- [ ] Update package.json scripts in `lerna.json` if monorepo

### 16. **Common Migration Issues**

**Issue**: Images not loading
- **Solution**: Use `next/image` with proper width/height or `fill` prop

**Issue**: Styles not applying
- **Solution**: Ensure SCSS imports are in `pages/_app.js`, not individual pages

**Issue**: Environment variables undefined in browser
- **Solution**: Prefix with `NEXT_PUBLIC_` in `.env.local`

**Issue**: Dynamic routes not working
- **Solution**: Next.js uses same syntax as Gatsby: `[id].js`, `[...slug].js`

**Issue**: Build fails with "module not found"
- **Solution**: Check all relative imports point to correct locations

### 17. **Performance Comparison**

- **Next.js advantages**: Faster builds, better image optimization, built-in API routes
- **Next.js considerations**: Server components (if using App Router), hydration differences

### 18. **File Structure for Reference**

Complete directory structure for the new Next.js project:

```
packages/web-client-next/
├── pages/
│   ├── _app.js          # App wrapper (replaces gatsby-browser.js)
│   ├── _document.js     # Global HTML (replaces gatsby-ssr.js)
│   ├── index.js         # Home page
│   ├── 404.js           # Custom 404 page
│   ├── api/             # Backend routes (optional)
│   ├── product/
│   │   └── [id].js      # Dynamic product page
│   └── ... (other pages)
├── public/
│   ├── manifest.json    # PWA manifest
│   ├── favicon.ico
│   ├── fonts/
│   └── icons/
├── src/
│   ├── components/      # React components (unchanged)
│   ├── context/         # Context providers (unchanged)
│   ├── state/           # Redux setup (unchanged)
│   ├── helper/          # Utility functions (unchanged)
│   ├── style/           # CSS/SCSS files (unchanged)
│   ├── images/          # Static images (unchanged)
│   └── pageComponents/  # Page-specific components (unchanged)
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── .env.local           # Environment variables
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md
```

### 19. **Next Steps**

1. **Install dependencies**: `npm install` in `packages/web-client-next/`
2. **Copy source files**: Move all components, context, and utilities to `src/`
3. **Convert pages**: Move `src/pages/*` to `pages/`
4. **Test locally**: Run `npm run dev` and verify all routes
5. **Build and test**: Run `npm run build && npm start`
6. **Deploy**: Update deployment scripts and environment variables
7. **Monitor**: Check error logs and performance metrics

---

## Quick Command Reference

```bash
# Development
npm run dev           # Start dev server on http://localhost:3000

# Building
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint

# Useful for debugging
npm run build -- --debug  # Build with debug output
```

---

**For more information**: See [Next.js Documentation](https://nextjs.org/docs)
