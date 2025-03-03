import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Car } from "lucide-react";

const PersonalDataForm = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    correo_electronico: user?.correo_electronico || "",
    direcion: user?.direcion || "",
    telefono: user?.telefono || "",
  });

  useEffect(() => {
    if (user?.info) {
      console.log("Datos del usuario recibidos:", user); // ✅ Depuración
      setFormData({
        nombre: user.info.nombre || "",
        correo_electronico: user.info.correo_electronico || "",
        direccion: user.info.direccion || "",
        telefono: user.info.telefono || "",
      });
    }
  }, [user]);

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar cambios
  const handleSave = async () => {
    const success = await updateUser(formData);
    if (success) {
    setIsEditing(false);
    alert ("Datos actualizados con éxito");
    } else {
      alert("Error al guardar los cambios");
    }
  };

  if (!user) {
    return <p className="text-gray-700 font-medium">Cargando datos del usuario...</p>;
  }

  return (
    <div className="bg-red-400/25 p-6 rounded-lg shadow-lg ">
      <h2 className="text-4xl font-lathusca text-black mb-8 border-b-4 border-red-400 w-fit">
        Mis Datos
      </h2>
      
      {/* Campos de datos */}
      <div className="space-y-4">
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!isEditing}
            className={`p-2 border w-96 ${
              isEditing ? "border-blue-500" : "border-gray-300"
            } rounded-lg bg-gray-100 text-gray-900`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="correo_electronico"
            value={formData.correo_electronico}
            disabled
            className="p-2 border border-gray-300 rounded-lg bg-gray-200 text-gray-500"
          />
        </div>

        {/* Teléfono */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono} 
            onChange={handleChange}
            disabled={!isEditing}
            className={`p-2 border ${
              isEditing ? "border-blue-500" : "border-gray-300"
            } rounded-lg bg-gray-100 text-gray-900`}
          />
        </div>

        {/* Dirección */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={!isEditing}
            className={`p-2 border ${
              isEditing ? "border-blue-500" : "border-gray-300"
            } rounded-lg bg-gray-100 text-gray-900`}
          />
        </div>
      </div>

      {/* Botón de Editar/Guardar */}
      <div className="flex justify-end mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-sky-900 text-white px-5 py-2 rounded-lg hover:bg-sky-950 transition"
          >
            Guardar Cambios
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-sky-900 text-white px-5 py-2 rounded-lg hover:bg-sky-950 transition"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalDataForm;
