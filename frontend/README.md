# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Add2Kart E-commerce Documentation
 ## Table of Contents
 * Project Structure
 * Frontend Setup 
 * Backend Setup
 * API Endpoints


 ## Backend 
  * Api
  - auth Authentication endpoint login/register/updateProfile/logout
  - classes User/Products/Cart
  - upload
  - cart endpoint
  - product endpoint

  ## Frontend
  * src/Pages - Home/About/Auth/Contact/Dashboard/Products/Help/Faqs
  * src/Components - Navbar/cart/Footer/Banner
  * src/Context/ — React Context for Cart and Auth
  * src/Main/ — Routing and layout

  # To Run this npm run dev 
  # Bootstrap

  ## Backend 
   # Start Xammp Mysql
    # Api runs On php -S localhost:8000
 

## Api EndPoints 

* Products:
- GET /api/product/getProduct.php — List products
- - POST /api/product/addProduct.php — Add product
- POST /api/product/updateProduct.php — Update product
- DELETE /api/product/deleteProduct.php — Delete product

* Cart:
- GET /api/cart/get.php — Get cart items
- POST /api/cart/add.php — Add to cart
- POST /api/cart/remove.php — Remove from cart
- POST /api/cart/clear.php — Clear cart

* Auth:
- POST /api/auth/register.php — Register
- POST /api/auth/login.php — Login
- POST /api/auth/logout.php — Logout
- POST /api/auth/updateProfile.php — Update profile
- GET /api/auth/Userlog.php — Get logged-in use

* Cart Function:
- remove cart
- clear cart
- totalPrice

Authentication 
- AuthContext - handle login/logout/userstate