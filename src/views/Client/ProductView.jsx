import React from "react";
import Layout from "../../components/General/Layout";
import { useParams } from "react-router-dom";
import { useAPI } from "../../contexts/APIContext";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import ProductIdCard from "../../components/Product/ProductIdCard";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const ProductView = () => {
  const { id } = useParams();
  const { productos, categorias } = useAPI();
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();


  if (!productos.length) {
    return (
      <>
        
        <Layout>
        <div className="flex flex-col justify-center items-center h-[60vh]">
            <DotLottieReact
              src="https://lottie.host/42d01473-c6c8-4ae9-857f-a976ed0fd00d/O29QbCJ1BB.lottie"
              loop
              autoplay
              style={{ width: 300, height: 300 }} // Ajustar tamaño
            />
            <p className="mt-4 text-lg font-semibold">Cargando producto...</p>
          </div>
        </Layout>
      </>
    );
  }

  const producto = productos.find((prod) => prod.id_producto.toString() === id.toString());

  if (!producto) return <p className="text-center mt-10 text-lg">Producto no encontrado</p>;

  const isFav = favorites.some((fav) => fav.id_producto === producto.id_producto);
  const categoriaProducto = categorias.find((cat) => cat.id_categoria === producto.categoriaId)?.nombre;

  return (
    <>
      
      <Layout>
        <ProductIdCard 
          producto={producto}
          isFav={isFav}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      </Layout>
    </>
  );
};

export default ProductView;
