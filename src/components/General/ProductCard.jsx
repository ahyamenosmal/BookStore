import React from 'react'

import { useProducts } from '../../contexts/APIContext';

const ProductCard = ({ producto }) => {
    if (!producto) return null;
  
    return (
      <div className="mt-44 grid grid-cols-2 relative w-full  min-w-96 max-w-96 h-32 bg-red-400/25 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 border-0 border-b-2 border-solid">
        <a href="#" >
          <img className="absolute bottom-20 left-5 rounded-lg" src={producto.imagen} alt={producto.titulo} />
        </a>
        <div className="col-start-2 pb-5">
          <a href="#">
            <h5 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {producto.titulo}
            </h5>
          </a>
        </div>
        <div className="col-start-1 justify-self-center mb-5">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{producto.precio}</span>
        </div>
        <div className="col-start-2 justify-self-center my-3">
          <a href="#" className="text-white bg-sky-900 hover:bg-sky-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </a>
        </div>
      </div>
    );
  };
  
  export default ProductCard;