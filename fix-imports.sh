#!/bin/bash
# Fix import paths for nested pages

cd /Users/raiden/Desktop/Nowsath/unthink-ui/packages/web-client-next

# Fix 4-level deep pages (e.g., pages/a/b/c/d.js)
find pages -mindepth 4 -name "*.js" ! -name "_*" -type f -exec sed -i '' 's|from "\.\.\/src/|from "../../../../src/|g' {} \;

# Fix 3-level deep pages (e.g., pages/a/b/c.js)
find pages -mindepth 3 -maxdepth 3 -name "*.js" ! -name "_*" -type f -exec sed -i '' 's|from "\.\.\/src/|from "../../../src/|g' {} \;

# Fix 2-level deep pages (e.g., pages/a/b.js)
find pages -mindepth 2 -maxdepth 2 -name "*.js" ! -name "_*" -type f -exec sed -i '' 's|from "\.\.\/src/|from "../../src/|g' {} \;

echo "Import paths fixed"
