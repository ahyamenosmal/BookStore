import React, { useState } from "react";
import Footer from "../../components/General/Footer.jsx";
import Banner from "../../components/General/Banner.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";


const Home = () => {
  const { productos } = useAPI();
 

  return (
    <>
      <Banner />
      <Navbar />
      <div className="container mx-auto">
        <div className="row">
          {/* Sección Best Sellers */}
          <div className="flex-row justify-items-center col-md-12">
            <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
              Best Sellers del momento
            </h1>
            <PaginatedProducts products={productos} productsPerPage={3} />
            
          </div>

          {/* Sección Autores en profundidad */}
          <div className="flex-row justify-items-center col-md-12 mx-44">
            <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
              Autores en profundidad
            </h1>
            <PaginatedProducts products={productos} productsPerPage={2} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
