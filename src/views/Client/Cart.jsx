import React from "react";
import Layout from "../../components/General/Layout.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { useAPI } from "../../contexts/APIContext.jsx";
import CartSummary from "../../components/Cart/CartSummary.jsx";

function Cart() {
  const { cart, clearCart } = useCart();
  console.log("CartContext:", cart);
  const { productos } = useAPI();

  return (
    <>
      <header className="h-10"></header>
      <Layout>
        <div className="grid grid-cols-2  mx-52 mt-10 p-4 bg-red-400/25 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>

          {cart.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-4 col-start-1">
              {cart.map((producto) => (
                <CartItem producto={producto} />
              ))}
            </div>
          )}
          <div className="col-start-1 justify-self-end ">
            <button
              className=" h-10 px-3 text-white rounded-lg bg-sky-900 hover:bg-sky-950 transition mt-4"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </div>
          <div className="col-start-2  row-start-2   ">
            {cart.length > 0 && <CartSummary />}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
