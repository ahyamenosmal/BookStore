import React, { useEffect, useState } from "react";
import Navbar from "../../components/General/Navbar";
import Footer from "../../components/General/Footer.jsx";
import { useParams } from "react-router-dom";
import { useAPI } from "../../contexts/APIContext";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Product = () => {
  const { id } = useParams(); // ✅ Obtener ID de la URL
  const { productos, categorias } = useAPI();
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    console.log("🟢 ID en la URL:", id);
    console.log("🟢 Productos en APIContext:", productos);
    
    const idNumero = Number(id);
    
    // 🔍 Buscar el producto con `id_producto`
    const productoEncontrado = productos.find((prod) => Number(prod.id_producto) === idNumero);
 
    if (!productoEncontrado) {
      console.error("❌ Producto no encontrado:", idNumero);
    }
    
    setProducto(productoEncontrado);
  }, [id, productos]);

  if (!producto) {
    return <p className="text-center mt-10 text-lg">❌ Producto no encontrado</p>;
  }

  const isFav = favorites.some((fav) => fav.id_producto === producto.id_producto);
  const categoriaProducto = categorias.find(
    (cat) => cat.id_categoria === producto.id_categoria
  )?.nombre;

  return (
    <>
      <header className="h-16"></header>
      <Navbar />

      <h1 className="text-5xl font-lathusca mx-40 mt-10 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
        {categoriaProducto || "Categoría desconocida"}
      </h1>

      <div className="flex justify-center items-center min-h-screen bg-[#f9f0df] p-5">
        <motion.div
          className="relative flex w-4/5 max-w-4xl bg-red-400/25 rounded-lg shadow-lg p-6 border-b-2 border-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ✅ Imagen del producto */}
          <motion.img
            src={producto.imagen || "https://placehold.co/300x400/png"}
            alt={producto.nombre}
            className="w-[450px] h-[660px] rounded-lg shadow-lg border-gray-300 border-b-2 border-r-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* ✅ Información del producto */}
          <motion.div
            className="flex flex-col justify-between p-8 rounded-lg w-3/5 ml-[-50px] z-10 pl-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{producto.nombre}</h2>
                <p className="text-gray-700 font-semibold text-lg">{categoriaProducto}</p>
                <p className="text-gray-700 text-lg mt-1">{producto.descripcion || "No hay descripción disponible"}</p>
              </div>

              {/* ✅ Botón de favoritos */}
              <button onClick={() => toggleFavorite(producto)}>
                <Heart className={`w-7 h-7 ${isFav ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
              </button>
            </div>

            {/* ✅ Stock y precio */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-gray-900 font-bold text-lg">
                  Stock: <span className="text-gray-700 font-medium">{producto.stock > 0 ? producto.stock : "Agotado"}</span>
                </p>
                <span className="text-3xl font-bold text-gray-900">
                  {producto.precio?.toLocaleString("es-CL", { style: "currency", currency: "CLP" }) || "$0"}
                </span>
              </div>

              {/* ✅ Botón "Añadir al carrito" */}
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
