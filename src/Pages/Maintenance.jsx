import '../Styles/MaintenanceStyles.css';
import Quote from '../Components/Quote';
import Slideshow from '../Components/Slideshow';
import { yardImages2 } from '../Components/slideImages';

export default function MaintenancePage() {
  return (
    <div className='maintenance-container'>
        <h1>Maintenance Services</h1>

        <Slideshow images={yardImages2}/>    
        <div className='maintenance-info'>
            <h3>We Take Care Of All Yards </h3>
            <p>
                At Ramirez Landscaping, we offer a variety of services to help you maintain your yard whether 
                it's weekly, bi-weekly, or monthly. Our team is committed to enhancing the beauty of your 
                outdoor spaces, ensuring that each visit leaves your property looking pristine and well-kept.
                We treat every yard as it if were our own, taking pride in our attention to detail. 
                Utilizing the best equipment and latest techniques, we care for your yard efficiently and effectively. 
                With Ramirez Landscaping, you receive not just a service provider, but a dedicated partner
                who values your satisfaction and the health of your landscape. Hire us today and experience the difference we can make!
                Let our family maintain your yard, so you can enjoy your beautiful garden without the hassle.
            </p>
        </div>
        <div className='maintenance-services'>
            <h2> Our Services Include:</h2>
            <div className='yard-services'>
                <ul>  
                  <li>Lawn Care</li>
                  <li>Leaf Removal</li>
                  <li>Prune Fruit trees</li>
                  <li>Irrigation Repair & Management</li>
                  <li>Seasonal Planting</li>
                  <li>Weed Control</li>
                  <li>Fertilize Lawn & Plants</li>
                  <li>Gutter & Roof Cleaning</li>
                  <li>Shrub and Hedge Trimming</li>
                </ul>
            </div>
        </div>
        <div className='service-area'>
            <h2> Service Area</h2>
            <p> Ramirez Landscaping serves clients throughout the West,
                East and South Bay area, including the following communities and all areas in between</p>
            <ul>
                <li>Redwood City</li>
                <li>San Carlos</li>
                <li>Woodside</li>
                <li>Menlo Park</li>
                <li>Fremont</li>
                <li>Los Altos</li>
                <li>San Mateo</li>
                <li>Belmont</li>
                <li>Portola Valley</li>
                <li>Palo Alto</li>
                <li>Atherton</li>
                <li>Campbell</li>
            </ul>
        </div>
        <Quote/>
    </div>
  )
}
