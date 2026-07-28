import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home.jsx'
import Footer from './Components/Footer.jsx'
import Landscaping from './Pages/Landscaping.jsx'
import About from './Pages/About.jsx'
import MaintenancePage from './Pages/Maintenance.jsx'
import ContactPage from './Pages/Contact.jsx'
import Gallery from './Pages/Gallery.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
import RamirezLogo from './assets/RR_Logo.png' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop/>
      <div className="app-container">
      <Navbar />
      
      <img src={RamirezLogo} className="ramirezLogo"alt="Logo"/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/landscaping" element={<Landscaping/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* add other routes here, e.g. /about, /contact, /maintenance */}
      </Routes>
      <Footer/>
      
      </div>
    </BrowserRouter>
  </StrictMode>,
)
