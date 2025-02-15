import React from 'react'

function ProductCard()  {
    return (
    
<div class="mt-44 grid grid-cols-2 relative w-full max-w-md bg-red-400/25  border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700   border-0 border-b-2 border-solid">
    <a  href="#">
        <img class=" absolute bottom-20 left-10  rounded-lg" src="https://placehold.co/150x220/png" alt="product image" />
    </a>
    <div class="col-start-2 pb-5">
        <a href="#">
            <h5 class="text-center  text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
    </div>    
        <div class="col-start-1 justify-self-center mb-5">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>  
        </div>
        <div class="col-start-2 justify-self-center my-3 ">
    <a href="#" class="text-white  bg-sky-900 hover:bg-sky-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
    </div>
</div>

    )
}

export default ProductCard;
