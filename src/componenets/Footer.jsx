import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-lg font-bold mb-4">YatraNow</h3>
                <p className="text-gray-400 text-sm">Your trusted travel partner since 2024</p>
            </div>
            <div>
                <h4 className="text-base font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-base font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-400 text-sm">Email: info@travelpro.com</p>
                <p className="text-gray-400 text-sm">Phone: +1 234 567 890</p>
            </div>
            <div>
                <h4 className="text-base font-semibold mb-4">Newsletter</h4>
                <div className="flex">
                <input
                    type="email"
                    placeholder="Your email"
                    className="p-2 rounded-l text-gray-900 flex-1 text-sm"
                />
                <button className="bg-blue-600 px-4 rounded-r hover:bg-blue-700 transition duration-300 text-sm">
                    Subscribe
                </button>
                </div>
                <div className="flex space-x-4 mt-6">
                <FaFacebook className="text-xl hover:text-blue-400 cursor-pointer" />
                <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
                <FaInstagram className="text-xl hover:text-blue-400 cursor-pointer" />
                <FaLinkedin className="text-xl hover:text-blue-400 cursor-pointer" />
                </div>
            </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">© 2024 YatraNow. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer