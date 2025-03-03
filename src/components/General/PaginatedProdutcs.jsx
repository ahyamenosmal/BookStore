import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const PaginatedProducts = ({ products, productsPerPage = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products]);

  console.log("Productos en PaginatedProducts:", products); // <-- Agregar para depuración

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-red-500">No hay productos disponibles.</p>
    );
  }

  const handleNext = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 justify-items-center">
        {products
          .slice(currentIndex, currentIndex + productsPerPage)
          .map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + productsPerPage >= products.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedProducts;
