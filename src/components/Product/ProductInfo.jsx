import React from "react";
import { motion } from "framer-motion";
import ProductDetails from "./ProductDetails";
import ProductInteractive from "./ProductInteractive";

const ProductInfo = ({ producto, isFav, toggleFavorite, addToCart }) => (
  <motion.div
    className="flex flex-col justify-between  rounded-lg   z-10 "
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ProductDetails
      producto={producto}
      isFav={isFav}
      toggleFavorite={toggleFavorite}
    />
    <ProductInteractive producto={producto} addToCart={addToCart} />
  </motion.div>
);

export default ProductInfo;
