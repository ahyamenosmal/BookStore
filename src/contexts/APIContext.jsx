import { createContext, useContext, useState, useEffect } from "react";
import APIService from "../services/APIservice.jsx";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const apiService = new APIService();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategorias = await apiService.fetchCategorias();
      const fetchedProductos = await apiService.fetchProductos();
      setCategorias(fetchedCategorias);
      setProductos(fetchedProductos);
    };
    fetchData();
  }, []);

  return (
    <APIContext.Provider value={{ categorias, productos, apiService }}>
      {children}
    </APIContext.Provider>
  );
};

// Hook para acceder a categorías y productos
export const useAPI = () => useContext(APIContext);
