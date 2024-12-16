import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      text: "The trip to Bali was absolutely magical! The beaches were pristine, and the local experiences arranged by the agency were unforgettable. I couldn't have asked for a better vacation!",
      name: "Rahul Shah",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1582550945154-66e47c1bc87f"
    },
    {
      id: 2,
      text: "Our Paris adventure was like a dream come true. From the Eiffel Tower to the charming cafes, everything was perfectly organized. The local guide was exceptional!",
      name: "Rishikesh Singh",
      location: "Surat, Gujrat",
      image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b"
    },
    {
      id: 3,
      text: "Thailand exceeded all expectations! The mix of culture, food, and adventure was perfect. The agency's attention to detail made our trip stress-free and amazing.",
      name: "Roshan Sharma",
      location: "Noida, Delhi",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
    },
    {
      id: 4,
      text: "The Maldives experience was absolutely breathtaking! Crystal clear waters and luxury accommodations made this trip unforgettable. Highly recommend!",
      name: "Abhishiek Sharma",
      location: "Banglore, Karnataka",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-16 bg-gray-900">
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-800">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full flex-shrink-0 flex flex-col md:flex-row items-center p-8 bg-gradient-to-r from-gray-800 to-gray-700"
            >
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-600 shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                  }}
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <div className="relative">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {review.text}
                  </p>
                  <h3 className="text-xl font-bold text-white">{review.name}</h3>
                  <p className="text-blue-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          aria-label="Previous review"
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          aria-label="Next review"
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-blue-400" : "bg-gray-600"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
