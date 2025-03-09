import { useState} from "react";
import { useCheckout } from "../../hooks/useCheckout";
import CustomAlert from "../General/CustomAlert";
import { AnimatePresence } from "framer-motion";

const CheckoutButton = () => {
  const { checkout } = useCheckout();
  const [showAlert, setShowAlert] = useState(false);

    const handleCheckout = async () => {
      try {
        await checkout();
        setShowAlert(true);
      } catch (error) {
        alert("Error al registrar la compra: " + error.message);
      }
    };

  return (
<div>
      <AnimatePresence>
        {showAlert && (
          <CustomAlert 
            title="Compra registrada exitosamente"
            message="La compra se ha registrado correctamente."
            backgroundColor="bg-green-100"
            textColor="text-green-800"
            onClose={() => setShowAlert(false)}
          />
        )}
      </AnimatePresence>
      <button 
        onClick={handleCheckout} 
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Comprar
      </button>
    </div>
  );
};


export default CheckoutButton;
