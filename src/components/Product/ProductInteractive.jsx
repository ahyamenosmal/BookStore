import React from "react";
import { motion } from "framer-motion";

const ProductInteractive = ({ producto, addToCart }) => (
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
);

export default ProductInteractive;
