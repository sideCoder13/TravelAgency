import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TravelDestination = () => {

    const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const destinationData = {
    title: "Mystical Santorini, Greece",
    description: "Experience the enchanting beauty of Santorini, where whitewashed buildings cascade down volcanic cliffs, offering breathtaking views of the Aegean Sea. Explore charming villages, witness legendary sunsets, and immerse yourself in rich Greek culture.",
    price: 2499,
    availableDates: [
      "15 Jun 2024",
      "22 Jun 2024",
      "1 Jul 2024",
      "15 Jul 2024",
      "1 Aug 2024"
    ],
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e"
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === destinationData.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === destinationData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? destinationData.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen pt-24 w-10/12 mx-auto bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Destination Header */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {destinationData.title}
        </h1>

        {/* Image Slider */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
          {destinationData.images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${currentImageIndex === index ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={image}
                alt={`Destination ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e";
                }}
              />
            </div>
          ))}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Destination Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {destinationData.description}
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Price</h2>
              <p className="text-4xl font-bold text-blue-400">
                ${destinationData.price}
                <span className="text-lg text-gray-400 ml-2">per person</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Available Dates</h2>
            <div className="flex flex-wrap gap-3">
              {destinationData.availableDates.map((date, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-medium"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <button
          onClick={()=>{navigate("/submit")}}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Book Now"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelDestination;
