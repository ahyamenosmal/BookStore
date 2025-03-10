import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/Client/Home.jsx";
import Catalog from "../views/Client/Catalog.jsx";
import Cart from "../views/Client/Cart.jsx";
import Login from "../views/Client/Login.jsx";
import ProductView from "../views/Client/ProductView.jsx"; 
import AdminDashboard from '../components/Admin/AdminDashboard.jsx'
import UserProfile from "../components/User/UserProfile.jsx";
import CategoryManager from "../components/Admin/CategoryManager.jsx";
import NotFoundPage from "../views/Client/NotFoundPage.jsx";
import LoginAdmin from "../components/Admin/LoginAdmin.jsx";
import ProductManager from "../components/Admin/ProductManager.jsx";


function AppRoutes() {
  return (
    <Routes>
      
      <Route path="*" element={<NotFoundPage />} />
      <Route path='/' element={<Home />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path="/producto/:id" element={<ProductView />} /> 
      <Route path='/loginadmin' element={<LoginAdmin />} />
      <Route path='/admin' element={<AdminDashboard />}>
        <Route path='categories' element={<CategoryManager />} />
        <Route path='products' element={<ProductManager />} />
        <Route path='orders' element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
