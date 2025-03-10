import React from "react";
import { useCheckout } from "../../hooks/useCheckout";
import { useAuth } from "../../contexts/AuthContext";

const CheckoutButton = () => {
  const { checkout } = useCheckout();
  const { user } = useAuth();

  const handleCheckout = async () => {
    try {
      await checkout();

      if (!user) {
        alert("Debes estar logeado para realizar la compra");
        return;
      } else {
        alert("Compra registrada exitosamente");
      }
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      alert("Error al registrar la compra ");
    }
  };
  return (
    <div>
      <button
        onClick={handleCheckout}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Comprar
      </button>
    </div>
  );
};

export default CheckoutButton;
