import '../Styles/FooterBarStyles.css';
import { NavLink } from 'react-router-dom';

export default function FooterBar() {
  return (
    <footer>
        <NavLink to="/">Home</NavLink>                
        <NavLink to="/about">About</NavLink>
        {/* <NavLink to="/services">Services</NavLink> */}
        <NavLink to="/contact">Contact us</NavLink>
        <p>© Copyright by Ramirez Reyes Landscaping</p>
    </footer>
  )
}