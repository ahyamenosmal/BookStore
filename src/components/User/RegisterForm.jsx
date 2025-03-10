import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";


function RegisterForm({ toggleForm }) {
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

    if (!form.direccion.trim())
      newErrors.direccion = "La dirección es obligatoria.";

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
    <div className="flex flex-row gap-32">
      <div className=" max-w-xl px-4  rounded-lg shadow-sm sm:p-6 md:p-8 bg-[#f9d0c5] border-zinc-800/30 border-2 border-solid box-shadow-md">
        <form
          className="space-y-2 grid grid-cols-2 grid-flow-row gap-8"
          onSubmit={handleSubmit}
        >
          <h5 className="text-2xl   font-bold  text-red-500  rounded-xl ">
            Regístrate
          </h5>

          {/* Nombre */}
          <div className="col-start-1 row-start-2 w-60">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John Doe"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            {newErrors.nombre && (
              <p className="text-red-500 text-sm">{newErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="col-start-1 row-start-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo_electronico"
              id="correo_electronico"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@company.com"
              value={form.correo_electronico}
              onChange={handleChange}
              required
            />
            { newErrors.correo_electronico && (
              <p className="text-red-500 text-sm">{newErrors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="col-start-1 row-start-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 e"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={form.contraseña}
              onChange={handleChange}
              required
            />
            {newErrors.contraseña && (
              <p className="text-red-500 text-sm">{newErrors.password}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="col-start-2  row-start-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium  text-gray-900 "
            >
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              className="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="+56 9 XXXX XXXX"
              value={form.telefono}
              onChange={handleChange}
              required
            />
            {newErrors.telefono && (
              <p className="text-red-500 text-sm">{newErrors.phone}</p>
            )}
          </div>

          {/* Dirección */}
          <div className="col-start-2  row-start-3">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Av. Siempreviva 742"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={form.direccion}
              onChange={handleChange}
              required
            />
            {newErrors.direccion && (
              <p className="text-red-500 text-sm">{newErrors.address}</p>
            )}
          </div>

          {/* Botón de registro */}
          <div className="col-start-2 row-start-4 self-center pt-4 h-10">
            <button
              type="submit"
              className=" w-full  text-gray-900 bg-red-400/50 hover:bg-red-500/50 focus:ring-4 focus:outline-none focus:ring-red-500/45 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrarse
            </button>
          </div>

          {/* Enlace de inicio de sesión */}
          <div className="text-sm font-medium text-gray-800 row-start-5 col-span-2">
            Si ya tienes cuenta,{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-red-500 hover:underline "
            >
              Inicia sesión aquí
            </button>
          </div>
        </form>
      </div>
 
    </div>
  );
}

export default RegisterForm;
