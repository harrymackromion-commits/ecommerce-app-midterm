import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Faqs from "../Pages/Faqs/Faqs";
import Help from "../Pages/Help/Help";
import Error from "../Error/Error";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products/Products";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="help" element={<Help />} />
        <Route path="/products" element={<Products />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
