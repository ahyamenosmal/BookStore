import { useCart } from "../../contexts/CartContext";

const CartSummary = () => {
  const { cart } = useCart();


    // Calcular subtotal (suma de todos los productos en el carrito)
    const subtotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    // Calcular IVA (19%)
    const iva = subtotal * 0.19;
  
    // Calcular total con IVA
    const total = subtotal + iva;

  return (
    <div className="p-4  mt-4 flex flex-col justify-end  ">
<h2 className="text-2xl font-semibold">Resumen del carrito</h2>
<div className="text-end text-lg space-y-4 mx-5 mt-10 ">

      <p className="text-gray-700 ">Subtotal: {subtotal.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</p>
      <p className="text-gray-700 ">IVA (19%): {iva.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</p>
      <p className="text-xl font-bold ">Total: {total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</p>
</div>



    </div>
  );
};

export default CartSummary;
