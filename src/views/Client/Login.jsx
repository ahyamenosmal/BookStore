import React from 'react'
import Navbar from '../../components/General/Navbar.jsx'
import LoginForm from '../../components/User/LoginForm.jsx'
import Footer from '../../components/General/Footer.jsx'

function Login() {
  return (
    <>
    <header className='h-32' ></header>
            <Navbar /> 
            <div className="flex flex-row justify-center p-16 h-screen">
               <div className="transform -translate-x-96 ">{/* revisar */}
           < LoginForm  />
           </div>
           
           </div>
           <Footer/>
    </>
  )
}

export default Login;