export default class APIService {
    constructor() {
      this.API_URL = import.meta.env.VITE_API_URL;
    }
  
    async fetchCategorias() {
      try {
        const response = await fetch(`${this.API_URL}/scripta-backend/v1/categories`);
        if (!response.ok) throw new Error("Error al obtener categorías");
        return await response.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  
    async fetchProductos() {
      try {
        const response = await fetch(`${this.API_URL}/scripta-backend/v1/products`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  
    async fetchProductoById(id) {
      try {
        const response = await fetch(`${this.API_URL}/scripta-backend/v1/products/${id_producto}`);
        if (!response.ok) throw new Error(`Error al obtener el producto con ID ${id_producto}`);
        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    
    async loginUser(credentials) {
        try {
          const response = await fetch(`${this.API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
      
          if (!response.ok) {
            throw new Error("Error en la autenticación");
          }
      
          return await response.json(); // Devolver el token o datos del usuario
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
          return null;
        }
      }
      


  }
  