import React from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { motion } from "framer-motion";
import ProductCard from "../General/ProductCard";
import { useAPI } from "../../contexts/APIContext";

const Favorites = () => {
  const { favorites } = useFavorites();
  const { productos } = useAPI();

  const favoritosCompletos = favorites
  .map((fav) => productos.find((prod) => prod.id_producto === fav.id_producto))
  .filter((prod) => prod !== undefined);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="p-6 bg-[#f9d0c5] rounded-lg shadow-lg">
        <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
          Mis Favoritos
        </h2>
        <p className="text-gray-600 text-lg">No tienes libros en favoritos.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f9c5b8] rounded-lg shadow-lg">
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Favoritos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {favoritosCompletos.map((fav) => (
          <motion.div
            key={fav.id_producto}  // Usamos el id único del producto
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard className="bg-[#f9f0df]"  producto={fav} />
          </motion.div>
        )
      )}
      </div>
    </div>
  );
};

export default Favorites;
