import React, { useState } from "react";
import { motion } from "framer-motion";
import PersonalDataForm from "./PersonalDataForm.jsx";
import OrderHistory from "./OrderHistory.jsx";
// import SalesHistory from "./SalesHistory.jsx";
import Favorites from "./Favorites.jsx";
// import UserActivity from "./UserActivity.jsx";
import Sidebar from "../Catalog/Sidebar.jsx";
import Layout from "../General/Layout.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useCart } from "../../contexts/CartContext.jsx";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("datos");
  const { logout } = useAuth();
  const { clearCart } = useCart();

  const handleLogout = () => {
    clearCart(); // Limpia el carrito
    logout();    // Ejecuta el cierre de sesión
  };

  const sections = [
    { key: "datos", label: "Mis Datos" },
    { key: "compras", label: "Mis Compras" },
    // { key: "ventas", label: "Mis Ventas" },
    { key: "favoritos", label: "Favoritos" },
    // { key: "historial", label: "Historial" },
    { key: "Cerrar Sesión", label: "Cerrar Sesión" },
  ];

  return (
    <>
      <header className="h-10"></header>
      <Layout>
        <Sidebar
          items={sections}
          selectedItem={activeSection}
          setSelectedItem={setActiveSection}
          getItemLabel={(item) => item.label}
          getItemValue={(item) => item.key}
          allText=""
        />

        <div className=" pt-12  min-w-max max-w-2xl ">
          {activeSection === "datos" && <PersonalDataForm />}
          {activeSection === "compras" && <OrderHistory />}
          {activeSection === "favoritos" && <Favorites />}
          {activeSection === "Cerrar Sesión" && (
            <button 
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}>
              Cerrar Sesión
              </button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
