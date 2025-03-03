import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext"; // <-- Asegúrate de que existe
import { Heart } from "lucide-react";

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites(); // <-- Hook del FavoritesContext

  const isFav = favorites.some((fav) => fav.id === producto.id);

  if (!producto) return null;

  return (
    <div className="mt-44 mb-4 p-2 items-center grid grid-cols-2 relative w-full min-w-96 max-w-96 h-36 bg-red-400/25 border-gray-200 rounded-lg shadow-sm border-0 border-b-2 border-solid">
      <Link to={`/producto/${producto.id_producto}`}>
        <img
          className="absolute bottom-16 left-5 rounded-lg shadow-lg border-b-2 border-r-2 border-gray-800/20"
          src={producto.imagen}
          alt={producto.nombre}
          style={{ width: "150px", height: "220px" }}
        />
      </Link>

      <button
        className="absolute top-2 right-2 z-20 text-gray-400 hover:text-red-500 transition"
        onClick={(e) => {
          e.stopPropagation(); // Evita navegar al detalle
          toggleFavorite(producto);
        }}
      >
        <Heart
          className={`w-6 h-6 ${isFav ? "text-red-500 fill-red-500" : ""}`}
        />
      </button>

      <div className="col-start-2 mt-2 pr-8 overflow-hidden">
        <h5 className="text-center text-lg font-semibold tracking-tighter text-gray-900 dark:text-white break-words whitespace-normal leading-tight">
          {producto.nombre}
        </h5>
      </div>

      <div className="col-start-1 ml-8 mt-6">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          {producto.precio.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </span>
      </div>

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
    </div>
  );
};

export default ProductCard;
