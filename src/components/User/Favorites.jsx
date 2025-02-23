import React from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useCart } from "../../contexts/CartContext";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="p-6 bg-red-400/25 rounded-lg shadow-lg">
        <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
          Mis Favoritos
        </h2>
        <p className="text-gray-600 text-lg">No tienes libros en favoritos.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-400/25 rounded-lg shadow-lg">
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Favoritos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {favorites.map((producto) => (
          <motion.div
            key={producto.id_producto} // ✅ Usamos id_producto del backend
            className="mt-44 mb-4 p-2 items-center grid grid-cols-2 relative w-full min-w-96 max-w-96 h-36 bg-[#f9f0df] border-gray-200 rounded-lg shadow-sm border-0 border-b-2 border-solid"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            {/* Imagen del producto, con una por defecto si está vacía */}
            <img
              className="absolute bottom-16 left-5 rounded-lg shadow-lg border-b-2 border-r-2 border-gray-800/20"
              src={producto.imagen || "https://placehold.co/150x220/png"} // ✅ Imagen por defecto
              alt={producto.nombre || "Sin nombre"}
              style={{ width: "150px", height: "220px" }}
            />

            {/* Botón de eliminar de favoritos */}
            <button
              className="absolute top-2 right-2 z-20 text-gray-400 hover:text-red-500 transition"
              onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(producto.id_producto); // ✅ Aseguramos el uso de id_producto
              }}
            >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </button>

            {/* Nombre del producto */}
            <div className="col-start-2 mt-2 pr-8 overflow-hidden">
              <h5 className="text-center text-lg font-semibold tracking-tighter text-gray-900 break-words whitespace-normal leading-tight">
                {producto.nombre || "Producto sin nombre"} {/* ✅ Manejo seguro */}
              </h5>
            </div>

            {/* Precio del producto */}
            <div className="col-start-1 ml-8 mt-6">
              <span className="text-xl font-bold text-gray-900">
                {producto.precio
                  ? producto.precio.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })
                  : "$0"} {/* ✅ Si precio no existe, muestra "$0" */}
              </span>
            </div>

            {/* Botón para agregar al carrito */}
            <div className="col-start-2 justify-self-center mt-6">
              <button
                className="px-4 py-2 bg-sky-900 text-white font-medium rounded-lg text-sm hover:bg-sky-950 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(producto);
                }}
              >
                Add to cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
