import Quote from '../Components/Quote'
import RamirezLogo from '../assets/RamirezLogo.png';
import '../Styles/LandscapingStyles.css';
import Slideshow from '../Components/Slideshow';
import { yardImages } from '../Components/slideImages';

export default function LandscapingPage() {
  return (
    <div className='main-landscaping'>
    <img src={RamirezLogo} className="ramirezLogo"alt="Logo"/>
    <h1> Landscaping Services </h1>
    <Slideshow images={yardImages}/>

    <div className='landscaping-info'>
      <h3>What It Takes To Transform Your Yard </h3>
        <p> When transforming your yard it takes a great and trustable team to complete the project as you imagined it.
            At Ramirez Landscaping, we understand that each yard is a reflection of its owner's personality and dreams.
            Thats why we commit to not only meeting your expectations but exceeding them. 
            Having a team that listens to your needs and wants is key to having a successful project. Our family works closely with you 
            throughout the entire project incase there is any adjustments or ideas you come up with that need to be made. 
            We have been working with clients for over 20 years and have been able to bring their vision to life. Whether
            you are looking for a full yard transformation, inviting outdoor living areas, low maintenance landscapes, or just a simple clean up,
            our team is equipped with the latest tools and knowledge to transform your yard. Choose Ramirez Landscaping to give your outdoor space
            the care and attention it deserves. Let us bloom your yard into a vibrant, beautiful landscape that you can enjoy for years to come. 
            Fill out the information below to get a free quote and start your project ASAP! 

        </p>


    </div>
    <div className='landscaping-services'>
            <h2> Services Offered</h2>
            <div className='services'>
                <ul>  
                  
                  <li> Fencing</li>
                  <li> Irrigation Systems</li>
                  <li> Tree Work</li>
                  <li> Fruit Trees & Small Planting</li>
                  <li> Sod Installation</li>
                  <li> Pavers</li>
                  <li> Garden & Planter Boxes</li>
                  <li> Retaining Walls</li>
                  <li> Full Yard Clean Ups</li>
                </ul>
            </div>
        </div>
    
    <Quote/>
    </div>
  )
}

