// src/components/Admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f0df]">
      {/* Header */}
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/admin/products"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Gestión de Productos
            </Link>
            <Link
              to="/admin/orders"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Gestión de Órdenes
            </Link>
            <Link
              to="/admin/categories"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Gestión de Categorías
            </Link>
          </nav>
        </aside>
        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard de Administración</h2>
          <p className="text-gray-600">
            Bienvenido al panel de administración. Desde aquí puedes gestionar
            productos, órdenes y categorías.
          </p>
          {/* Aquí puedes incluir más secciones o componentes según sea necesario */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
