const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

console.log("🔍 API_URL en uso:", API_URL); // 👀 Ver en la consola si la URL se carga bien

// ✅ Obtener todas las categorías
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error(`Error al obtener categorías: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en getCategories:", error);
        return [];
    }
};

// ✅ Crear una nueva categoría
export const createCategory = async (categoryData) => {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        });
        if (!response.ok) throw new Error(`Error al crear categoría: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en createCategory:", error);
        return null;
    }
};

// ✅ Obtener todas los productos
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error(`Error al obtener productos: ${response.statusText}`);
        const data = await response.json();
        
        // ✅ Asegurar que `id_producto` se use como `id`
        return data.map(product => ({
            ...product,
            id: product.id_producto,
            categoriaId: product.id_categoria, // Para que coincida con el frontend
        }));
    } catch (error) {
        console.error("❌ Error en getProducts:", error);
        return [];
    }
};

// ✅ Crear un nuevo producto
export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error(`Error al crear producto: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en createProduct:", error);
        return null;
    }
};

// ✅ Obtener un solo producto por ID
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error(`Error al obtener producto: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en getProductById:", error);
        return null;
    }
};

// ✅ Actualizar un producto
export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error(`Error al actualizar producto: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en updateProduct:", error);
        return null;
    }
};

// ✅ Eliminar un producto
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`Error al eliminar producto: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Error en deleteProduct:", error);
        return null;
    }
};
