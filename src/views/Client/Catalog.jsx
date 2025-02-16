import React from "react";
import Footer from "../../components/General/Footer.jsx";
import Banner from "../../components/General/Banner.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useProducts } from "../../contexts/APIContext";

function Catalog() {
  const { data } = useProducts();

  return (
    <>
      <header className="h-32"></header>
      <Navbar />
      <div className="container mx-auto">
        <div className="row">
          <container className="flex-row justify-items-center col-md-12 ">
            <h1 className="text-star text-5xl  m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
              Nuestro catálogo
            </h1>
            <div className="   my-16 ">
              <PaginatedProducts
                products={data.productos}
                productsPerPage={9}
              />
            </div>
          </container>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalog;
