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

    async fetchCategoriasById(id_categoria){
      try{
        const response = await fetch(`${this.API_URL}/scripta-backend/v1/categories/${id_categoria}`);
        if (!response.ok) throw new Error(`Error al obtener la categoria con ID ${id_categoria}`);
        return await response.json();
      }catch (error){
        console.error(error);
        return[];
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
      
      
     async fetchHistorial(user) {
          if (!user) return [];
          try {
            const token = localStorage.getItem("token");
            const response = await fetch(
              `${this.API_URL}/scripta-backend/v1/purchase-history/${user.info.id_usuario}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error("Error al obtener el historial de compras");
            }
            return await response.json();
          } catch (error) {
            console.error("Error obteniendo el historial de compras:", error.message);
            return [];
          }
        };

      async updateProduct(id_producto, nombre, autor, descripcion, precio, stock, imagen, id_categoria) {
       
  try {
    const token = localStorage.getItem("token");
if (!token) {throw new Error("No hay token disponible");
}

    const response = await fetch(`${this.API_URL}/scripta-backend/v1/products/${id_producto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, autor, descripcion, precio, stock, imagen, id_categoria })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al actualizar el producto: " + errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
}

  async deleteProduct(id_producto) {
    
    try {
      const token = localStorage.getItem("token");
if (!token) {throw new Error("No hay token disponible");
    }

      const response = await fetch(`${this.API_URL}/scripta-backend/v1/products/${id_producto}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    } 
    }

    async  addProducto(productoData) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token en localStorage");
        }
    
        const response = await fetch(`${this.API_URL}/scripta-backend/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productoData),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al agregar el producto: ${errorText}`);
        }
    
        return await response.json();
      } catch (error) {
        console.error("Error en addProducto:", error);
        throw error;
      }
    }
    

    

async updateCategorias(id_categoria, nombre, descripcion, ) {

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token en localStorage");
    }

    const response = await fetch(`${this.API_URL}/scripta-backend/v1/categories/${id_categoria}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"token"}`,
      },
      body: JSON.stringify({
        
        nombre: nombre, 
        descripcion: descripcion
      }),
    });
if (!response.ok)
  {
    const errorText = await response.text();
    throw new Error("Error al actualizar la categoria: " + errorText);
  }
  return await response.json();
} catch (error) {
  console.error("Error in updateCategorias:", error);
  throw error;}
}

async deleteCategorias (id_categoria){
  try {
    const token = localStorage.getItem("token");
if (!token) {throw new Error("No hay token disponible");
  }

    const response = await fetch(`${this.API_URL}/scripta-backend/v1/categories/${id_categoria}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  } 
  }

  async addCategory (categoryData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token en localStorage");
      }

      const response = await fetch(`${this.API_URL}/scripta-backend/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar categoría: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en APIService.addCategory:", error);
      throw error;
    }
  }




  }
  