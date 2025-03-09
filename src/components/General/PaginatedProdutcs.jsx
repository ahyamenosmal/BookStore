import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const PaginatedProducts = ({ products, productsPerPage = 3, showPagination = true, randomize = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    if (randomize) {
      // Mezclar productos aleatoriamente
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
      setDisplayedProducts(shuffledProducts.slice(0, productsPerPage));
    } else {
      setDisplayedProducts(products);
    }
    setCurrentIndex(0);
  }, [products, randomize, productsPerPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  if (!products || products.length === 0) {
    return <p className="text-center text-red-500">No hay productos disponibles.</p>;
  }

  const handlePageClick = (pageIndex) => {
    setCurrentIndex(pageIndex * productsPerPage);
  };

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
        {displayedProducts
          .slice(currentIndex, currentIndex + productsPerPage)
          .map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
      </div>

      {/* Mostrar la paginación solo si showPagination es true */}
      {showPagination && (
        <nav aria-label="Page navigation example" className="mt-4">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageClick(index)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                    currentIndex / productsPerPage === index
                      ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={handleNext}
                disabled={currentIndex + productsPerPage >= products.length}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default PaginatedProducts;
