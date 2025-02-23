import React from "react";
import { motion } from "framer-motion";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";

const ProductIdCard = ({ producto, isFav, toggleFavorite, addToCart }) => (
  <motion.div
    className="relative flex  max-w-5xl h-fit bg-red-400/25 rounded-lg shadow-lg p-6 border-b-2 border-gray-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ProductImg src={producto.imagen} alt={producto.titulo} />
    <ProductInfo
      producto={producto}
      isFav={isFav}
      toggleFavorite={toggleFavorite}
      addToCart={addToCart}
    />
  </motion.div>
);

export default ProductIdCard;
