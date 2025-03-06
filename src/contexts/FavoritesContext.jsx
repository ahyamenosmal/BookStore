import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
  const [loading, setLoading] = useState(true);

  // Verifica si hay usuario y carga los favoritos desde localStorage
  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Guarda los favoritos en localStorage cuando cambian y hay usuario
  useEffect(() => {  
    if (user) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, user]);

  // Comprueba si un producto está en favoritos
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id_producto === productId);
  };

  // Alterna un producto en favoritos
  const toggleFavorite = async (producto) => {
    if (!user) {
      alert("Debes estar logeado para añadir favoritos");
      return;
    }
  
    const isFav = favorites.some((fav) => fav.id_producto === producto.id_producto);
    const token = localStorage.getItem("token");
  
    if (isFav) {
      // Buscar el favorito en la lista antes de eliminarlo
      const favoritoExistente = favorites.find((fav) => fav.id_producto === producto.id_producto);
      
      if (!favoritoExistente || !favoritoExistente.id_favorito) {
        console.error("No se encontró el ID del favorito a eliminar.");
        return;
      }
  
      try {
        const response = await fetch(
          `${API_URL}/scripta-backend/v1/favoritos/${favoritoExistente.id_favorito}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          // Eliminar el producto de favoritos en el estado
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id_producto !== producto.id_producto)
          );
        } else {
          console.error("Error al eliminar favorito en el servidor");
        }
      } catch (error) {
        console.error("Error al eliminar favorito:", error);
      }
    } else {
      // Agregar el favorito vía POST
      try {
        const response = await fetch(`${API_URL}/scripta-backend/v1/favoritos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(producto),
        });
  
        if (response.ok) {
          const newFavorite = await response.json();
          setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        } else {
          console.error("Error al agregar favorito en el servidor");
        }
      } catch (error) {
        console.error("Error al agregar favorito:", error);
      }
    }
  };

  // Función para obtener favoritos del backend (si se requiere persistencia)
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/scripta-backend/v1/favoritos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un favorito al backend (si se requiere persistencia)
  const addFavorite = async (product) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/scripta-backend/v1/favoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const newFavorite = await response.json();
        setFavorites([...favorites, newFavorite]);
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  // Función para eliminar un favorito
  const removeFavorite = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/scripta-backend/v1/favoritos/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.id_producto !== productId));
      }
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  // Función para limpiar todos los favoritos
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFavorite, clearFavorites, addFavorite, fetchFavorites, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
