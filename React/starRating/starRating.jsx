import { useState } from "react";
import "./StarRating.css";
const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0); // Store the selected rating
  const [hover, setHover] = useState(0); // Store the star hover rating
  // Determine if the hover or click is on the left (half-star) or right (full-star) side
  const getStarHoverValue = (event, index) => {
    const { offsetX, target } = event.nativeEvent;
    const isHalf = offsetX < target.offsetWidth / 2; // Check if cursor is on the left side of the star
    return isHalf ? index - 0.5 : index;
  };
  // Handle hover event
  const handleMouseMove = (event, index) => {
    setHover(getStarHoverValue(event, index));
  };
  // Handle click event
  const handleStarClick = (event, index) => {
    setRating(getStarHoverValue(event, index));
  };
  // Reset hover when the mouse leaves
  const handleMouseLeave = () => {
    setHover(0);
  };
  // render stars with rating and hover functionality
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const index = i + 1;
      const isFull = hover >= index || rating >= index;
      const isHalf = hover === index - 0.5 || rating === index - 0.5;
      stars.push(
        <div
          key={index}
          className="star-container"
          onMouseMove={(e) => handleMouseMove(e, index)}
          onClick={(e) => handleStarClick(e, index)}
        >
          <span
            className={`star ${isFull ? "full" : isHalf ? "half" : "empty"}`}
          >
            ★
          </span>
        </div>,
      );
    }
    return stars;
  };
  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {renderStars()}
    </div>
  );
};
export default StarRating;
