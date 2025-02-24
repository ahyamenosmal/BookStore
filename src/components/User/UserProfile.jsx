import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalDataForm from "./PersonalDataForm.jsx";
import OrderHistory from "./OrderHistory.jsx";
import Favorites from "./Favorites.jsx";
import Sidebar from "../Catalog/Sidebar.jsx";
import Layout from "../General/Layout.jsx";
import LogoutButton from "./LogoutButton.jsx";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("datos");

  const sections = [
    { key: "datos", label: "Mis Datos" },
    { key: "compras", label: "Mis Compras" },
    { key: "favoritos", label: "Favoritos" },
    { key: "Cerrar Sesión", label: "Cerrar Sesión" },
  ];

  // Mapeo de sección a componente
  const sectionComponents = {
    datos: <PersonalDataForm />,
    compras: <OrderHistory />,
    favoritos: <Favorites />,
    "Cerrar Sesión": <LogoutButton />,
  };

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

<AnimatePresence mode="wait">
  {activeSection in sectionComponents && (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="pt-12 min-w-max max-w-2xl"
    >
      {sectionComponents[activeSection]}
    </motion.div>
  )}
</AnimatePresence>

      </Layout>
    </>
  );
};

export default UserProfile;
