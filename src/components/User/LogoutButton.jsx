
import React from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { useFavorites } from "../../contexts/FavoritesContext.jsx";

const LogoutButton = () => {

  const { logout } = useAuth();
  const { clearCart } = useCart();
  const { clearFavorites } = useFavorites();

const handleLogout = () => {
    clearFavorites(); // Limpia los favoritos
    clearCart(); // Limpia el carrito
    logout();    // Ejecuta el cierre de sesión
  };
return (
<button 
className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
onClick={handleLogout}>
  Cerrar Sesión
  </button>
  );
};

export default LogoutButton;