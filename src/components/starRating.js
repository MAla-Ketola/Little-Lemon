import React from "react";

const StarRating = ({ rating = 5 }) => {
  const maxStars = 5;
  return (
    <div 
    className="star-rating"
    role="img"
    aria-label={`${rating} out of ${maxStars} stars`}>
      {[...Array(maxStars)].map((_, i) => (
        <span key={i} className={i < rating ? "filled" : ""} aria-hidden="true">★</span>
      ))}
    </div>
  );
};

export default StarRating;