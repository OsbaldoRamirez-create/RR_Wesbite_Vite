import React, {useState, useRef} from 'react'
import '../Styles/BeforeAfterSliderStyles.css';

export default function BeforeAfterSlider({beforeImage, afterImage}) {

  const containerRef = useRef(null);
  
  const[dividerPosition, setDividerPosition] = useState(50);
  
  const isDragging=useRef(false);

  
  const startDragging = () =>{
    isDragging.current = true;
  };
  const stopDragging = () =>{
     isDragging.current = false;
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;

    // Get the bounding rectangle of the container
    const rect = containerRef.current.getBoundingClientRect();
    // Get the mouse position relative to the viewport
    const x = e.clientX || (e.touches && e.touches[0].clientX);

    // Calculate the offset of the mouse position relative to the container
    const offsetX = x - rect.left;

    // Calculate the new position of the divider based on the mouse position
    // Ensure the position is within bounds (0 to 100)
    const newPosition = Math.max(0,Math.min(100,(offsetX/rect.width) * 100));

    // Update the divider position state
    setDividerPosition(newPosition);
    
  };

  return (
    <div className='before-after-slider' 
    ref={containerRef} // Reference to the container for mouse events
    onMouseMove={handleMove}
    onMouseUp={stopDragging}
    onMouseLeave={stopDragging}
    onTouchMove={handleMove}
    onTouchEnd={stopDragging}  
    style={{"--divider-position": `${dividerPosition}%`}}  // Custom property for CSS
    >
      <img src={beforeImage} alt="Before" className='before-image' />
      <div className='after-img-div'>
      <img src={afterImage} alt="After" className='after-image' /> 
      </div>
      <div className='slider-handle'
        style={{left:`${dividerPosition}%`}} // Position the handle based on the divider position
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        <div className='handle'>
          <span>‹</span>
          <span>›</span>
        </div>
      
      </div>
    </div>

  )
}