import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "./contexts/APIContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { BlogProvider } from "./contexts/BlogContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <APIProvider>
        <CartProvider>
          <BlogProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </BlogProvider>
        </CartProvider>
      </APIProvider>
    </AuthProvider>
  </BrowserRouter>
);
