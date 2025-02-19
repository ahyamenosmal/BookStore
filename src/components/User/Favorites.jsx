import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAPI } from "../../contexts/APIContext";
import { motion } from "framer-motion";

const Favorites = () => {
  const { productos } = useAPI();
  const { addToCart } = useCart();
  const [favoritos, setFavoritos] = useState([]);

  // 🔹 Cargar favoritos desde localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavorites);
  }, []);

  // 🔹 Eliminar de favoritos y actualizar localStorage
  const removeFromFavorites = (id) => {
    const updatedFavorites = favoritos.filter((fav) => fav.id !== id);
    setFavoritos(updatedFavorites);
    localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    console.log(`Libro con ID ${id} eliminado de favoritos.`);
  };

  return (
    <div className="p-6 bg-red-400/25 rounded-lg shadow-lg">
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Favoritos
      </h2>

      {favoritos.length === 0 ? (
        <p className="text-gray-600 text-lg">No tienes libros en favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favoritos.map((producto) => (
            <motion.div
              key={producto.id}
              className="relative w-full min-w-96 max-w-96 bg-white border-gray-200 rounded-lg shadow-md border-0 border-b-2 border-solid p-4 transition-transform duration-300 hover:scale-105"
            >
              {/* 🔹 Ícono de corazón para quitar de favoritos */}
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
                onClick={() => removeFromFavorites(producto.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-700 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                  4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                  14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                  6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              {/* 🔹 Imagen del libro */}
              <div className="flex justify-center">
                <img
                  className="rounded-lg shadow-lg border-b-2 border-r-2 border-gray-800/20 w-40 h-60 object-cover"
                  src={producto.imagen}
                  alt={producto.titulo}
                />
              </div>

              {/* 🔹 Título del libro */}
              <h5 className="text-center text-lg font-semibold text-black mt-4">
                {producto.titulo}
              </h5>

              {/* 🔹 Precio */}
              <div className="text-center text-2xl font-bold text-gray-900 mt-2">
                {producto.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </div>

              {/* 🔹 Botón de agregar al carrito */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => addToCart(producto)}
                  className="w-full text-white bg-sky-900 hover:bg-sky-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Agregar al carrito
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
