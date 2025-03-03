import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    correo_electronico: "",
    contraseña: "",
    telefono: "",
    direccion: "",
  });
  const [errors, setErrors] = useState({});
  
  // Funcion para formatear el teléfono, formato chile 
  const formatPhone = (value) => {
    let cleaned = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    if (cleaned.length > 9) cleaned = cleaned.slice(0, 9); // Máximo 9 dígitos
  
    if (cleaned.length === 9) {
      return `+56 9 ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
    }
    return cleaned;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "telefono") {
      value = formatPhone(value);
    }
    setForm({ ...form, [name]: value });
  };
  


  // Validación de los campos antes del envío
  const validateForm = () => {
    let newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.correo_electronico.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.correo_electronico = "Correo inválido.";
    if (form.contraseña.length < 8)
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres.";

    if (!form.direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("datos", form);
    if (validateForm()) {
      register(form);
    }
  };

  return (
    <div className="w-full max-w-md p-8 md:py-4 min-h-full bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Regístrate
        </h5>

        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="correo_electronico"
            id="correo_electronico"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            value={form.correo_electronico}
            onChange={handleChange}
            required
          />
          {errors.correo_electronico && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
          {errors.contraseña && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            id="telefono"
            className="input-field"
            placeholder="+56 9 XXXX XXXX"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            placeholder="Av. Siempreviva 742"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={form.direccion}
            onChange={handleChange}
            required
          />
          {errors.direccion && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrarse
        </button>

        {/* Enlace de inicio de sesión */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Si ya tienes cuenta,{" "}
          <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
            Inicia sesión aquí
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
