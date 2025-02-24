import React from "react";
import { motion } from "framer-motion";

const OrderHistory = () => {
  return (
    <div
      className="bg-red-400/25 p-6 rounded-lg shadow-md text-gray-900 w-96"
    >
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Compras
      </h2>
      <p className="mt-4 text-lg text-gray-700">Aún no has realizado compras.</p>
    </div>
  );
};

export default OrderHistory;

