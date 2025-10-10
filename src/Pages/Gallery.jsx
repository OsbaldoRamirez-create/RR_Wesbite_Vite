import "../Styles/GalleryStyles.css";
import { useState } from "react";



export default function Gallery() {

    const allImages = [
        { src: 'image1.jpg', category: 'Landscaping' },
        { src: 'image2.jpg', category: 'Maintenance' },
    ];

const filters = ['All', 'Landscaping', 'Maintenance', 'Tree', 'Fence', 'Pavers'];
const [activeFilter, setActiveFilter] = useState('All');
const [currentPage, setCurrentPage] = useState(1);

const imagesPerPage = 20; // Number of images to show per page

const filteredImages = activeFilter === 'All' 
? allImages 
: allImages.filter(img => img.category === activeFilter);

const totalImages = Math.ceil(filteredImages.length / imagesPerPage);
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

      <h1>Gallery Page</h1>
      <p>This is where the gallery content will go.</p>
    </div>
  );
}