import React, { useState } from "react";
import { useAPI } from "../../contexts/APIContext.jsx";

const CategoryForm = () => {
  const { addCategoria } = useAPI();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, descripcion } = form;

    if (!nombre || !descripcion) {
      setError("Por favor rellena todos los campos");
      return;
    }

    try {
      await addCategoria({ nombre, descripcion });

      // 🔹 Mostrar mensaje de éxito
      setSuccessMessage("¡Categoría agregada exitosamente!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // 🔹 Reiniciar formulario
      setForm({
        nombre: "",
        descripcion: "",
      });

      setError("");
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      setError("Error al agregar categoría");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
      {/* 🔹 Alerta de éxito */}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 rounded-md text-center font-bold">
          {successMessage}
        </div>
      )}

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-red-500">Nueva Categoría</h2>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
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

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Categoría
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
