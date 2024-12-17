import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {

  const navigate = useNavigate()

  const id = useParams().id;

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    NoOfTravellers: "",
    specialRequest: "",
    id:id
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.NoOfTravellers) {
      newErrors.NoOfTravellers = "Number of travelers is required";
    } else if (formData.NoOfTravellers < 1) {
      newErrors.NoOfTravellers = "At least 1 traveler is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      const url = `${process.env.REACT_APP_BACKEND_URL}/bookings`
      axios.post(url,formData)
      .then((response) => {
        console.log(response.data.data)
        const userId = response.data.data._id
        toast.success("Booking submitted successfully!");
        navigate(`/invoice/${userId}`)
      })
      .catch((err)=>{
        toast.error("Booking Not Successfull")
        console.log(err)
      })

      setFormData({
        Name: "",
        email: "",
        phone: "",
        NoOfTravellers: "",
        specialRequest: ""
      });
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Booking Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white ${errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-600 focus:ring-blue-400"}`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-600 focus:ring-blue-400"}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white ${errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-600 focus:ring-blue-400"}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="travelers">
              Number of Travelers *
            </label>
            <input
              type="number"
              id="travelers"
              name="NoOfTravellers"
              value={formData.NoOfTravellers}
              onChange={handleChange}
              min="1"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white ${errors.travelers ? "border-red-500 focus:ring-red-400" : "border-gray-600 focus:ring-blue-400"}`}
              placeholder="Enter number of travelers"
            />
            {errors.NoOfTravellers && (
              <p className="text-red-400 text-sm mt-1">{errors.NoOfTravellers}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="specialRequests">
              Special Requests
            </label>
            <textarea
              id="specialRequests"
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
              rows="4"
              placeholder="Enter any special requests"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;