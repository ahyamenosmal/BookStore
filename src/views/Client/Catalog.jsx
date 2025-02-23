import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/General/Footer.jsx";
import Sidebar from "../../components/Catalog/Sidebar.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";

function Catalog() {
  const { productos, categorias } = useAPI();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // ✅ Corrección: Obtener `id_categoria` en lugar de `id`
  const categoriaSeleccionadaId = categorias.find(
    (cat) => cat.nombre === categoriaSeleccionada
  )?.id_categoria; 

  // ✅ Corrección: Asegurar que `categoriaId` en productos coincida con `id_categoria` en la base de datos
  const productosFiltrados = categoriaSeleccionadaId
    ? productos.filter(
        (producto) => producto.id_categoria === categoriaSeleccionadaId
      )
    : productos;

  console.log("📌 Categoría seleccionada:", categoriaSeleccionada);
  console.log("📌 ID de la categoría seleccionada:", categoriaSeleccionadaId);
  console.log("📌 Productos filtrados:", productosFiltrados);

  return (
    <>
      <header className="h-10"></header>
      <Navbar />
      <div className="flex flex-row">
        <div>
          <Sidebar setCategoriaSeleccionada={setCategoriaSeleccionada} />
        </div>

        <div className="container mx-auto">
          <div className="row">
            <div className="flex-row justify-items-center col-md-12">
              <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                Nuestro catálogo
              </h1>

              <motion.div
                className="my-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PaginatedProducts products={productosFiltrados} productsPerPage={9} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalog;
