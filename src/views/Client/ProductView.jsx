import React from "react";
import Layout from "../../components/General/Layout";
import { useParams } from "react-router-dom";
import { useAPI } from "../../contexts/APIContext";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import ProductIdCard from "../../components/Product/ProductIdCard";

const ProductView = () => {
  const { id } = useParams();
  const { productos, categorias } = useAPI();
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();

  const producto = productos.find(
    (prod) => prod.id === parseInt(id, 10)
  );
  if (!producto)
    return <p className="text-center mt-10 text-lg">Producto no encontrado</p>;

  const isFav = favorites.some((fav) => fav.id === producto.id);
  const categoriaProducto = categorias.find(
    (cat) => cat.id === producto.categoriaId
  )?.nombre;

  return (
    <>
      <header className="h-16"></header>
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

