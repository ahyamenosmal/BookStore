import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../services/api";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetch(`${API_URL}/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sesión expirada o acceso no autorizado");
        }
        return res.json();
      })
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error al obtener datos del admin:", err);
        setError(err.message);
        setLoading(false);
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f0df]">
      {/* Header */}
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar /> {/* ✅ Ahora usa el Sidebar modular */}
        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard de Administración</h2>

          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800">
                Bienvenido, {adminData.usuario}
              </h3>
              <p className="text-gray-600">
                Desde aquí puedes gestionar productos, órdenes y categorías.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  navigate("/admin-login");
                }}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
