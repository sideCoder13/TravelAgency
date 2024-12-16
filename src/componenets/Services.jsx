import React from 'react'
import {  FaHotel, FaMap, FaSuitcase } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";

const service = [
  { icon: < FaTrainSubway/>, title: "Train Booking", description: "Find the best deals on flights worldwide" },
  { icon: <FaHotel />, title: "Hotel Reservations", description: "Book luxury accommodations globally" },
  { icon: <FaMap />, title: "Tour Packages", description: "Customized tour packages for everyone" },
  { icon: <FaSuitcase />, title: "Travel Insurance", description: "Comprehensive travel protection plans" }
];





const Services = () => {
  return (
    <section className="py-20 bg-gray-800">
      {/* Services Section */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.map((serviceItem, index) => (
            <div key={index} className="p-6 bg-gray-900 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="text-3xl text-blue-400 mb-4">{serviceItem.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">{serviceItem.title}</h3>
              <p className="text-gray-400 text-sm">{serviceItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services;
