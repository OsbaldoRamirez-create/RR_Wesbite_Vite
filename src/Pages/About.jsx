import Quote from '../Components/Quote'
/* import Slideshow from './Components/Slideshow' */
import '../Styles/AboutStyles.css';
/* import {yardImages2} from './Components/SlideImages'; */
import BeforeAfterSlider from '../Components/BeforeAfterSlider';
import before from '../assets/BeforePALawn.png';
import after from '../assets/AfterPALawn.png';

export default function About() {
  return (
    <div className="about-container">
        <h1> About Us</h1>
        <BeforeAfterSlider beforeImage={before} afterImage={after}/>
        {/* <Slideshow images={yardImages2}/> */}
        <div className='about-info'>
        <h2> Why Choose Us?</h2>
        <p>
            At Ramirez Landscaping, we bring your vision to life while giving fair prices. We have been maintaining and remaking yards for over 20 years all over the bay area
            even having loyal customers since we started. 
            We are a family owned and operated business that offers various services to help you bloom your yard.
            Each yard is unique so we take the time to hear what our clients are looking for so we can satisfy them while staying in their budget. 
            Fill out the form below so that our family can start working with you and transforming your yard! 
        </p> 
        </div>
        <div className='services-container'>
            <h2> Services Offered</h2>
            <div className='services'>
                <ul>  
                  <li> Yard Maintenance</li>
                  <li> Fencing</li>
                  <li> Irrigation Systems</li>
                  <li> Tree Work</li>
                  <li> Landscaping</li>
                  <li> Sod Installation</li>
                  <li> Mulching</li>
                  <li> Planting</li>
                  <li> Clean Ups </li>
                </ul>
            </div>
        </div>
        <Quote/>
    </div>
        

  )
}
