import { StarIcon as FilledStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as EmptyStarIcon } from "@heroicons/react/24/outline";

const StarsRating = ({ starsCount }) => {
  const filledStars = Math.min((Math.floor(starsCount)), 5); // Limit the filled stars to a maximum of 5
  const emptyStars = 5 - filledStars; // Calculate the number of empty stars

  return (
    <div className="flex">
      {Array(filledStars).fill(null).map((_, index) => (
        <FilledStarIcon key={index} className="h-4" />
      ))}
      {Array(emptyStars).fill(null).map((_, index) => (
        <EmptyStarIcon key={index} className="h-4" />
      ))}
    </div>
  );
};

export default StarsRating;