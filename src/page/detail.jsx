import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TravelDestination = () => {

  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [destinationData, setDestinationData] = useState({});
  const id = useParams().id;

  useEffect(()=>{
    const fetchData = async () => {
      try{
        
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/packages/${id}`)
        if(!data){
          console.log("no data")
        }else{
          console.log(data.data.data)
          // change date format
          setDestinationData(data.data.data)
        }
      }catch(err){
        console.log(err)
      }
    }

    fetchData();
    
  },[])


  const nextImage = () => {
    if(destinationData.images.length-1 > currentImageIndex+1){
      setCurrentImageIndex((prevIndex) =>
        prevIndex === destinationData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
   
  };

  const prevImage = () => {
    if(currentImageIndex !== 0){
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? destinationData.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 w-10/12 mx-auto bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      { destinationData && <div className="max-w-7xl mx-auto">
        {/* Destination Header */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {destinationData.title}
        </h1>

        {/* Image Slider */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
          {destinationData.images && destinationData.images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${currentImageIndex === index ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={image}
                alt={`Destination ${index + 1}`}
                className="w-full h-full object-cover"
                
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
                Rs{destinationData.price}
                <span className="text-lg text-gray-400 ml-2">per person</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Available Dates</h2>
            <div className="flex flex-wrap gap-3">
              {destinationData.availableDates && destinationData.availableDates.map((date, index) => {
                const dates = new Date("2024-12-20T00:00:00.000Z");
                const formattedDate = dates.toDateString();
                return <span
                  key={index}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-medium"
                >
                  {
                    formattedDate
                  }
                </span>
              })}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <button
          onClick={()=>{navigate(`/submit/${id}`)}}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Book Now"
          >
            Book Now
          </button>
        </div>
      </div>
    }
    </div>
  );
};

export default TravelDestination;
