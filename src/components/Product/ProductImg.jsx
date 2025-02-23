import React from "react";
import { motion } from "framer-motion";

const ProductImg = ({ src, alt }) => (
  <motion.img
    src={src}
    alt={alt}
    className="w-96 mr-5 rounded-lg shadow-lg border-gray-300 border-b-2 border-r-2"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3 }}
  />
);

export default ProductImg;
