import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const toggleFavorite = (producto) => {
    const isFav = isFavorite(producto.id);
    if (isFav) {
      removeFromFavorites(producto.id);
    } else {
      setFavorites([...favorites, producto]);
    }
  };

  // 🔹 FUNCIÓN NUEVA para eliminar favoritos
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
