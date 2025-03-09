import React, { useState, useEffect } from "react";
import { useAPI } from "../../contexts/APIContext";
import OrderItem from "./OrderItem";
import LoadingAnimation from "../General/LoadingAnimation";


const OrderHistory = () => {
    const { historial, loadingHistorial } = useAPI();
    const [history] = useState(historial);

    if (loadingHistorial) {
      return (
        <LoadingAnimation 
          src="https://lottie.host/235bc1d3-e7b0-4cf5-ac4c-7f1e605ecbcd/FuvISPEoeP.lottie"
          width="200px"
          height="200px"
          text="Cargando historial..."
        />
      );
    }

    if (history.length === 0) {
      return (
        <div className="p-6 bg-[#f9c5b8] rounded-lg shadow-lg">
          <p>No se encontraron compras.</p>
        </div>
      );
      }
      
      
    return (
      <div className="p-6 bg-[#f9c5b8] rounded-lg shadow-lg  ">
        <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">Historial de Compras</h2>
        {history.map((order) => (
          <OrderItem key={order.id_pedido} order={order} />
        ))}
      </div>
    );
  };
  

export default OrderHistory;


