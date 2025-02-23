import React from "react";
import Navbar from "../../components/General/Navbar";
import Footer from "../../components/General/Footer.jsx";
import { useParams } from "react-router-dom";
import { useAPI } from "../../contexts/APIContext";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const { productos, categorias } = useAPI();
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();

  const producto = productos.find((prod) => prod.id === parseInt(id));
  if (!producto)
    return <p className="text-center mt-10 text-lg">Producto no encontrado</p>;

  const isFav = favorites.some((fav) => fav.id === producto.id);

  const categoriaProducto = categorias.find(
    (cat) => cat.id === producto.categoriaId
  )?.nombre;

  return (
    <>
      <header className="h-16"></header>
      <Navbar />

      <h1 className="text-5xl font-lathusca mx-40 mt-10 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
        {categoriaProducto}
      </h1>

      <div className="flex justify-center items-center min-h-screen bg-[#f9f0df] p-5">
        <motion.div
          className="relative flex w-4/5 max-w-4xl bg-red-400/25 rounded-lg shadow-lg p-6 border-b-2 border-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={producto.imagen}
            alt={producto.titulo}
            className="w-[450px] h-[660px] rounded-lg shadow-lg border-gray-300 border-b-2 border-r-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="flex flex-col justify-between p-8 rounded-lg w-3/5 ml-[-50px] z-10 pl-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {producto.titulo}
                </h2>
                <p className="text-gray-700 font-semibold text-lg">
                  {producto.autor}
                </p>

                <p className="text-gray-700 text-lg mt-1">
                  {producto.descripcion}
                </p>
              </div>
              <button onClick={() => toggleFavorite(producto)}>
                <Heart
                  className={`w-7 h-7 ${
                    isFav ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-gray-900 font-bold text-lg">
                  Stock:{" "}
                  <span className="text-gray-700 font-medium">
                    {producto.stock > 0 ? producto.stock : "Agotado"}
                  </span>
                </p>
                <span className="text-3xl font-bold text-gray-900">
                  {producto.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </span>
              </div>
              <motion.button
                onClick={() => addToCart(producto)}
                className="px-10 py-4 bg-sky-900 text-white font-medium rounded-lg text-sm hover:bg-sky-950 transition"
                whileHover={{ scale: 1.1 }}
              >
                Add to cart
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
