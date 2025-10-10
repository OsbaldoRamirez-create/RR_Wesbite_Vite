import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Footer from './Components/Footer.jsx'
import Landscaping from './Pages/Landscaping.jsx'
import About from './Pages/About.jsx'
import MaintenancePage from './Pages/Maintenance.jsx'
import ContactPage from './Pages/Contact.jsx'
import Gallery from './Pages/Gallery.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/landscaping" element={<Landscaping/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* add other routes here, e.g. /about, /contact, /maintenance */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
