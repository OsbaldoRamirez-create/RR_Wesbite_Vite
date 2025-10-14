import "../Styles/GalleryStyles.css";
import { useState } from "react";
import { allImages } from "../Components/slideImages";



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

const handleFilterChange = (filter) => {
  setActiveFilter(filter);
  setCurrentPage(1);
};

    return (
        <div className="gallery-outer">
            <div className="gallery-container">
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
        {pagedImages.map((img, index) => (
            <img key={index} src={img.src} alt={img.category} />
        ))}
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
            </div>
        </div>
  );
}