import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
      <Home />
    </BrowserRouter>
  </StrictMode>,
)
