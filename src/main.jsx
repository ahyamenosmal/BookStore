import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "../src/contexts/APIContext.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "../src/contexts/CartContext.jsx";
import { BlogProvider } from "../src/contexts/BlogContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <APIProvider>
        <CartProvider>
          <BlogProvider>
            <App />
          </BlogProvider>
        </CartProvider>
      </APIProvider>
    </AuthProvider>
  </BrowserRouter>
);
