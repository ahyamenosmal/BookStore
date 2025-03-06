import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { ShoppingBasket, UserRound, LogOut } from "lucide-react";
import ScriptaLogo from "../../assets/Scripta.svg";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-red-400 h-20 py-1 border-blue-400 border-b-2 border-solid">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-5">
        <NavLink to="/" className="flex items-center space-x-3">
          <img src={ScriptaLogo} className="w-60" alt="Scripta Logo" />
        </NavLink>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="text-lg font-semibold flex flex-col justify-end p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-900 md:p-0"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-900 md:p-0"
              >
                Catálogo
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/cart"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-900 md:p-0"
              >
                <ShoppingBasket />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {user ? (
                <div className="relative">
                  {/* Icono de perfil */}
                  <button
                    onClick={handleDropdownToggle}
                    className="flex items-center focus:outline-none"
                  >
                    <UserRound  strokeWidth={1.5} className=" text-gray-900" />
                    
                  </button>
                  {/* Dropdown */}
                  <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    
                  >
                    <div className="absolute  mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                      <ul>
                        <li>
                          <NavLink
                            to="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                            >
                            Perfil
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full  text-red-700 text-left px-2 py-2  hover:bg-gray-100 flex items-center"
                            >
                            <LogOut className=" mr-2" /> Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-900 md:p-0"
                >
                  Registro/Inicio de sesión
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/sobre-nosotros"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-sky-900 md:p-0"
              >
                Sobre nosotros
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
