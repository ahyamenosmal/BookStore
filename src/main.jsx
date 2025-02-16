import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { APIProvider } from '../src/contexts/APIContext.jsx';
import { AuthProvider } from '../src/contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
  <APIProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>  
  </APIProvider>
  </AuthProvider>
)
