import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import MainRoutes from './Main/MainRoutes.jsx'
import { CartProvider } from './Context/CartContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
     <CartProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
     </CartProvider>
    </AuthProvider>
  </StrictMode>
);
