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
    <div className="flex flex-col items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ x: isLogin ? -400 : 400, rotateY: 90, opacity: 0 }}
          animate={{ x: 0, rotateY: 0, opacity: 1 }}
          exit={{ x: isLogin ? 400 : -400, rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative"
        >
          {isLogin ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegisterForm toggleForm={toggleForm} />
          )}
        </motion.div>
      </AnimatePresence>


    </div>
  );
};

export default ChangeForm;
