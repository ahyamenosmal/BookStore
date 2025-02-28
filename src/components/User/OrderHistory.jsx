import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3000/scripta-backend/v1/purchase-history";

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`${API_URL}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error en getPurchaseHistory:", error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-red-400/25 p-6 rounded-lg shadow-md text-gray-900"
    >
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Compras
      </h2>
      {loading ? (
        <p>Cargando...</p>
      ) : orders.length === 0 ? (
        <p>Aún no has realizado compras.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id_pedido} className="mb-4">
            <p>
              Pedido #{order.id_pedido} - Fecha: {order.fecha_pedido} - Total:{" "}
              {order.total} - Estado: {order.estado}
            </p>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default OrderHistory;
