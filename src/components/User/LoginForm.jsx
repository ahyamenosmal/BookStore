import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext"; 
import { useNavigate } from "react-router-dom";
import ChangeForm from "./ChangeForm";


function LoginForm({toggleForm}) {
  const { login } = useAuth();
  const { cart } = useCart(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(form.email, form.password);
    
      if (success) {
        console.log("Inicio de sesión exitoso");
        navigate(cart.length > 0 ? "/cart" : "/"); 
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error en el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="flex flex-row gap-32">

    <div className="w-full  max-w-sm px-4  rounded-lg shadow-sm sm:p-6 md:p-8 bg-[#f9d0c5] border-zinc-800/30 border-2 border-solid box-shadow-md ">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-2xl   font-bold  text-red-500  rounded-xl">
          Inicia sesión 
        </h5>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 e"
            placeholder="name@company.com"
            value={form.email}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={form.password}
            onChange={handleChange}
            required
            />
        </div>
        <button
          type="submit"
          className="w-full text-gray-900 bg-red-400/50 hover:bg-red-500/50 focus:ring-4 focus:outline-none focus:ring-red-500/45 font-bold rounded-lg text-sm px-5 py-2.5 text-center "
          >
          Iniciar sesión
        </button>
        <div className="text-sm font-medium text-gray-800 ">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-red-500 hover:underline "
            >
            Regístrate aquí
          </button>
        </div>
      </form>
    </div>
            </div>
  );
}

export default LoginForm; 
