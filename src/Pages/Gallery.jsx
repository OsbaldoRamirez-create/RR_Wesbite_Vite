import "../Styles/GalleryStyles.css";
import { useState } from "react";
import { allImages } from "../Components/slideImages";



export default function Gallery() {

    /* const allImages = [
        { src: 'image1.jpg', category: 'Landscaping' },
        { src: 'image2.jpg', category: 'Maintenance' },
    ];
 */
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
            {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            )}
            {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            )}
        </div>
    </div>
  );
}