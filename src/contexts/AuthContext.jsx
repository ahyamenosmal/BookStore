import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/userData.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  const register = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);

    // Aquí en el futuro se enviará a la base de datos
    console.log("Usuario registrado:", newUser);
  };

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);

  
    if (foundUser) {
      setUser(foundUser);
      console.log("Inicio de sesión exitoso:", foundUser);
  
      // Verificar si hay productos en el carrito
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      navigate(cart.length > 0 ? "/cart" : "/home"); // Redirigir según el estado del carrito
      
      return true;
    } else {
      console.error("Credenciales incorrectas");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
