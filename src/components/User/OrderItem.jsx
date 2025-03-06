import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAPI } from "../../contexts/APIContext";

const OrderItem = ({ order, token }) => {
  const { productos } = useAPI();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

  const fetchOrderDetails = async () => {
    setLoadingDetails(true);
    try {
      const response = await fetch(
        `${API_URL}/scripta-backend/v1/purchase-history/details/${order.id_pedido}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener detalles del pedido");
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching order details:", error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleToggle = () => {
    if (!open && !details) {
      // Si aún no se han cargado los detalles, hacer la llamada a la API
      fetchOrderDetails();
    }
    setOpen(!open);
  };

  return (
    <div className="rounded-lg border-gray-800/20 shadow-sm border-0 border-b-2 border-solid p-4 bg-[#f9d0c5] ">
      {/* Información básica del pedido */}
      <div
        className="grid grid-cols-4 gap-4 items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div>
          <p className="text-gray-500">
            <strong>ID Pedido:</strong> {order.id_pedido}
          </p>
          <p className="text-gray-500">
            <strong>Fecha:</strong>{" "}
            {new Date(order.fecha_pedido).toLocaleDateString("es-CL")}
          </p>
          <p className="text-gray-500">
            <strong>Estado:</strong> {order.estado}
          </p>
          <p className="text-2xl">
            <strong >Total:</strong>{" "}
            {Number(order.total).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </p>
        </div>
        <button className="bg-sky-900 text-white px-3 py-1 rounded col-start-4">
          {open ? "Ocultar detalles" : "Mostrar detalles"}
        </button>
      </div>

      {/* Detalles del pedido */}
      {open && (
        <div className="mt-4 border-t border-gray-800/20 pt-4">
          {loadingDetails ? (
            <p>Cargando detalles...</p>
          ) : details && details.length > 0 ? (
            <ul className="space-y-2">
              {details.map((detalle, index) => {
                // Buscar el producto correspondiente en la lista de productos
                const product = productos.find(
                  (prod) => prod.id_producto === detalle.id_producto
                );
                return (
                  <li
                    key={index}
                    className="p-2 bg-red-400/50 rounded flex items-center space-x-4"
                  >
                    {product && (
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-16 h-30 object-cover rounded"
                      />
                    )}
                    <div>
                      <p>
                        <strong>Producto:</strong>{" "}
                        {product ? product.nombre : detalle.id_producto}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {detalle.cantidad}
                      </p>
                      <p>
                        <strong>Precio Unitario:</strong>{" "}
                        {detalle.precio_unitario.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No hay detalles disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
