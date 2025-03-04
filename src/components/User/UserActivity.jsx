import React from "react";
import { motion } from "framer-motion";

const UserActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#f9d0c5] p-6 rounded-lg shadow-md text-gray-900"
    >
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Historial de Actividad
      </h2>
      <p className="mt-4 text-lg text-gray-700">Aún no tienes actividad registrada.</p>
    </motion.div>
  );
};

export default UserActivity;
