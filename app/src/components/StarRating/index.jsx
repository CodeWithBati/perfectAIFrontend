import React from 'react';

const StarRating = ({ rating, maxRating = 5 }) => {
  // Function to determine the fill percentage of each star
  const getStarFill = (starIndex) => {
    if (starIndex <= rating) {
      return 100; // Full star
    } else if (starIndex - rating < 1) {
      return (rating % 1) * 100; // Partial fill for fractional star
    }
    return 0; // Unfilled star
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = getStarFill(index + 1);
        return (
          <svg
            key={index}
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillPercentage}%`} stopColor="#6B21A8" />
                <stop offset={`${fillPercentage}%`} stopColor="#d3d3d3" />
              </linearGradient>
            </defs>
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill={fillPercentage === 100 ? "#6B21A8" : `url(#grad-${index})`}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
