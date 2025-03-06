import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import OrderItem from "./OrderItem";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const OrderHistory = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchHistory = async () => {
        if (!user) return;
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://bookstore-backend-bw7r.onrender.com/scripta-backend/v1/purchase-history/${user.info.id_usuario}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error al obtener el historial de compras");
          }
          const data = await response.json();
          setHistory(data);
        } catch (error) {
          console.error("Error fetching purchase history:", error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHistory();
    }, [user]);
  
    if (loading) {
      return (
<div className="flex flex-col items-center justify-center p-6 bg-[#f9d0c5] rounded-lg shadow-lg ">
    <DotLottieReact
      src="https://lottie.host/235bc1d3-e7b0-4cf5-ac4c-7f1e605ecbcd/FuvISPEoeP.lottie"
      loop
      autoplay
    />
          <p className="text-3xl ">Cargando productos...</p>
        </div>
      );
    }
  
    if (!history || history.length === 0) {
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


