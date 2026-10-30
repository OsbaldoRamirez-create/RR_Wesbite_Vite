import "../Styles/GalleryStyles.css";
import { useState, useEffect } from "react";
import { allImages } from "../Components/slideImages";
import Quote from "../Components/Quote";



export default function Gallery() {

const filters = ['All', 'Landscaping', 'Maintenance', 'Tree', 'Fence', 'Pavers'];
const [activeFilter, setActiveFilter] = useState('All');
const [currentPage, setCurrentPage] = useState(1);

const imagesPerPage = 20; // Number of images to show per page

//filter images based on active filter
const filteredImages = activeFilter === 'All' 
? allImages 
: allImages.filter(img => {
    //categories array
    if(Array.isArray(img.categories)) {
        return img.categories.includes(activeFilter)
    }
    //single category
    if(img.category) {
        return img.category === activeFilter
    }
    return false;
});

const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

//images for current page
const pagedImages = filteredImages.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

// Function to check if the app is running locally
const isLocal = (typeof window !== "undefined" && window.location.hostname === "localhost");
//cloudflare image optimization
const cfImages = (src,{width = 800, quality = 75, fit = "scale-down"}={}) => {
    if(!src || src.startsWith("data:") || isLocal) return src; // Return the original src if it's empty or a data URL
    const path = src.startsWith("/") ? src : `/${src}`;
    return `/cdn-cgi/image/format=auto,quality=${quality},fit=${fit},width=${width}${path}`;
};

// lightbox state
const [lightboxOpen, setLightboxOpen] = useState(false)
const [lightboxIndex, setLightboxIndex] = useState(0) // index in filteredImages

const [startTouchX, setStartTouchX] = useState(null);
const handleTouchStart = (e) => {
    setStartTouchX(e.touches[0].clientX);
};

useEffect(() => {
    function onKey(e){
        if(!lightboxOpen) return
        if(e.key === 'ArrowRight') setLightboxIndex(i => Math.min(filteredImages.length - 1, i + 1))
        if(e.key === 'ArrowLeft') setLightboxIndex(i => Math.max(0, i - 1))
        if(e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
}, [lightboxOpen, filteredImages.length])

//handle 
 useEffect(() => {
    if(lightboxOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none'; // disable touch scrolling for mobile
    } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = ''; // re-enable touch scrolling
    }
    return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = ''; // cleanup on unmount
    };
}, [lightboxOpen]);

const handleFilterChange = (filter) => {
  setActiveFilter(filter);
  setCurrentPage(1);
};

const handleTouchEnd = (e) => {
    if (startTouchX === null) return;
    const endTouchX = e.changedTouches[0].clientX;
    const deltaX = endTouchX - startTouchX;
    if (Math.abs(deltaX) > 50) { // threshold
        if (deltaX > 0) {
            setLightboxIndex(i => Math.max(0, i - 1)); // swipe right(previous)
        } else {
            setLightboxIndex(i => Math.min(filteredImages.length - 1, i + 1)); // swipe left(next)
        }
    }
    setStartTouchX(null);
};


    return (
        <div className="gallery-outer">   
        <div className="gallery-container">

        <h1>View our beautiful work</h1>


        <div className="filter-buttons">
            {filters.map((filter) => (
                <button key={filter} 
                onClick={() => handleFilterChange(filter)} 
                className={activeFilter === filter ? 'active' : ''} 
                >
                {filter}
                </button>
            ))}
        </div>

    {/* image grid */}
    <div className="image-grid">
        {pagedImages.map((img, index) => {
            const globalIndex = (currentPage - 1) * imagesPerPage + index
            return (
            <img
            loading="lazy"
            key={globalIndex} 
            //responsive sources
            src={cfImages(img.src,{width:400, quality:70})}
            srcSet ={`
                ${cfImages(img.src, {width:300,quality:70})} 300w,
                ${cfImages(img.src, {width:400,quality:70})} 400w,
                ${cfImages(img.src, {width:500,quality:70})} 500w,
                ${cfImages(img.src, {width:600,quality:70})} 600w,
                `}
            sizes="
            (max-width:480px) 50vw,
            (max-width:768px) 50vw,
            (max-width:880px) 33vw,
            (max-width:1600px) 25vw,
            20vw
            " 
            alt={img.alt || img.category || (img.categories && img.categories[1])} 
            width={400}
            height={300}
            onClick={() => { 
                setLightboxIndex(globalIndex); 
                setLightboxOpen(true) }}
             style={{ cursor: 'pointer' }} />
        )})}
    </div>
    {/* pagination controls */}
        <div className="pagination">
        {/*gets previous page number */}
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>

            {/* calculate page numbers based on total pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                    key={num}
                    className={num === currentPage ? 'page-number active' : 'page-number'}
                    onClick={() => setCurrentPage(num)}
                >
                    {num}
                </button>
            ))}
            {/*gets next page number */}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
                </div>
                        {/* modal */}
                        {lightboxOpen && (
                            <div className="gallery-modal-overlay" onClick={()=> setLightboxOpen(false)}>
                                <div className="gallery-modal" 
                                onClick={e=>e.stopPropagation()}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                >
                                    <button className="modal-close" 
                                    onClick={()=> setLightboxOpen(false)}>×</button>
                                    <button className="modal-prev" 
                                    onClick={()=> setLightboxIndex(i => Math.max(0, i - 1))}>‹</button>
                                    
                                <div className="modal-image-container">
                                    <img 
                                    src={cfImages(filteredImages[lightboxIndex].src,
                                        {width:1200, quality:80})}
                                    sizes="max-width:1100px 95vw 1000px"  
                                    alt={filteredImages[lightboxIndex].category} 
                                    width={1000}
                                    height={600}
                                    />
                                    {/* Image caption */}
                                    <div className="slide-text modal-slide-text">
                                    {filteredImages[lightboxIndex].text}
                                    </div>
                                </div>
                                    <button className="modal-next" 
                                    onClick={()=> setLightboxIndex(i => Math.min(filteredImages.length - 1, i + 1))}
                                    >›
                                    </button>
                                </div>
                            </div>
                        )}
                
                </div>
                <Quote/>
                </div>
    );
}