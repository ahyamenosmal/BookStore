import React from "react";
import { useCheckout } from "../../hooks/useCheckout";

const CheckoutButton = () => {
  const { checkout } = useCheckout();

  const handleCheckout = async () => {
    try {
      await checkout();
      alert("Compra registrada exitosamente");
    } catch (error) {
      alert("Error al registrar la compra: " + error.message);
    }
  };

  return (
    <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">
      Comprar
    </button>
  );
};

export default CheckoutButton;
