import React, { useState } from "react";
import Navbar from "../../components/General/Navbar.jsx";
import PersonalDataForm from "./PersonalDataForm.jsx";
import OrderHistory from "./OrderHistory.jsx";
import SalesHistory from "./SalesHistory.jsx";
import Favorites from "./Favorites.jsx";
import UserActivity from "./UserActivity.jsx";
import SidebarBg from "../../assets/sidebar_bg.svg";
import SidebarBgTop from "../../assets/sidebar_bg_top.svg";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("datos");
  const commonClasses =
    "relative z-40 w-40 h-12 flex items-center text-xl justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double border-amber-500";
  const activeClasses = "bg-yellow-400 text-sky-900 border-sky-900";
  const inactiveClasses = "bg-sky-900 text-yellow-400 border-amber-500";

  return (
    <>
      <Navbar /> {/* 🔹 Agregado el Navbar para mantener la navegación */}
      <div className="flex min-h-screen bg-[#f9f0df]">
        {/* Sidebar con la estética de bookstore */}
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

          {/* Menú lateral 📚 */}
          <div className="categories-wrapper flex flex-col space-y-8 mt-32">
            <motion.div
              className={`${commonClasses} ${
                activeSection === "datos" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("datos")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Mis Datos
            </motion.div>

            <motion.div
              className={`${commonClasses} ${
                activeSection === "compras" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("compras")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Mis Compras
            </motion.div>

            <motion.div
              className={`${commonClasses} ${
                activeSection === "ventas" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("ventas")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Mis Ventas
            </motion.div>

            <motion.div
              className={`${commonClasses} ${
                activeSection === "favoritos" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("favoritos")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Favoritos
            </motion.div>

            <motion.div
              className={`${commonClasses} ${
                activeSection === "historial" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("historial")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Historial
            </motion.div>
          </div>
        </div>

        {/* Contenido dinámico 📄 */}
        <div className="ml-48 w-full p-8">
          {activeSection === "datos" && <PersonalDataForm />}
          {activeSection === "compras" && <OrderHistory />}
          {activeSection === "ventas" && <SalesHistory />}
          {activeSection === "favoritos" && <Favorites />}
          {activeSection === "historial" && <UserActivity />}
        </div>
      </div>
    </>
  );
};

export default UserProfile;