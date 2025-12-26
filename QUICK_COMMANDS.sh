#!/bin/bash

# Quick Command Reference for Gatsby → Next.js Migration
# Copy and paste these commands as needed

# ============================================================================
# SETUP COMMANDS
# ============================================================================

# 1. Copy your source files to the new Next.js project
cp -r ../web-client-gatsby/src packages/web-client-next/
cp -r ../web-client-gatsby/src/pages/* packages/web-client-next/pages/

# 2. Copy environment variables
cp ../web-client-gatsby/.env packages/web-client-next/.env.local

# 3. Install dependencies
cd packages/web-client-next
npm install

# ============================================================================
# DEVELOPMENT COMMANDS
# ============================================================================

# Start development server (runs on http://localhost:3000)
npm run dev

# Lint code for errors
npm run lint

# ============================================================================
# BUILD & PRODUCTION COMMANDS
# ============================================================================

# Build for production
npm run build

# Start production server (after running build)
npm start

# Build and start in one command
npm run build && npm start

# ============================================================================
# CLEANUP & MAINTENANCE
# ============================================================================

# Clear Next.js build cache
rm -rf .next

# Reinstall all dependencies
rm -rf node_modules
npm install

# Clear both and reinstall
rm -rf .next node_modules && npm install

# ============================================================================
# DEBUGGING
# ============================================================================

# Build with debug output
npm run build -- --debug

# Analyze bundle size (requires @next/bundle-analyzer)
ANALYZE=true npm run build

# Build with increased memory (if running out of memory)
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# ============================================================================
# COMMON FIXES
# ============================================================================

# Clear cache and reinstall
rm -rf .next node_modules && npm install

# Kill process on port 3000 (macOS/Linux)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# ============================================================================
# VERIFICATION
# ============================================================================

# Check dependencies installed
npm ls

# Check for security vulnerabilities
npm audit

# ============================================================================
# KEY PATHS
# ============================================================================

# Project root: /packages/web-client-next/
# Pages: /packages/web-client-next/pages/
# Config: /packages/web-client-next/next.config.js
# Environment: /packages/web-client-next/.env.local

# ============================================================================
