import React, {useState, useEffect}from 'react'
import '../Styles/SlideshowStyles.css';

const Slideshow = ({images}) => {
    
    const [slideIndex, setSlideIndex]=useState(0);
useEffect(() => {
    const timer = setTimeout(()=>
        setSlideIndex((slideIndex + 1) % images.length), 4000);
        return () => clearTimeout(timer);
},[slideIndex, images.length]);


const isLocal = (typeof window !== "undefined" && window.location.hostname === "localhost");

//cloudflare image optimization
const cfImages = (src,{width = 800, quality = 75, fit = "scale-down"}={}) => {
    if(!src || src.startsWith("data:") || isLocal) return src; // Return the original src if it's empty or a data URL
    const path = src.startsWith("/") ? src : `/${src}`;
    return `/cdn-cgi/image/format=auto,quality=${quality},fit=${fit},width=${width}${path}`;
};
  
    return (
      <div className='slideshow-main'>
    <div className="slideshow-container"> 
  
         {images.map((image, index) => (
            <div key={index} className= {`slide ${index === slideIndex ? 'active': ''}`}> 
            {/*add cloudflare image optimization*/}
            <img src={cfImages(image.src,{width:1200,quality:80})}
            srcSet={`
              ${cfImages(image.src, {width:800, quality: 80})} 800w,
              ${cfImages(image.src, {width:1200, quality: 80})} 1200w,
              ${cfImages(image.src, {width:1600, quality: 80})} 1600w
              `} 
            sizes="(max-width: 1096px) 100vw, 1200px"
            alt={image.alt}
            width={1200} 
            height={650}
            loading = {index === slideIndex ? 'eager' : 'lazy'}
            />
          {/*   <div className='slide-text'>{image.text}</div> */}
            </div>
          ))}
  
          {/*Slideshow Arrows */ }
          <button className="prev" onClick={() => setSlideIndex((slideIndex -1 + images.length) % images.length)}>&#10094;</button>
          <button className="next" onClick={() => setSlideIndex((slideIndex +1) % images.length)}>&#10095;</button>
         </div> 
  
      {/* slideshow dots */}
        <div className=" dot-container">
            {images.map((_, dotIndex)=>(
              <span key={dotIndex} className={`dot ${dotIndex === slideIndex ? 'active-dot': ''}`}
              onClick={()=> setSlideIndex(dotIndex)}> </span>
            ))}

      </div>
    
    </div>
  );
};
export default Slideshow;
