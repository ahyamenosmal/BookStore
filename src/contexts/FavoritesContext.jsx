import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  //se agrega verificacion de usuario
  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const toggleFavorite = (producto) => {
    if (!user) {
      alert("Debes estar logeado para añadir favoritos");
      return;
    }


    const isFav = isFavorite(producto.id);
    if (isFav) {
      removeFromFavorites(producto.id);
    } else {
      setFavorites([...favorites, producto]);
    }
  };

  // para eliminar 1 favorito
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
  };

  //función para limpiar todos los favoritos
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFromFavorites, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
