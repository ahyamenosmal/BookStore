import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const ChangeForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center  overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ x: isLogin ? -400 : 400, rotateY: 90, opacity: 0 }}
          animate={{ x: 0, rotateY: 0, opacity: 1 }}
          exit={{ x: isLogin ? 400 : -400, rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className=" relative"
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={toggleForm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isLogin ? "Ir a Registro" : "Ir a Iniciar Sesión"}
      </button>
    </div>
  );
};

export default ChangeForm;



// quizas hacer un div mas grande que gire por completo y se muestre el otro lado con un formulario distinto
