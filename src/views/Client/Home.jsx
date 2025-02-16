import React, { useState } from 'react'
import Footer from '../../components/General/Footer.jsx'
import Banner from '../../components/General/Banner.jsx'
import Navbar from '../../components/General/Navbar.jsx'
import ProductCard from '../../components/General/ProductCard.jsx'
import { useProducts } from '../../contexts/APIContext';

const Home =() => {

  const { data } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + productsPerPage < data.productos.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };
  return (
    <>
      <Banner />
      <Navbar /> 
      <div className="container mx-auto">
        <div className="row">
          <container className="flex-row justify-items-center col-md-12 ">
            <h1 className='text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit'>Best Sellers del momento
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mb-16 ">


            <div className="flex flex-col items-center">
      {data.productos.length > 0 ? (
        <>
          <ProductCard producto={data.productos[currentIndex]} />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === data.productos.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>

            </div>
          </container>
          <container className="flex-row justify-items-center col-md-12 mx-44  ">
            <h1 className='text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit'> Autores en profundidad
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mb-16  ">

            <ProductCard />
            </div>
          </container>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
