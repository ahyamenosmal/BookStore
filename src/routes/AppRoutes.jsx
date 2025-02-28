import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/Client/Home.jsx";
import Catalog from "../views/Client/Catalog.jsx";
import Cart from "../views/Client/Cart.jsx";
import Login from "../views/Client/Login.jsx";
import UserProfile from "../components/User/UserProfile.jsx";
import Product from "../views/Client/Product.jsx";
import AdminLogin from "../views/Admin/AdminLogin.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx";
import AdminRoutes from "./AdminRoutes.jsx"; // ✅ Protege rutas de admin

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/product/:id" element={<Product />} />

      {/* Rutas de Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route element={<AdminRoutes />}> {/* Protege el dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
