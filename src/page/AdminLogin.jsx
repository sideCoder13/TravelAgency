import React, { useContext, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";

const AdminLogin = () => {

  const {setToken} = useContext(AppContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      console.log("Form submitted:", formData);
      const url = `${process.env.REACT_APP_BACKEND_URL}/admin/login`
      axios.post(url,formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token",response.data.token)
        setToken(response.data.token)
        toast.success("Admin Login successful");
        navigate("/admin")
      })
      .catch((err)=>{
        toast.error("Admin Login Failed")
        console.log(err)
      })
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserShield className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 mt-2">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.username ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10`}
                placeholder="Enter your username"
                aria-label="Username"
              />
              <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10`}
                placeholder="Enter your password"
                aria-label="Password"
              />
              <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure Admin Portal - Authorized Access Only
        </p>
      </div>
    </div>
  );
};
export default AdminLogin;
