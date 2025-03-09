// src/components/Admin/AdminDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";


const AdminDashboard = () => {
  const categoryClass = () =>
    `hover:bg-sky-950 h-32 w-full place-content-center pl-4 transition-colors `;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f0df] ">
      {/* Header */}
      <header className="bg-gray-900 text-white p-6 shadow-xl border-b-2  border-gray-800">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </header>
      <div className="flex flex-1 h-screen Layout">
        {/* Sidebar */}
        <aside className="w-1/6 bg-sky-900 min-h-screen  py-48 border-r text-white font-semibold text-xl  border-gray-300  shadow-2xl">
          <nav className="flex flex-col  ">
            <Link
              to="/admin/products"
              className={categoryClass()}
            >
              Gestión de Productos
            </Link>
            <Link
              to="/admin/categories"
              className={categoryClass()}
            >
              Gestión de Categorías
            </Link>
            <Link
              to="/admin/orders"
              className={categoryClass()}
            >
              Gestión de Órdenes
            </Link>
          </nav>
        </aside>
        {/* Contenido principal */}
        <main className="flex-1 p-8">

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
