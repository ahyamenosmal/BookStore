import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/General/Layout.jsx";
import Sidebar from "../../components/Catalog/Sidebar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";

function Catalog() {
  const { productos, categorias } = useAPI();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categoriaSeleccionadaId = categorias.find(
    (cat) => cat.nombre === categoriaSeleccionada
  )?.id;

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoriaId === categoriaSeleccionadaId
      )
    : productos;

  return (
    <>

      <Layout>
        <div className="flex flex-row ml-32">
          <div>
            <Sidebar 
              items={categorias}
              selectedItem={categoriaSeleccionada}
              setSelectedItem={setCategoriaSeleccionada}
              getItemLabel={(categoria) => categoria.nombre}
            />
          </div>

          <div className="container mx-auto">
            <div className="row">
              <div className="flex-row justify-items-center col-md-12">
                <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                  Nuestro catalogo
                </h1>

                <motion.div
                  className="my-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PaginatedProducts
                    products={productosFiltrados}
                    productsPerPage={9}
                    renderProduct={(product, index) => (
                      <motion.div
                        key={product.id}
                        className="shadow-md rounded-lg overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {product}
                      </motion.div>
                    )}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Catalog;
