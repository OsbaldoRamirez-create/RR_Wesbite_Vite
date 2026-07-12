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
: allImages.filter(img => img.category === activeFilter);

const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

//images for current page
const pagedImages = filteredImages.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

// lightbox state
const [lightboxOpen, setLightboxOpen] = useState(false)
const [lightboxIndex, setLightboxIndex] = useState(0) // index in filteredImages

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

const handleFilterChange = (filter) => {
  setActiveFilter(filter);
  setCurrentPage(1);
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
            <img key={index} 
            src={img.src} 
            alt={img.category} 
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
                                <div className="gallery-modal" onClick={e=>e.stopPropagation()}>
                                    <button className="modal-close" onClick={()=> setLightboxOpen(false)}>×</button>
                                    <button className="modal-prev" onClick={()=> setLightboxIndex(i => Math.max(0, i - 1))}>‹</button>
                                    <img src={filteredImages[lightboxIndex].src} alt={filteredImages[lightboxIndex].category}/>
                                    <button className="modal-next" onClick={()=> setLightboxIndex(i => Math.min(filteredImages.length - 1, i + 1))}>›</button>
                                </div>
                            </div>
                        )}
                <Quote/>
                </div>
                </div>
    );
}