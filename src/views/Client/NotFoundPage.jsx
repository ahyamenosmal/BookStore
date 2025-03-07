import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <AlertTriangle className="w-20 h-20 text-red-500" />
      <h1 className="mt-4 text-5xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-xl text-gray-600">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
