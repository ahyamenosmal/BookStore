import { createContext, useContext, useState } from "react";


const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); 

  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remover un producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el contexto del carrito
export function useCart() {
  return useContext(CartContext);
}
