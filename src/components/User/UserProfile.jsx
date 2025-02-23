import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/General/Navbar.jsx";
import PersonalDataForm from "./PersonalDataForm.jsx";
import OrderHistory from "./OrderHistory.jsx";
import SalesHistory from "./SalesHistory.jsx";
import Favorites from "./Favorites.jsx";
import UserActivity from "./UserActivity.jsx";
import SidebarBg from "../../assets/sidebar_bg.svg";
import SidebarBgTop from "../../assets/sidebar_bg_top.svg";
import Footer from "../../components/General/Footer.jsx";


const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("datos");
  const commonClasses =
    "relative z-40 w-40 h-12 flex items-center text-xl justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double border-amber-500";
  const activeClasses = "bg-yellow-400 text-sky-900 border-sky-900";
  const inactiveClasses = "bg-sky-900 text-yellow-400 border-amber-500";

  return (
    <>

    <header className="h-10"></header>
      <Navbar />
      <div className="flex min-h-screen bg-[#f9f0df]">
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
            {[
              { key: "datos", label: "Mis Datos" },
              { key: "compras", label: "Mis Compras" },
              { key: "ventas", label: "Mis Ventas" },
              { key: "favoritos", label: "Favoritos" },
              { key: "historial", label: "Historial" },
            ].map((item) => (
              <motion.div
                key={item.key}
                className={`relative z-40 w-48 h-14 bg-sky-900 text-yellow-400 text-lg flex items-center justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double border-amber-500 transition-all duration-200 ${
                  activeSection === item.key
                    ? "bg-blue-1000 text-sky-900"
                    : "hover:bg-blue-1000"
                }`}
                onClick={() => setActiveSection(item.key)}
                initial={{ x: 50 }}
                animate={{ x: activeSection === item.key ? 70 : 50 }}
                whileHover={{ x: 70 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)", // 🔹 Aplica el mismo diseño diagonal de `Catalog.jsx`
                }}
              >
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="ml-56 w-full p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={activeSection} // 🔹 Forzar animación en cambios
        >
          {activeSection === "datos" && (
            <motion.div

              className={`${commonClasses} ${
                activeSection === "datos" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("datos")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <PersonalDataForm />
            </motion.div>
          )}
          {activeSection === "compras" && (
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}

              className={`${commonClasses} ${
                activeSection === "compras" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("compras")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}

            >
              <OrderHistory />
            </motion.div>
          )}
          {activeSection === "ventas" && (
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}

              className={`${commonClasses} ${
                activeSection === "ventas" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("ventas")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}

            >
              <SalesHistory />
            </motion.div>
          )}
          {activeSection === "favoritos" && (
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}

              className={`${commonClasses} ${
                activeSection === "favoritos" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("favoritos")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}

            >
              <Favorites />
            </motion.div>
          )}
          {activeSection === "historial" && (
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}

              className={`${commonClasses} ${
                activeSection === "historial" ? activeClasses : inactiveClasses
              }`}
              onClick={() => setActiveSection("historial")}
              initial={{ x: 50 }}
              whileHover={{ x: 70 }}
              transition={{ type: "spring", stiffness: 200 }}

            >
              <UserActivity />
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;