import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Cargar usuarios desde JSON y restaurar usuario de localStorage
  useEffect(() => {
    fetch("/userData.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));

    // Restaurar usuario si existe en localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const register = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    console.log("Usuario registrado:", newUser);
  };

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      console.log("Inicio de sesión exitoso:", foundUser);

      // Redirigir según el estado del carrito
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      navigate(cart.length > 0 ? "/cart" : "/profile");

      return true;
    } else {
      console.error("Credenciales incorrectas");
      return false;
    }
  };
// cierra sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Nueva función para actualizar los datos del usuario
  const updateUser = (updatedData) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
