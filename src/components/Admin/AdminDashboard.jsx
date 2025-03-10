import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutButton from "../User/LogoutButton";


const AdminDashboard = () => {

  const location = useLocation();

  const categoryClass = () =>
    `hover:bg-sky-950 h-32 w-full place-content-center transition-colors text-center `;

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f0df] ">
      {/* Header */}
      <header className="bg-gray-900 text-white p-6 shadow-xl border-b-2  border-gray-800 ">
        <a href="/admin"><h1 className="text-3xl font-bold">Panel de Administración</h1></a>
      </header>
      <div className="flex flex-1 h-screen ">
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
              className="hover:bg-sky-950 h-32 w-full place-content-center  transition-colors mb-10 text-center"
            >
              Gestión de Categorías
            </Link>
            <div className="mx-16">
              <LogoutButton  />
            </div>
            
            {/* <Link
              to="/admin/orders"
              className={categoryClass()}
            >
              Gestión de Órdenes
            </Link> */}

          </nav>
        </aside>
        {/* Contenido principal */}
        <main className="flex-1 p-8 ">

          <Outlet />
         {location.pathname === "/admin" && (
            <div className="text-center mt-20 flex flex-col items-center justify-center ">
              <h2 className="text-4xl font-bold text-gray-700">
                ¡Bienvenido al Panel de Administración!
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Selecciona una opción del menú para comenzar.
              </p>
              <img src="https://github.com/MelladoDev/BookStore/blob/main/src/assets/scripta-admin.png?raw=true" alt="backend-logo" className="mt-10 drop-shadow-lg  " />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
