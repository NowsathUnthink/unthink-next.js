# Next.js Migration Checklist

Use this checklist to ensure a smooth migration from your Gatsby project to Next.js.

## Phase 1: Initial Setup ✓

- [ ] **Create next.config.js** - Configuration file for Next.js ✓
- [ ] **Create pages/_app.js** - App wrapper replacing gatsby-browser.js ✓
- [ ] **Create pages/_document.js** - Global HTML structure ✓
- [ ] **Create .env.local** - Environment variables ✓
- [ ] **Update package.json** - Replace Gatsby with Next.js dependencies ✓
- [ ] **Create .gitignore** - Exclude .next, node_modules, etc. ✓

## Phase 2: Project Structure

- [ ] **Copy src/ directory** - Copy entire src folder to new project
  ```bash
  cp -r packages/web-client-gatsby/src packages/web-client-next/
  ```

- [ ] **Migrate pages/** - Copy and convert pages
  ```bash
  cp -r packages/web-client-gatsby/src/pages/* packages/web-client-next/pages/
  ```
  - Remove `GoogleTagManagerNoscript.js` (already in _document.js)
  - Update imports in each page if needed

- [ ] **Copy public assets** - Copy static files
  ```bash
  cp -r packages/web-client-gatsby/public/* packages/web-client-next/public/
  ```

- [ ] **Copy configuration files** - If customized
  - [ ] tailwind.config.js
  - [ ] postcss.config.js

## Phase 3: Dependency Updates

- [ ] **Install dependencies**
  ```bash
  cd packages/web-client-next
  npm install
  ```

- [ ] **Remove Gatsby-specific packages** - These should not be in next.config.js/package.json
  - [ ] gatsby
  - [ ] gatsby-cli
  - [ ] gatsby-plugin-* (all variants)
  - [ ] gatsby-source-*
  - [ ] gatsby-transformer-*

- [ ] **Update Next.js compatible packages**
  - [ ] react → ^18.0.0
  - [ ] react-dom → ^18.0.0
  - [ ] antd (works as-is)
  - [ ] tailwindcss → ^3.2.0 or latest
  - [ ] sass (works as-is)

## Phase 4: Code Conversion

### Import statements
- [ ] Replace `gatsby` imports with `next` equivalents
  ```javascript
  // OLD: import { Link } from 'gatsby'
  // NEW: import Link from 'next/link'
  
  // OLD: import { GatsbyImage } from 'gatsby-plugin-image'
  // NEW: import Image from 'next/image'
  
  // OLD: import { Helmet } from 'react-helmet'
  // NEW: import Head from 'next/head'
  ```

- [ ] Update all page imports in _app.js and _document.js

### Pages Conversion
- [ ] **Convert index page** (pages/index.js)
  - [ ] Add Head component with SEO tags
  - [ ] Remove Gatsby-specific GraphQL
  - [ ] Add getStaticProps if needed

- [ ] **Convert dynamic pages** ([id].js, [...slug].js)
  - [ ] Add getStaticPaths
  - [ ] Add getStaticProps or getServerSideProps
  - [ ] Update useRouter usage

- [ ] **Update all remaining pages**
  - [ ] Check each page file
  - [ ] Update imports
  - [ ] Remove Gatsby code
  - [ ] Add data fetching functions if needed

### Component Updates
- [ ] **Image components**
  - [ ] Replace GatsbyImage with next/image
  - [ ] Add width/height or fill prop
  - [ ] Test image loading

- [ ] **Link components**
  - [ ] Update from `to=` to `href=`
  - [ ] Verify navigation works

- [ ] **Redux setup** (should work as-is)
  - [ ] Test Redux store access
  - [ ] Verify dispatches work

- [ ] **Context providers** (should work as-is)
  - [ ] Test context values
  - [ ] Verify consumer components work

## Phase 5: Environment Variables

- [ ] **Copy .env variables**
  ```bash
  cp packages/web-client-gatsby/.env packages/web-client-next/.env.local
  ```

- [ ] **Update variable names for browser access**
  - Find variables used in browser-side code
  - Add `NEXT_PUBLIC_` prefix
  - Example: `GA_TRACKING_ID` → `NEXT_PUBLIC_GA_TRACKING_ID`

- [ ] **Test environment variables**
  - [ ] In server-side code (getStaticProps, getServerSideProps)
  - [ ] In browser code
  - [ ] In API routes

## Phase 6: Styling & Assets

- [ ] **Tailwind CSS**
  - [ ] Verify tailwind.config.js exists
  - [ ] Check content paths in config
  - [ ] Test utility classes on dev server

- [ ] **SASS/SCSS**
  - [ ] Verify global styles import in _app.js
  - [ ] Test SCSS module imports
  - [ ] Check Ant Design Less imports

- [ ] **Ant Design**
  - [ ] Verify antd package installed
  - [ ] Test Ant components render correctly
  - [ ] Check Less variable overrides work

- [ ] **SVG Handling**
  - [ ] Test SVG imports as components
  - [ ] Verify SVG styling works
  - [ ] Check SVG animation if any

- [ ] **Fonts**
  - [ ] Verify font files in public/fonts/
  - [ ] Check @font-face declarations
  - [ ] Test custom font rendering

## Phase 7: Features Testing

### Navigation
- [ ] Test all page routes accessible
- [ ] Test dynamic route parameters work
- [ ] Test query parameters (?param=value)
- [ ] Test 404 page displays
- [ ] Test navigation between pages

### Data Fetching
- [ ] Test static pages load content
- [ ] Test dynamic data in getStaticProps
- [ ] Test revalidation (ISR) works
- [ ] Test API calls from pages
- [ ] Test error handling

### Modals & Components
- [ ] Test all modal components
- [ ] Test loading states
- [ ] Test error messages
- [ ] Test form submissions
- [ ] Test interactive components

### Analytics
- [ ] Test Google Analytics tracking
- [ ] Test page view events
- [ ] Test custom events
- [ ] Check Google Tag Manager integration

### Authentication
- [ ] Test login flow
- [ ] Test logout flow
- [ ] Test protected pages
- [ ] Test user session persistence
- [ ] Test role-based access

## Phase 8: Performance & Optimization

- [ ] **Image Optimization**
  - [ ] Use next/image for all images
  - [ ] Check image sizes are optimal
  - [ ] Test image loading performance

- [ ] **Code Splitting**
  - [ ] Check CSS bundle size
  - [ ] Check JS bundle size
  - [ ] Use dynamic imports for heavy components

- [ ] **Build Optimization**
  - [ ] Run production build
  - [ ] Check build time
  - [ ] Check output file sizes

- [ ] **Runtime Performance**
  - [ ] Check Core Web Vitals
  - [ ] Monitor memory usage
  - [ ] Test on slow network

## Phase 9: Build & Deployment

- [ ] **Local Build**
  ```bash
  npm run build
  npm start
  ```
  - [ ] Build completes without errors
  - [ ] Production server starts
  - [ ] Pages load correctly

- [ ] **Environment Variables for Deployment**
  - [ ] Set NEXT_PUBLIC_* variables in deployment platform
  - [ ] Set server-only variables
  - [ ] Test with production environment

- [ ] **Docker (if applicable)**
  - [ ] Create Dockerfile for Next.js
  - [ ] Build Docker image
  - [ ] Test Docker container locally
  - [ ] Push to registry

- [ ] **Deployment Platform**
  - [ ] Connect repository to deployment service
  - [ ] Configure environment variables
  - [ ] Set build command: `npm run build`
  - [ ] Set start command: `npm start`
  - [ ] Deploy to staging
  - [ ] Test staging environment
  - [ ] Deploy to production

## Phase 10: Post-Deployment

- [ ] **Monitor & Test**
  - [ ] Check all pages load
  - [ ] Monitor error logs
  - [ ] Check analytics data flow
  - [ ] Verify database connections
  - [ ] Test API endpoints

- [ ] **SEO**
  - [ ] Check page titles in Head component
  - [ ] Verify meta descriptions
  - [ ] Test og:image and social tags
  - [ ] Check robots.txt
  - [ ] Verify sitemap (if applicable)

- [ ] **User Experience**
  - [ ] Test on different browsers
  - [ ] Test on mobile devices
  - [ ] Test with slow network
  - [ ] Check accessibility (WCAG)

- [ ] **Performance**
  - [ ] Check Core Web Vitals
  - [ ] Monitor page load times
  - [ ] Check error rates
  - [ ] Review analytics

## Phase 11: Cleanup & Documentation

- [ ] **Remove Old Gatsby Project** (after confirming everything works)
  ```bash
  rm -rf packages/web-client-gatsby
  ```

- [ ] **Update Monorepo Configuration**
  - [ ] Update lerna.json if using lerna
  - [ ] Update scripts in root package.json
  - [ ] Update documentation

- [ ] **Update CI/CD Pipelines**
  - [ ] Update build scripts
  - [ ] Update deployment scripts
  - [ ] Update test commands
  - [ ] Update lint commands

- [ ] **Create Migration Documentation**
  - [ ] Document what was changed
  - [ ] Document any workarounds
  - [ ] Document troubleshooting steps
  - [ ] Document for team reference

## Optional Enhancements

- [ ] **Add next-seo** for advanced SEO
  ```bash
  npm install next-seo
  ```

- [ ] **Add PWA support** with next-pwa
  ```bash
  npm install next-pwa
  ```

- [ ] **Add TypeScript**
  ```bash
  npm install --save-dev typescript @types/node @types/react
  ```

- [ ] **Add API monitoring** (e.g., Sentry)
  ```bash
  npm install @sentry/nextjs
  ```

- [ ] **Add performance monitoring**
  - [ ] Web Vitals tracking
  - [ ] Error tracking
  - [ ] Analytics

---

## Notes

- Keep track of any custom modifications made to pages
- Document any API changes needed
- Test thoroughly before production deployment
- Have a rollback plan ready
- Monitor error logs closely after deployment

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run lint              # Run linting
npm run build             # Build for production

# Testing
npm start                 # Start production server (after build)

# Cleanup
rm -rf .next             # Clear Next.js build
rm -rf node_modules      # Clear dependencies
npm install              # Reinstall dependencies
```

---

**Last Updated**: December 2025
