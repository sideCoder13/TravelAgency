import React, { useState, useEffect } from "react";
import Navbar from "../componenets/Navbar"
import Services from "../componenets/Services"
import Testimonials from "../componenets/Testimonials";
import Footer from "../componenets/Footer";
import { useNavigate } from "react-router-dom"; 

const Homepage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const id = 123;  // This could come from state, props, etc.
    navigate(`/details/${id}`);
  };

  const tourPackages = [
    {
      title: "Leh-Ladakh Adventure Tour",
      description: "Explore the mesmerizing landscapes of Leh and Ladakh with this adventurous tour package. Visit Pangong Lake, Nubra Valley, Khardung La Pass, and Buddhist monasteries. Enjoy activities like river rafting and trekking, and experience the unique culture of the region.",
      price: "₹25,000",
      availableDates: "May to September",
      image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1185/Leh_Etta%20Talwar%20Dutta.jpg"
    },
    {
      title: "Royal Rajasthan Tour ",
      description: "This package covers the regal charm of Jaipur along with the romantic vibes of Udaipur. Explore the Amber Fort, City Palace, Jantar Mantar, and more. End the tour with a visit to the serene Lake Pichola and Jag Mandir in Udaipur.",
      price: "₹18,500",
      availableDates: "October to March",
      image:"https://www.royalrajasthantour.net/images/udaipur-tour.jpg"
    },
    {
      title: "Goa Beach Holiday",
      description: "Enjoy a 4-day beach vacation in Goa, with leisure time at some of the most beautiful beaches like Baga, Anjuna, and Palolem. Visit historic forts, churches, and enjoy Goan cuisine and culture.",
      price: "₹12,000",
      availableDates: "November to March",
      image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/56/09/d0/caption.jpg?w=1400&h=800&s=1"
    },
    {
      title: "Kerala Backwaters & Hill Stations Tour",
      description: "Explore the tranquil backwaters of Alleppey and Kumarakom on a houseboat, visit the tea gardens and spice plantations in Munnar, and relax on the beaches of Varkala or Kovalam.",
      price: "₹20,000",
      availableDates: "October to March",
      image:"https://www.keralaholidays.com/uploads/tourpackages-gallery/thumb/10Nights-11Days-Kerala-Tour.jpg"
    }
  ];


  return (
    <div className=" w-11/12 mx-auto min-h-screen bg-gray-800">

        {/* Tour Packages Section */}
        <section className="pt-24 pb-12 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Tour Packages</h2>
            <div className=" pt-8 px-12 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tourPackages.map((pkg, index) => (
                <div key={index} className=" bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <div className="relative">
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-64 object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                            {pkg.price}
                        </div>
                    </div>
                    {/* <p className="text-gray-400 text-sm">{pkg.availableDates}</p> */}
                    <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                    <button onClick={handleClick} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-sm">
                        Deatils
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>

        <Services/>

        <Testimonials/>

        <Footer/>
        
    </div>
  );
};

export default Homepage;