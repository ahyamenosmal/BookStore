import React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetails = ({ producto, isFav, toggleFavorite }) => {
  const variants = {
    initial: { scale: 1 },
    pulse: { scale: [1, 1.5, 1] }
  };

  return (
    <div className="flex justify-between items-start px-5">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">{producto.nombre}</h2>
        <p className="text-gray-700 font-semibold text-lg">{producto.autor}</p>
        <p className="text-gray-700 text-lg mt-1">{producto.descripcion}</p>
      </div>
      <button onClick={() => toggleFavorite(producto)}>
        <motion.div
          whileTap={{ scale: 0.8 }}
          animate={isFav ? "pulse" : "initial"}
          variants={variants}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          <Heart
            className={`w-12 h-12 ${
              isFav ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </motion.div>
      </button>
    </div>
  );
};

export default ProductDetails;

