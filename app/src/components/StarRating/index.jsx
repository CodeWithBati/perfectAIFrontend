import React from 'react';

const StarRating = ({ rating, maxRating = 5, size = 'md' }) => {
  // Function to determine the fill percentage of each star
  const getStarFill = (starIndex) => {
    if (starIndex <= rating) {
      return 100; // Full star
    } else if (starIndex - rating < 1) {
      return (rating % 1) * 100; // Partial fill for fractional star
    }
    return 0; // Unfilled star
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3 mr-[0.05rem]'; // Small size
      case 'lg':
        return 'w-6 h-6  mr-[0.25rem]'; // Large size
      default:
        return 'w-5 h-5  mr-[0.25rem]'; // Medium size (default)
    }
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = getStarFill(index + 1);
        return (
          <svg
            key={index}
            className={`${getSizeClass()}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fillPercentage}%`} stopColor="#8B60B2" />
                <stop offset={`${fillPercentage}%`} stopColor="#8B60B2" />
              </linearGradient>
            </defs>
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill={fillPercentage === 100 ? "#8B60B2" : `#8B60B2`}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
