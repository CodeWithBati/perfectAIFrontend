import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

const DirectoryCarousel = ({ mediaItems }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Function to determine if the URL is a video based on common video file extensions
  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  const renderMediaItem = (url, index) => {
    if (isVideo(url)) {
      return (
        <video
          key={index}
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <div className="relative w-full h-full"> {/* Ensure the container is relative */}
          <Image
            key={index}
            src={url}
            layout="fill"
            objectFit="contain" 
            alt="Carousel Media"
            unoptimized
          />
        </div>
      );
    }
  };

  return (
    mediaItems.length !== 0 &&
    (mediaItems.length === 1 ? (
      <div className="h-56 md:h-96 flex justify-center items-center">
        {renderMediaItem(mediaItems[0], 0)}
      </div>
    ) : (
      <div className="px-5">
        <Slider {...settings}>
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="p-1 h-56 md:h-96 flex justify-center items-center"
            >
              {renderMediaItem(item, index)}
            </div>
          ))}
        </Slider>
      </div>
    ))
  );
};

export default DirectoryCarousel;
