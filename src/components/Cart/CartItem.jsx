import { useCart } from "../../contexts/CartContext";
import { Plus, Minus } from "lucide-react";

const CartItem = ({ producto }) => {
  const { addToCart, removeFromCart } = useCart();

  
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-red-400/50">
      <div className="flex items-center space-x-4">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-16 h-32 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold">{producto.nombre}</h2>


          <p className="text-gray-600">
            Precio unitario:{" "}
            {producto.precio.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </p>
          <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
          <p className="text-gray-800 font-bold">
            Subtotal:{" "}
            {(producto.precio * producto.cantidad).toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-neutral-50/75 text-lime-700 px-3 py-1 rounded-md hover:bg-neutral-50 transition"
          onClick={() => addToCart(producto)}
        >
          <Plus size={20} strokeWidth={3} />
        </button>
        <button
          className="bg-neutral-50/75 text-red-700 px-3 py-1 rounded-md hover:bg-neutral-50 transition"
          onClick={() => removeFromCart(producto.id_producto)}
        >
         <Minus size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
