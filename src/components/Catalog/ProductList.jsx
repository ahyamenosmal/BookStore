import { useState } from "react";
import { useAPI } from "../../contexts/APIContext.jsx";
import Sidebar from "Sidebar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProducts.jsx";

const ProductList = () => {
    const { productos } = useAPI();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
    // Filtrar productos por categoría
    const productosFiltrados = categoriaSeleccionada
      ? productos.filter((producto) => producto.categoria === categoriaSeleccionada)
      : productos;
  
    return (
      <div className="flex">
        {/* Pasar la función setCategoriaSeleccionada como prop */}
        <Sidebar setCategoriaSeleccionada={setCategoriaSeleccionada} />
  
        {/* Mostrar productos filtrados */}
        <div className="flex-1 p-4">
          <PaginatedProducts products={productosFiltrados} />
        </div>
      </div>
    );
  };
  
  export default ProductList;