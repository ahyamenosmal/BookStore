import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const useCheckout = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const checkout = async () => {
    if (!user) {
      console.error("No hay usuario autenticado");
      return;
    }
    if (cart.length === 0) {
      console.error("El carrito está vacío");
      return;
    }

    // Calcular total: suma de (precio * cantidad) de cada producto.
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Construir detalles: un array de objetos con id_producto, cantidad y precio_unitario.
    const detalles = cart.map((item) => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
    }));

    const payload = {
      id_usuario: user.info.id_usuario,
      fecha_pedido: new Date().toISOString().split("T")[0],
      total,
      estado: "pendiente", // o el estado que corresponda
      detalles,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/scripta-backend/v1/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar la compra");
      }

      const data = await response.json();
      console.log("Compra registrada exitosamente:", data);

      // Limpia el carrito una vez completada la compra
      clearCart();
      return data;
    } catch (error) {
      console.error("Error en el checkout:", error.message);
      throw error;
    }
  };

  return { checkout };
};
