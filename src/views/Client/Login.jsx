import React from 'react'
import Navbar from '../../components/General/Navbar.jsx'
import LoginForm from '../../components/User/LoginForm.jsx'
import Footer from '../../components/General/Footer.jsx'
import ChangeForm from '../../components/User/ChangeForm.jsx'

function Login() {
  return (
    <>
    <header className='h-32' ></header>
            <Navbar /> 
            <div className=" mt-24">
              
           <ChangeForm></ChangeForm>
       
           
           </div>
           <Footer/>
    </>
  )
}

export default Login;