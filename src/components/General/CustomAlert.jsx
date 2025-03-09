import React from 'react';
import { motion } from 'framer-motion';

const CustomAlert = ({
    title = "¡Éxito!",
    message = "La operación se completó correctamente.",
    backgroundColor = '#d4edda',
    textColor = '#155724',
    onClose,
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor,
          color: textColor,
          padding: '1rem',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          marginBottom: '1rem',
        }}
      >
        <strong>{title}</strong>
        <p>{message}</p>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.2rem',
            right: '0.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: textColor,
          }}
        >
          &times;
        </button>
      </motion.div>
    );
  };

  export default CustomAlert;
