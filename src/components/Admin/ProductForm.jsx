import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useAPI } from "../../contexts/APIContext.jsx";

const ProductForm = () => {
  const { addProductos, categorias } = useAPI();
  const [form, setForm] = useState({
    nombre: "",
    autor: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
    id_categoria: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagenPreview(imageUrl);
      setForm((prev) => ({
        ...prev,
        imagen: file,
      }));
    }
  };

  // Manejo de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, autor, precio, stock, imagen, descripcion, id_categoria } =
      form;

    if (!nombre || !autor || !precio || !stock || !imagen || !descripcion) {
      setError("Por favor rellena todos los campos");
      return;
    }

    try {
      await addProductos({
        nombre,
        autor,
        precio,
        stock,
        imagen,
        descripcion,
        id_categoria,
      });

      
      setSuccessMessage("Producto agregado exitosamente");
      setTimeout(() => setSuccessMessage(""),3000);


      setForm({
        nombre: "",
        autor: "",
        precio: "",
        stock: "",
        imagen: "",
        descripcion: "",
        id_categoria: "",
      });
      setImagenPreview(null);
      setError("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setError("Error al agregar producto");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white  rounded-lg border-2 border-gray-300">
      {/* 🔹 Alerta de éxito */}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 rounded-md text-center font-bold">
          {successMessage}
        </div>
      )}
    <div className="flex flex-row ">
      {/* Formulario */}
      <form className="w-1/2 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-red-500">Nuevo Producto</h2>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={form.autor}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="border rounded p-2 h-24"
          required
        />

        <label>Categoría</label>
        <select
          name="id_categoria"
          value={form.id_categoria}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Selecciona una categoría</option>

          {categorias && categorias.length > 0 ? (
            categorias.map((categoria) => (
              <option
                key={categoria.id_categoria}
                value={categoria.id_categoria}
              >
                {categoria.nombre}
              </option>
            ))
          ) : (
            <option disabled>Cargando categorías...</option>
          )}
        </select>

        <label>Imagen (URL)</label>
        <input
          type="url"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="https://ejemplo.com/imagen.jpg"
          required
        />

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </form>

      {/* Vista previa */}
      <div className="w-1/2 border-l pl-6">
        <h2 className="text-xl font-bold mb-4">Vista previa</h2>

        {form.imagen ? (
          <img
            src={form.imagen}
            alt="Vista previa"
            className="w-40 h-80 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}

        <p className="text-lg font-semibold mt-4">
          {form.nombre || "Nombre del producto"}
        </p>
        <p className="text-gray-600">
          {form.descripcion || "Descripción del producto"}
        </p>
        <p className="text-green-600 font-bold mt-2">
          {form.precio
            ? `$${Number(form.precio).toLocaleString("es-CL")}`
            : "Precio no definido"}
        </p>
        <p className="text-sm text-gray-500">
          {form.stock
            ? `${form.stock} unidades disponibles`
            : "Stock no definido"}
        </p>
        <p className="text-sm text-gray-500">
          {form.id_categoria
            ? `Categoría ID: ${form.id_categoria}`
            : "Categoría no seleccionada"}
        </p>
      </div>
      </div>
    </div>
  );
};

export default ProductForm;
