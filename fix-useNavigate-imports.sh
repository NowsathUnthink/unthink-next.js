#!/bin/bash

# Script to fix missing useNavigate imports
files=(
    "src/pageComponents/storePage/index.js"
    "src/pageComponents/storePage/Breadcrumbs.js"
    "src/pageComponents/storePage/ProductDetails.js"
    "src/pageComponents/storePage/ChatModal.js"
    "src/pageComponents/storePage/BudgetTravelHeader.js"
    "src/pageComponents/storePage/SamskaraHeader.js"
    "src/pageComponents/storePage/SamskaraMobileHeader.js"
    "src/pageComponents/storePage/HeroesVillainsMobileHeader.js"
    "src/pageComponents/Collections/collectionRow.js"
    "src/pageComponents/DeliveryDetails/DeliveryDetails.js"
    "src/pageComponents/categories/Categories.js"
    "src/pageComponents/people/People.js"
    "src/pageComponents/customProducts/CustomProducts.js"
    "src/pageComponents/Home/TitleSuffix.js"
    "src/pageComponents/swiftlyStyled/SwiftlyHeader.js"
    "src/pageComponents/swiftlyStyled/pageContents/CollectionsGrid.js"
    "src/components/CollectionShareModal.js"
    "src/components/singleCollection/CollectionDetails.js"
    "src/components/singleCollection/SingleCollection.js"
    "src/components/singleCollection/ProductCard.js"
    "src/pageComponents/tryForFree/ReviewCollection.js"
    "src/pageComponents/tryForFree/CreateFreeCollection.js"
    "src/components/staticPageComponents/AudienceTab.js"
    "src/components/staticPageComponents/ContactUsField.js"
    "src/pageComponents/wishlist/CreateWishlist.js"
    "src/pageComponents/wishlist/WishListModal.js"
    "src/pageComponents/wishlist/blogCollection/BlogCollectionGallery.js"
    "src/pageComponents/createStore/CreateStore.js"
    "src/pageComponents/Profile/Steps/FeatureSelection.js"
    "src/pageComponents/Auth/SignInFormSection.js"
    "src/pageComponents/Auth/ResetPasswordFrom.js"
    "src/pageComponents/Auth/SignupFormSection.js"
    "src/pageComponents/Auth/GuestSignupForm.js"
    "src/pageComponents/Auth/CreateAccountSection.js"
    "src/pageComponents/Auth/TokenSignIn.js"
    "src/pageComponents/Auth/WelcomePage.js"
    "src/components/helpMeShop/HelpMeShopModal.js"
    "src/pageComponents/staticHomePage/Header.js"
    "src/pageComponents/staticHomePage/Brands.js"
    "src/pageComponents/staticHomePage/Creators.js"
    "src/pageComponents/staticHomePage/Publishers.js"
    "src/pageComponents/staticHomePage/products/PopupStore.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Check if useNavigate is used but not imported
        if grep -q "useNavigate(" "$file" && ! grep -q "import.*useNavigate" "$file"; then
            echo "Fixing $file"
            # Add import after the last import statement
            sed -i '' '/^import.*react-redux/a\
import { useNavigate } from'"$(echo "$file" | sed 's|/[^/]*$||' | sed 's|src/||' | sed 's|[^/]*/|../|g')"'helper/useNavigate";' "$file"
        fi
    fi
done
