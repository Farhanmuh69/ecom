import React from 'react';

function StarRating({ rating, maxRating = 5 }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating).keys()].map((star) => (
        <svg
          key={star}
          fill="currentColor"
          stroke="currentColor"
          className={`w-4 h-4 ${rating >= star + 1 ? 'text-yellow-300' : 'text-gray-400'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ))}
      <span className="text-gray-600 ml-3">{rating}</span>
    </div>
  );
}

export default StarRating;
