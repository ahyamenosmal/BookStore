import { createContext, useContext, useState, useEffect } from "react";
import { getCategories, getProducts } from "../services/api"; // ✅ Importamos la API real

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // ✅ Cargar categorías y productos en paralelo
    Promise.all([getCategories(), getProducts()])
      .then(([categoriasData, productosData]) => {
        console.log("📌 Categorías cargadas:", categoriasData);
        console.log("📌 Productos cargados:", productosData);

        if (Array.isArray(categoriasData)) {
          setCategorias(categoriasData);
        } else {
          console.error("❌ Error: Formato inesperado en categorías", categoriasData);
          setError("Error al cargar categorías.");
        }

        if (Array.isArray(productosData)) {
          // ✅ Asegurar que cada producto tiene id_producto
          setProductos(
            productosData.map(prod => ({
              ...prod,
              id_producto: prod.id_producto || prod.id, // Compatibilidad con backend
            }))
          );
        } else {
          console.error("❌ Error: Formato inesperado en productos", productosData);
          setError("Error al cargar productos.");
        }
      })
      .catch((error) => {
        console.error("❌ Error al obtener datos:", error);
        setError("Error al cargar datos.");
      })
      .finally(() => setLoading(false)); // ✅ Solo desactiva loading cuando ambos datos llegan

  }, []);

  return (
    <APIContext.Provider value={{ categorias, productos, loading, error }}>
      {children}
    </APIContext.Provider>
  );
};

// ✅ Hook personalizado para acceder a categorías y productos
export const useAPI = () => useContext(APIContext);
