import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
     <header className="h-8 bg-gray-900"></header>
      <Navbar className="bg-blue-500 p-4"></Navbar>
      <main className="flex-grow pt-10 place-self-center w-auto">
        {children}
      </main>
      <Footer className="bg-gray-800 text-white p-4 mt-auto">
      </Footer>
    </div>
  );
  
  export default Layout;