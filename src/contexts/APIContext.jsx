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
  const [addProducto] = useState(null);


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

  const updateProductos = async (updatedProducto) => {
    try {
      
      const result = await apiService.updateProduct(
        updatedProducto.id_producto,
        updatedProducto.nombre,
        updatedProducto.autor,
        updatedProducto.descripcion,
        updatedProducto.precio,
        updatedProducto.stock,
        updatedProducto.imagen,
        updatedProducto.id_categoria
      );
      // Actualizar el estado local de productos
      setProductos((prevProductos) =>
        prevProductos.map((prod) =>
          prod.id_producto === result.id_producto ? result : prod
        )
      );
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProductos = async (id_producto) => {
    try {
      const result = await apiService.deleteProduct(id_producto);
      setProductos((prevProductos) =>
        prevProductos.filter((prod) => prod.id_producto !== id_producto)
      );
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const addProductos = async (newProduct) => {
    try {
      console.log("Agregando producto:", newProduct);

      const result = await apiService.addProducto(newProduct);
      setProductos((prevProductos) => [...prevProductos, result]);
      return result;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  };


  const updateCategorias = async (updatedCategoria) => {
    try {
      const result = await apiService.updateCategorias(
      updatedCategoria.id_categoria,
      updatedCategoria.nombre,
      updatedCategoria.descripcion
      );

      setCategorias((prevCategorias) =>
        prevCategorias.map((cat) =>
          cat.id_categoria === result.id_categoria ? result : cat
        )
      );
      return result;
    } catch (error) {
      console.error("Error updating categorias:", error);
      throw error;
    }
  };

  const deleteCategorias = async (id_categoria) => {
    try {
      const result = await apiService.deleteCategorias(id_categoria);
      setCategorias((prevCategorias) =>
        prevCategorias.filter((cat) => cat.id_categoria !== id_categoria)
      );
      return result;
    } catch (error) {
      console.error("Error deleting categorias:", error); 
    }
  };

  const addCategoria = async (newCategory) => {
    try {
      const result = await apiService.addCategory(newCategory);
      setCategorias((prevCategorias) => [...prevCategorias, result]);
      return result;
    } catch (error) {
      console.error("Error en addCategoria:", error);
      throw error;
    }
  };

  return (
    <APIContext.Provider value={{ categorias, productos, historial, loading, loadingHistorial, apiService, addProductos, updateProductos, deleteProductos, updateCategorias, deleteCategorias, addCategoria }}>
      {children}
    </APIContext.Provider>
  );
};

// Hook para acceder a categorías y productos
export const useAPI = () => useContext(APIContext);
