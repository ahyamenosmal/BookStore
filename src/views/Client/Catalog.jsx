import React from 'react'
import Footer from '../../components/General/Footer.jsx'
import Banner from '../../components/General/Banner.jsx'
import Navbar from '../../components/General/Navbar.jsx'
import ProductCard from '../../components/General/ProductCard.jsx'

function Catalog() {
  return (
    <>
    <header className='h-32' ></header>
      <Navbar /> 
      <div className="container mx-auto">
        <div className="row">
          <container className="flex-row justify-items-center col-md-12 ">
            <h1 className='text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit'>Best Sellers del momento
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mb-16 ">
            <ProductCard />
            <ProductCard />
            <ProductCard /> {/* buscar alternativa para no repetir el componente */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div>
          </container>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Catalog;