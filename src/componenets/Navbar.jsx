import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();


  return (
    <div className="bg-gray-900 shadow-md fixed flex pl-36  w-11/12 z-50">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-around">
                <div className="flex items-center">
                <img
                    src={logo}
                    alt="Travel Agency Logo"
                    className="h-12 w-auto"
                />
                {/* <span className="ml-3 text-xl font-bold text-white">YatraNow</span> */}
                </div>
                
                <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-300 hover:text-blue-400 text-lg">Home</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 text-lg">Services</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 text-lg">Destinations</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 text-lg">About Us</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 text-lg">Contact</a>
                <button onClick={()=>{navigate()}} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-sm">
                    Book Now
                </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar