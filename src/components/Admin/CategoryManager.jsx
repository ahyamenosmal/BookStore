import React from "react";
import { useAPI } from "../../contexts/APIContext";
import { useAuth } from "../../contexts/AuthContext";


const CategoryManager = () => {
  const { categorias, addCategorias, updateCategorias, deleteCategorias } =
    useAPI();
  const { user } = useAuth();


  const handleAddCategorias = (e) => {
    e.preventDefault();
    const newCategorias = {
      nombre: "",
      descripcion: "",

    };
    addCategorias(newCategorias);
  };

  const handleUpdateCategorias = (e, Categorias) => {
    e.preventDefault();
    const updatedCategorias = {
      ...Categorias,
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
    };
    updateCategorias(updatedCategorias);
  };

  const handleDeleteCategorias = (e, Categorias) => {
    e.preventDefault();
    deleteCategorias(Categorias.id);
   
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Administrador de Categorias</h2>
      <div className="flex flex-col space-y-4">
        {categorias.map((Categorias) => (
          <div key={Categorias.id} className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{Categorias.nombre}</h3>
                <p className="text-gray-700">{Categorias.descripcion}</p>
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <button
                onClick={(e) => handleUpdateCategorias(e, Categorias)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar
              </button>
              <button
                onClick={(e) => handleDeleteCategorias(e, Categorias)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-semibold">Agregar nueva categoría</h3>
          <form onSubmit={handleAddCategorias}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="nombre" className="text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="descripcion" className="text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                id="descripcion"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="imagen" className="text-gray-700">
                Imagen
              </label>
              <input
                type="text"
                name="imagen"
                id="imagen"
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
