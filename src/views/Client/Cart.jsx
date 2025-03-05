import React from "react";
import Layout from "../../components/General/Layout.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import { useAPI } from "../../contexts/APIContext.jsx";
import CartSummary from "../../components/Cart/CartSummary.jsx";
import { Navigate } from "react-router";

function Cart() {
  const { cart, clearCart } = useCart();
  console.log("CartContext:", cart);
  const { productos } = useAPI();

  return (
    <>
      
      <Layout>
        <div className="grid grid-cols-3  mx-52 mt-5 pr-16 p-4 bg-[#f9d0c5] rounded-lg">
          <h1 className="text-5xl font-bold mb-10 col-span-1 col-start-2 text-center font-lathusca">
            Carrito de Compras
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-600 col-start-2 text-center">
              Tu carrito está vacío.
            </p>
          ) : (
            <div className="space-y-4 col-start-1 col-end-3 px-24">
              {cart.map((producto) => (
                <CartItem producto={producto} />
              ))}
            </div>
          )}

          <div className="col-start-2 row-start-3 justify-self-center self-end ">
            {cart.length === 0 ? (
              <button
                className="  h-10 px-3 text-white rounded-lg bg-sky-900 hover:bg-sky-950 transition mt-4"
                onClick={Navigate("/catalog")}
              >
                Ir a la tienda
              </button>
            ) : (
              <button
                className=" h-10 px-3 text-white rounded-lg bg-sky-900 hover:bg-sky-950 transition mt-4"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            )}
          </div>
          <div className="col-start-3  row-start-2   ">
            {cart.length > 0 && <CartSummary />}
          </div>
          <div className="col-start-3  row-start-3  place-self-end " >
            {cart.length > 0 && (
              <button className="  bg-sky-900 w-52  mt-24 text-white  py-2  rounded-lg hover:bg-sky-950 transition ">
                Comprar
              </button>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
