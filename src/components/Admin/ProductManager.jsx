import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAPI } from "../../contexts/APIContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductForm from "./ProductForm";

const ProductManagerTable = () => {
  const { productos, addProductos, updateProductos, deleteProductos, categorias } =
    useAPI();
  const [open, setOpen] = useState(false);
  const [showForm , setShowForm] = useState(false);

  const toggleTable = () => setOpen((prev) => !prev);
  const toggleForm = () => setShowForm((prev) => !prev);

  const handleAddProducto = () => {
    const newProducto = {
      nombre: "Nuevo Producto",
      autor: "Autor del libro",
      precio: 0,
      stock: 0,
      imagen: "https://via.placeholder.com/150",
      descripcion: "Descripción del nuevo producto",
      id_categoria: null,
    };
    addProductos(newProducto);
  };

  const EditableRow = ({ productos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProducto, setEditedProducto] = useState(productos);

    useEffect(() => {
      setEditedProducto(productos);
    }, [productos]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedProducto((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
      updateProductos(editedProducto);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditedProducto(productos);
      setIsEditing(false);
    };

    return (
      <tr className="bg-red-300 border-b border-red-500 h-32">
        <td className="pl-6 py-4 font-medium text-black ">
          {isEditing ? (
            <input
              type="text"
              name="nombre"
              value={editedProducto.nombre}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            productos.nombre
          )}
        </td>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="text"
              name="autor"
              value={editedProducto.autor}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          ) : (
            productos.autor || "Sin descripción"
          )}
        </td>

        <td className="px-6 py-4">
          {isEditing ? (
            <textarea
              name="descripcion"
              value={editedProducto.descripcion}
              onChange={handleChange}
              className="border rounded p-1 max-h-24 min-h-12 w-full  whitespace-break-spaces"
            />
          ) : (
            productos.descripcion || "Sin descripción"
          )}
        </td>
        <td className="px-6 py-4">
  {isEditing ? (
    <select
      name="id_categoria"
      value={editedProducto.id_categoria}
      onChange={handleChange}
      className="border rounded p-2"
    >
      {categorias && categorias.length > 0 ? (
        categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))
      ) : (
        <option disabled>Cargando categorías...</option>
      )}
    </select>
  ) : (
    // 🔹 Mostramos el nombre de la categoría en lugar del ID
    categorias.find((c) => c.id_categoria === productos.id_categoria)?.nombre || "Categoría no encontrada"
  )}
</td>
        <td className="px-4 py-4">
          {isEditing ? (
            <input
              type="number"
              name="precio"
              value={editedProducto.precio}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          ) : (
            Number(productos.precio).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })
          )}
        </td>
        <td className="px-4 py-4">
          {isEditing ? (
            <input
              type="number"
              name="stock"
              value={editedProducto.stock}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          ) : (
            productos.stock || "no stock"
          )}
        </td>
        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="text"
              name="imagen"
              value={editedProducto.imagen}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <img
              src={productos.imagen}
              alt={productos.nombre}
              className="w-12 h-12 object-cover rounded"
            />
          )}
        </td>
        <td className="px-6 py-4 space-x-4">
          {isEditing ? (
            <div className="flex flex-col ">
              <button
                onClick={handleSave}
                className="font-medium text-lime-700 p-2 hover:ring-lime-700 hover:ring-2 hover:bg-lime-700/25 rounded-lg"
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="font-medium text-red-800 p-2 hover:ring-red-700 hover:ring-2 hover:bg-red-700/25 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
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
                      `¿Seguro que deseas eliminar el producto "${productos.nombre}"?`
                    )
                  ) {
                    deleteProductos(productos.id_producto);
                  }
                }}
                className="font-medium text-red-800 p-2 hover:ring-red-700 hover:ring-2 hover:bg-red-700/25 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="mx-8 my-5">
      <h2 className="text-3xl font-bold text-center">
        Administrador de Productos
      </h2>
      <div className=" relative overflow-x-auto shadow-md rounded-lg mt-10 ">
        <table className="w-full text-md  text-black">
          <thead className="relative text-md text-black uppercase bg-red-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                Nombre del Producto
              </th>
              <th scope="col" className="px-2 py-3">
                Autor
              </th>
              <th scope="col" className="px-2 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-2 py-3">
                Categoria
              </th>
              <th scope="col" className="px-2 py-3">
                Precio
              </th>
              <th scope="col" className="px-2 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-12 py-3">
                Acciones
              </th>
              <button
                onClick={toggleTable}
                className="absolute right-1 top-2 flex  text-white font-bold "
              >
                {open ? (
                  <ChevronUp strokeWidth={4} size={30} />
                ) : (
                  <ChevronDown size={30} strokeWidth={4} />
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
                {productos.map((productos) => (
                  <EditableRow
                    key={productos.id_productos}
                    productos={productos}
                  />
                ))}
              </motion.tbody>
            )}
          </AnimatePresence>
        </table>
      </div>
      <div className="mt-4 w-full flex flex-col">
        <button
          onClick={toggleForm}
          className=" ring-2 ring-green-700 px-4 py-2 drop-shadow-md bg-green-500 hover:bg-green-700 text-white font-bold rounded transition-colors"
        >
          Agregar nuevo producto
        </button>
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <ProductForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductManagerTable;
