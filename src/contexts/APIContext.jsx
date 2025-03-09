import { createContext, useContext, useState, useEffect } from "react";
import APIService from "../services/APIservice.jsx";
import { useAuth } from "./AuthContext.jsx";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingHistorial, setLoadingHistorial] = useState(true);


  const apiService = new APIService();
  const { user } = useAuth();

  // Función para obtener los datos de las categorías y productos
  useEffect(() => {
    const fetchData = async () => {
      try{
      const fetchedCategorias = await apiService.fetchCategorias();
      const fetchedProductos = await apiService.fetchProductos();
      setCategorias(fetchedCategorias);
      setProductos(fetchedProductos);
    } catch (error) {
      console.error("Error al obtener los datos de productos:", error);
    } finally {
      setLoading(false);
    }
    };
    fetchData();
  }, []);

// Función para el historial de compras
useEffect(() => {
  const fetchUserHistorial = async () => {
    if (!user) {
      setHistorial([]);
      setLoadingHistorial(false);
      return;
    }
    setLoadingHistorial(true);
    const fetchedHistorial = await apiService.fetchHistorial(user);
    setHistorial(fetchedHistorial);
    setLoadingHistorial(false);
  };
  fetchUserHistorial();
  }, [user]);


  return (
    <APIContext.Provider value={{ categorias, productos, historial, loading, loadingHistorial, apiService }}>
      {children}
    </APIContext.Provider>
  );
};

// Hook para acceder a categorías y productos
export const useAPI = () => useContext(APIContext);
