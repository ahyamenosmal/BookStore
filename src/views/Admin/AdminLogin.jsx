import React from "react";
import Navbar from "../../components/General/Navbar.jsx";
import Footer from "../../components/General/Footer.jsx";
import AdminLoginForm from "../../components/Admin/AdminLoginForm.jsx";

function AdminLogin() {
  return (
    <>
      <header className="h-32"></header>
      <Navbar />
      <div className="mt-24 flex justify-center">
        <AdminLoginForm /> {/* ✅ Usamos el formulario separado */}
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
