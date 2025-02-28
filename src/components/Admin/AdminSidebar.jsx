import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import SidebarBg from "../../assets/sidebar_bg.svg";
import SidebarBgTop from "../../assets/sidebar_bg_top.svg";

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState("products");
  return (
    <div className="fixed w-40 left-0 top-1/4 flex flex-col items-center">
      <img 
        src={SidebarBg} 
        alt="Background" 
        className="absolute z-20 h-screen object-cover object-right"
      />
      <img 
        src={SidebarBgTop} 
        alt="Top Page" 
        className="absolute z-50 h-screen w-20 object-cover object-right left-0"
      />
      <motion.div
        className="categories-wrapper flex flex-col space-y-6 mt-40"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[{ key: "products", label: "Gestión de Productos" },
          { key: "orders", label: "Gestión de Órdenes" },
          { key: "categories", label: "Gestión de Categorías" }].map((item) => (
          <motion.div
            key={item.key}
            className={`relative z-40 w-48 h-14 bg-sky-900 text-yellow-400 text-lg flex items-center justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double border-amber-500 transition-all duration-200 ${
              activeSection === item.key ? "bg-blue-1000 text-sky-900" : "hover:bg-blue-1000"
            }`}
            onClick={() => setActiveSection(item.key)}
            initial={{ x: 50 }}
            animate={{ x: activeSection === item.key ? 70 : 50 }}
            whileHover={{ x: 70 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
          >
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex">
        <AdminSidebar />
        <div className="ml-56 w-full p-8">
          <Routes>
            <Route path="/admin/products" element={<h2>Gestión de Productos</h2>} />
            <Route path="/admin/orders" element={<h2>Gestión de Órdenes</h2>} />
            <Route path="/admin/categories" element={<h2>Gestión de Categorías</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;