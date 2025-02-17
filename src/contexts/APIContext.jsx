import { createContext, useContext, useState, useEffect } from "react";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/productsData.json")
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.categorias && jsonData.productos) {
          setCategorias(jsonData.categorias);
          setProductos(jsonData.productos);
        } else {
          console.error("El JSON no tiene la estructura esperada");
        }
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <APIContext.Provider value={{ categorias, productos }}>
      {children}
    </APIContext.Provider>
  );
};

// Hook para acceder a categorías y productos
export const useAPI = () => useContext(APIContext);
