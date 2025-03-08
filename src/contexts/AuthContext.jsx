
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      fetchUserData(); 
    } else {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser); 
        } catch (error) {
          console.error("Error al parsear usuario de localStorage:", error);
          localStorage.removeItem("user"); 
        }
      }
    }
  }, []);


  const login = async (email, password) => {
    try {
      // Iniciar sesión y obtener el token
      const response = await fetch(`${API_URL}/scripta-backend/v1/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo_electronico: email,
          contraseña: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      const token = data.token; 

      if (!token) throw new Error("No se ha obtenido un token");
      localStorage.setItem("token", token);

      //  Usar el token para obtener los datos del usuario
      const userResponse = await fetch(
        `${API_URL}/scripta-backend/v1/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error("Error al obtener datos del usuario");
      }

      const userData = await userResponse.json(); 
      setUser(userData); 
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Inicio de sesión exitoso:", userData);
      

      // Redirigir según el estado del carrito
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      navigate(cart.length > 0 ? "/cart" : "/profile");

      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      return false;
    }
  };

  const register = async (newUser) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scripta-backend/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const data = await response.json();
      setUser([data.user]);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      console.log("Usuario registrado:", data.user);
      navigate("/profile");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  //datos del usuario

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const response = await fetch(`${API_URL}/scripta-backend/v1/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener datos del usuario");
      }

      const data = await response.json();
      setUser(data); 
      console.log("Datos del usuario:", data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error.message);
    }
  };

  
  
  // cierra sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  
  // 🔹 Nueva función para actualizar los datos del usuario
  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) throw new Error("No hay token disponible");
      
      const userId = user?.info?.id_usuario;
      console.log("ID del usuario:", userId);
      
      if (!userId) throw new Error("No se encontró el ID del usuario");
      
      const requestBody = {
        nombre: updatedData.nombre,
        correo_electronico: user.info.correo_electronico, // No se debe modificar
        direccion: updatedData.direccion,
        telefono: updatedData.telefono,
        fecha_registro: user.info.fecha_registro || new Date().toISOString().split("T")[0], // Mantener la fecha de registro
      };
      
      const response = await fetch(
        `${API_URL}/scripta-backend/v1/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al actualizar usuario:", response.status, errorText);
        throw new Error(`Error al actualizar usuario: ${response.status}`);
      }
      
      const data = await response.json();
      setUser({ ...user, info: data.user }); // ✅ Actualizar datos en el contexto
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, info: data.user })
      );
      
      console.log("Usuario actualizado:", data.user);
      return true;
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      return false;
    }
  };

  //lógica de administrador

  const loginAdmin = async (usuario, password) => {
    try {
      const response = await fetch(`${API_URL}/scripta-backend/v1/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          contraseña: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const adminDataResponse = await fetch(`${API_URL}/scripta-backend/v1/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          contraseña: password,
        }),
      });
  
      if (!adminDataResponse.ok) {
        console.warn("Error al obtener datos del admin:", await adminDataResponse.text());
        return false;   
      }
  
      const adminData = await adminDataResponse.json();
      setAdmin(adminData); // Guardamos los datos en el contexto
      localStorage.setItem("admin", JSON.stringify(adminData)); // Guardamos en localStorage
  
      return true; // Inicio de sesión exitoso
    } catch (error) {
      console.error("Error en loginAdmin:", error);
      return error;  //   ❌❌❌❌❌ solucionar logica de verificacion para obtener datos del admin
    }
  };

  // Función para cerrar sesión como administrador
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  // Obtener datos del administrador (Si ya está logueado)
  const fetchAdminData = async () => {
    try {
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));
      if (!storedAdmin || !storedAdmin.username) {
        console.warn("No hay administrador guardado en localStorage");
        setAdmin(null);
        return;
      }

      const response = await fetch(`${API_URL}/scripta-backend/v1/admin/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "nombre-usuario": storedAdmin.username, // 👈 Enviar el nombre de usuario admin
        },
      });

      if (!response.ok) {
        console.warn("Error al obtener los datos del administrador");
        setAdmin(null);
        return;
      }

      const data = await response.json();
      setAdmin(data);
    } catch (error) {
      console.error("Error al obtener datos del administrador:", error.message);
      setAdmin(null);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchAdminData();
    }
  }, [admin]);

  return (
    <AuthContext.Provider
    value={{ user, register, login, logout, updateUser, fetchUserData, admin, loginAdmin, logoutAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
