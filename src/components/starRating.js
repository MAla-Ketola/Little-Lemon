import React from "react";

const StarRating = ({ rating = 5 }) => {
  const maxStars = 5;
  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, i) => (
        <span key={i} className={i < rating ? "filled" : ""}>★</span>
      ))}
    </div>
  );
};

export default StarRating;