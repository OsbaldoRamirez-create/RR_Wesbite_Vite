import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Footer from './Components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Home />
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
)
