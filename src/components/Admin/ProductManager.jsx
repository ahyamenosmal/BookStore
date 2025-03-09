import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAPI } from "../../contexts/APIContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductManagerTable = () => {
  const { productos, addProductos, updateProductos, deleteProductos } =
    useAPI();
  const [open, setOpen] = useState(false);

  const toggleTable = () => setOpen((prev) => !prev);

  const handleAddCategoria = () => {
    const newCategoria = {
      nombre: "Nueva Categoría",
      descripcion: "Descripción de la nueva categoría",
    };
    addCategorias(newCategoria);
  };
  const EditableRow = ({ categorias }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCategory, setEditedCategory] = useState(categorias);

    useEffect(() => {
      setEditedCategory(categorias);
    }, [categorias]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
      onUpdate(editedCategory);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditedCategory(categorias);
      setIsEditing(false);
    };

    return (
      <tr className="bg-red-300 border-b border-red-500">
        <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
          {isEditing ? (
            <input
              type="text"
              name="nombre"
              value={editedCategory.nombre}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            categorias.nombre
          )}
        </td>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="text"
              name="descripcion"
              value={editedCategory.descripcion}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          ) : (
            categorias.descripcion || "Sin descripción"
          )}
        </td>
        <td className="px-6 py-4 space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="font-medium text-green-600 hover:underline"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="font-medium text-red-600 hover:underline"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="font-medium text-lime-700 p-2 hover:ring-lime-700 hover:ring-2 hover:bg-lime-700/25 rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `¿Seguro que deseas eliminar la categoría "${categorias.nombre}"?`
                    )
                  ) {
                    deleteCategorias(categorias.id_categoria);
                  }
                }}
                className="font-medium text-red-800 p-2 hover:ring-red-700 hover:ring-2 hover:bg-red-700/25 rounded-lg"
              >
                Eliminar
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="mx-10 my-5">
      <h2 className="text-3xl font-bold text-center">
        Administrador de Categorías
      </h2>
      <div className=" relative overflow-x-auto shadow-md rounded-lg mt-10 mx-10">
        <table className="w-full  min-h-fit text-md text-left text-black rounded-lg">
          <thead className="relative text-md text-black uppercase bg-red-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre de la Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
              <button
                onClick={toggleTable}
                className="absolute right-6 top-2 flex justify-center text-white font-bold "
              >
                {open ? (
                  <ChevronUp strokeWidth={4} size={32} />
                ) : (
                  <ChevronDown size={32} strokeWidth={4} />
                )}
              </button>
            </tr>
          </thead>

          <AnimatePresence>
            {open && (
              <motion.tbody
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                {categorias.map((categorias) => (
                  <EditableRow
                    key={categorias.id_categoria}
                    categorias={categorias}
                  />
                ))}
              </motion.tbody>
            )}
          </AnimatePresence>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddCategoria}
          className="justify-end mx-10 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded transition-colors"
        >
          Agregar nueva categoría
        </button>
      </div>
    </div>
  );
};

export default CategoryManagerTable;
