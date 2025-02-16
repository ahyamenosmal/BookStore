import { createContext, useContext, useState, useEffect } from "react";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [data, setData] = useState({ categorias: [], productos: [] });

  useEffect(() => {
    fetch("/productsData.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  console.log("Datos cargados:", data); // Log fuera del return

  return (
    <APIContext.Provider value={{ data, setData }}>
      {children}
    </APIContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(APIContext);
};
