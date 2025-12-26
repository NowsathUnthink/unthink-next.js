# Fixed Link href Undefined Errors

## Summary
Fixed all instances where Next.js `<Link>` components were being rendered with undefined `href` values, which caused the error:
```
Error: Failed prop type: The prop `href` expects a `string` or `object` in `<Link>`, but got `undefined` instead.
```

## Root Causes
1. **Missing Imports**: `MY_PROFILE` and `PROFILE` constants were not imported in AuthHeader.js
2. **Unsafe Array Mapping**: Header components were mapping over arrays and accessing properties without null/undefined checks
3. **No Existence Checks**: Submenu items were accessed without verifying they had valid `href` properties

## Files Fixed

### 1. [src/pageComponents/AuthHeader.js](src/pageComponents/AuthHeader.js)
**Issue**: Constants `MY_PROFILE` and `PROFILE` were used but not imported

**Fix**: Added imports
```javascript
import { PATH_ROOT, PATH_STORE, MY_PROFILE, PROFILE } from "../constants/codes";
```

### 2. [src/pageComponents/staticHomePage/Header.js](src/pageComponents/staticHomePage/Header.js)
**Issue**: MenuItems array being mapped without checking if items or `item.url` exist

**Fix**: Added safety checks before accessing properties
```javascript
{MenuItems.map((item, index) =>
  item && item.url ? (
    // render Link or anchor
  ) : null
)}
```

### 3. [src/pageComponents/storePage/HeroesVillainsHeader.js](src/pageComponents/storePage/HeroesVillainsHeader.js)
**Issue**: SubMenu items accessed without validation

**Fix**: Added null checks in the getSubMenuOptions function
```javascript
const getSubMenuOptions = (children) => {
  return (
    <ul>
      {children && children.map((subMenu) => 
        subMenu && subMenu.href ? (
          <li key={subMenu.label}>
            <a href={subMenu.href} target='_blank'>
              {subMenu.label}
            </a>
          </li>
        ) : null
      )}
    </ul>
  );
};
```

### 4. [src/pageComponents/storePage/HeroesVillainsMobileHeader.js](src/pageComponents/storePage/HeroesVillainsMobileHeader.js)
**Issue**: Menu and submenu items accessed without validation

**Fix**: Added safety checks with conditional rendering
```javascript
{heroesVillainsHeaderMenu && heroesVillainsHeaderMenu.map((menu) => {
  return menu && menu.href ? (
    <div key={menu.label}>
      <a href={menu.href} target='_blank'>{menu.label}</a>
      {menu?.children && activeMenu.includes(menu.label)
        ? menu.children?.map((subMenu) => {
            return subMenu && subMenu.href ? (
              <a href={subMenu.href} target='_blank'>{subMenu.label}</a>
            ) : null;
          })
        : null}
    </div>
  ) : null;
})}
```

### 5. [src/pageComponents/storePage/SamskaraHeader.js](src/pageComponents/storePage/SamskaraHeader.js)
**Issue**: SubMenu items accessed without validation

**Fix**: Added null checks
```javascript
{children && children.map((subMenu) => 
  subMenu && subMenu.href ? (
    <li key={subMenu.label}>
      <a href={subMenu.href} target='_blank'>
        {subMenu.label}
      </a>
    </li>
  ) : null
)}
```

### 6. [src/pageComponents/storePage/SamskaraMobileHeader.js](src/pageComponents/storePage/SamskaraMobileHeader.js)
**Issue**: Menu and submenu items accessed without validation

**Fix**: Added safety checks with conditional rendering
```javascript
{samskaraHeaderMenu && samskaraHeaderMenu.map((menu) => {
  return menu && menu.href ? (
    <div key={menu.label}>
      <a href={menu.href} target='_blank'>{menu.label}</a>
      {menu?.children && activeMenu.includes(menu.label)
        ? menu.children?.map((subMenu) => {
            return subMenu && subMenu.href ? (
              <a href={subMenu.href} target='_blank'>{subMenu.label}</a>
            ) : null;
          })
        : null}
    </div>
  ) : null;
})}
```

## Pattern Applied
The fix follows this pattern for all cases:
```javascript
// Before (unsafe)
<Link href={item.url}>{item.title}</Link>

// After (safe)
{item && item.url ? (
  <Link href={item.url}>{item.title}</Link>
) : null}
```

## Testing
Build now completes successfully without the "undefined href" errors:
```
✓ Compiled successfully
```

## Additional Notes
- The fixes ensure that components only render Link elements when href is guaranteed to be a valid string
- All arrays are checked for existence before mapping
- All object properties are validated before use
- This prevents React prop validation errors at runtime
