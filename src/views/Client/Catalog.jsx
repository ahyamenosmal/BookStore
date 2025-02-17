import React, { useState } from "react";
import Footer from "../../components/General/Footer.jsx";
import Sidebar from "../../components/Catalog/Sidebar.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";

function Catalog() {
  const { productos, categorias } = useAPI();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Estado para la categoría

//obtener el id de la categoría seleccionada
const categoriaSeleccionadaId = categorias.find(
  (cat) => cat.nombre === categoriaSeleccionada
)?.id;

  // Filtrar productos por categoría
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoriaId === categoriaSeleccionadaId)
    : productos;

  console.log("Categoría seleccionada:", categoriaSeleccionada);
  console.log("ID de la categoría seleccionada:", categoriaSeleccionadaId);
  console.log("Productos filtrados:", productosFiltrados);

  return (
    <>
      <header className="h-10"></header>
      <Navbar />
      <div className="flex flex-row ">
        <div>
          {/* 🔹 Pasamos setCategoriaSeleccionada a Sidebar */}
          <Sidebar setCategoriaSeleccionada={setCategoriaSeleccionada} />
        </div>

        <div className="container mx-auto">
          <div className="row">  
            <div className="flex-row justify-items-center col-md-12">
              <h1 className="text-star text-5xl m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                Nuestro catálogo
              </h1>
              <div className="my-16">
                {/* 🔹 Usamos productosFiltrados en lugar de productos */}
                <PaginatedProducts
                  products={productosFiltrados}
                  productsPerPage={9}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalog;
