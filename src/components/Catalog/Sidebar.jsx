import { useState } from "react";
import { motion } from "framer-motion";
import { useAPI } from "../../contexts/APIContext";
import SidebarBg from "../../assets/sidebar_bg.svg";
import SidebarBgTop from "../../assets/sidebar_bg_top.svg";

function Sidebar({ setCategoriaSeleccionada, categoriaSeleccionada}) {
  const { categorias } = useAPI();
  

  return (
    <div className="fixed w-40 left-0 top-1/4 flex flex-col items-center">
      {/* Fondo del libro */}
      <img src={SidebarBg} alt="Background" className="absolute z-20 h-screen object-cover object-right" />

      {/* Página del libro */}
      <img src={SidebarBgTop} alt="Top Page" className="absolute z-50 h-screen w-20 object-cover object-right left-0" />

      {/* Categorías */}
      <div className="categories-wrapper flex flex-col space-y-8 mt-8">
        {/* Botón para mostrar todas las categorías */}
        <motion.div
            className={`relative z-40 w-40 h-12 text-xl flex items-center justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double  ${
              categoriaSeleccionada === null
                ? "bg-yellow-400 text-sky-900 border-sky-900"
                : "bg-sky-900 text-yellow-400 border-amber-500"
            }`} 
          initial={{ x: 50 }}
          whileHover={{ x: 70 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
          onClick={() => setCategoriaSeleccionada(null)} // Mostrar todos los productos
        >
          Todas
        </motion.div>

        {categorias.map((categoria, index) => (
          <motion.div
            key={index}
            className={`relative z-40 w-40 h-12 text-xl flex items-center justify-center rounded-r-lg cursor-pointer font-semibold border-b-4 border-r-4 border-double  ${
              categoriaSeleccionada === categoria.nombre
                ? "bg-yellow-400 text-sky-900 border-sky-900"
                : "bg-sky-900 text-yellow-400 border-amber-500"
            }`} 
            initial={{ x: 50 }}
            whileHover={{ x: 70 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
            onClick={() => {
              console.log("Categoría clickeada:", categoria.nombre);
              setCategoriaSeleccionada(categoria.nombre);
            }}
            
          >
            {categoria.nombre}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
