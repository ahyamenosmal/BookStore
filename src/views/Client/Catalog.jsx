import React from "react";
import Footer from "../../components/General/Footer.jsx";
import Sidebar from "../../components/Catalog/Sidebar.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";

function Catalog() {
  const { productos } = useAPI();
 

  return (
    <>
      <header className="h-32"></header>
      <Navbar />
<div className="flex flex-row ">
  <div>
    <Sidebar />
  </div>
      

      <div className="container mx-auto">
        <div className="row">  
          <div className="flex-row justify-items-center col-md-12 ">
            <h1 className="text-star text-5xl  m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
              Nuestro catálogo
            </h1>
            <div className="   my-16 ">
              <PaginatedProducts
                products={productos}
                productsPerPage={9}
                />
            </div>
          </div>
        </div>
      </div>
                </div>
      <Footer />
    </>
  );
}

export default Catalog;
