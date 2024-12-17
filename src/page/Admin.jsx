import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPackage, FiUsers, FiDollarSign, FiCalendar } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [packages, setPackages] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [editPackage, setEditPackage] = useState(null);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    image: "", // Corrected this to "image" instead of "images"
    availableDates: []
  });

  const getUsers = `${process.env.REACT_APP_BACKEND_URL}/admin/users`
  const getAllTours = `${process.env.REACT_APP_BACKEND_URL}/packages`
  const postTours = `${process.env.REACT_APP_BACKEND_URL}/admin/packages`
   let updateTours = `${process.env.REACT_APP_BACKEND_URL}/admin/packages`
  const deleteTours = `${process.env.REACT_APP_BACKEND_URL}/admin/packages`

  useEffect(()=>{

    const fetchData = async()=>{
      try{
        //getUsers, getAllTours
        const [res1, res2] = await axios.all([
          axios.get(getUsers),
          axios.get(getAllTours)
        ])

        setBookings(res1.data.data)
        setPackages(res2.data.data)

        console.log(res1.data.data);
        console.log(res2.data.data)

      }catch(err){
        console.log(err);
      }
    }

    fetchData()
    
  },[])

  const handleDateChange = (e) => {
    console.log(formData)
    const date = e.target.value;
    if (date && !formData.availableDates.includes(date)) {
      setFormData((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, new Date(date).toISOString()]
      }));
    }
  };

  const handleRemoveDate = (index) => {
    const updatedDates = formData.availableDates.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      availableDates: updatedDates
    }));
  };

  const handleInputChange = (e) => {
    console.log("here")
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (editPackage) {
      setPackages(packages.map(pkg => pkg.id === editPackage.id ? { ...formData, id: editPackage.id } : pkg));

      let image=null;
      const token = localStorage.getItem("token")
      if(formData.image)  image = formData.image
      // // console.log(image);
      // console.log("Token- ",token);
      // console.log("Edit Pakage- ",editPackage)
      // console.log("Form Data- ",formData)
      const res = await axios.put(updateTours+=`/${editPackage._id}`,{data:{formData,image,token}})
      console.log(res)
      setEditPackage(null);
      toast.success("Submitted Successfully")
    } else {
      console.log("Post package- ",formData);
      // New package(post package)
      const token = localStorage.getItem("token"); 
      const data = {
        formData,  
        token   
      };
      const response = await axios.post(postTours,data)
      console.log(response);
      setPackages([...packages, { ...formData, id: packages.length + 1 }]);
    } 
    setFormData({ name: "", description: "", price: "", availableDates: [], image: "" });
  };

  const handleEdit = (pkg) => {
    setEditPackage(pkg);
    setFormData(pkg);
    setActiveTab("add");
  };

  const handleDelete = async(id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    console.log(id);
    const token = localStorage.getItem("token")
    const ans = await axios.delete(deleteTours+`/${id}`,{ data:{token}});
    console.log(ans);
  };

  const DashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <FiPackage className="text-blue-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Packages</p>
            <h3 className="text-2xl font-bold">{packages.length}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <FiUsers className="text-green-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Bookings</p>
            <h3 className="text-2xl font-bold">{bookings.length}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <FiDollarSign className="text-yellow-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold">Rs
              {packages.reduce((total, pkg) => total + pkg.price, 0)}
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <FiCalendar className="text-purple-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Active Tours</p>
            <h3 className="text-2xl font-bold">{packages.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const PackageList = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {packages.map((pkg,key) => (
            <tr key={pkg.id}>
              <td className="px-6 py-4 whitespace-nowrap">{pkg.title}</td>
              <td className="px-6 py-4">{pkg.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">Rs {pkg.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  const PackageForm = () => (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold text-sm text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title} // Bind to formData.title
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10"
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={formData.description} // Bind to formData.description
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10"
          required
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price} // Bind to formData.price
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10"
          required
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image} // Bind to formData.image
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10"
          required
        />
      </div>

      {/* Available Dates */}
      <label>
        <div className="block text-gray-700 text-sm font-bold mb-2">Available Dates:</div>
        <input
          type="date"
          name="availableDate"
          onChange={handleDateChange}
          className="w-[20%] mb-5 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition duration-200 pl-10"
        />
      </label>

  {/* Display added dates */}
    <ul>
      {formData.availableDates.map((date, index) => (
        <li key={index}>
          {new Date(date).toLocaleDateString()}{" "}
          <button className="p-3" type="button" onClick={() => handleRemoveDate(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>

  
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {editPackage ? "Update Package" : "Add Package"}
      </button>
    </form>
  );
  


  const BookingsOverview = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking?.tours[0]?.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking?.tours[0]?.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">YatraNow Admin Dashboard</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`${
                  activeTab === "dashboard"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("packages")}
                className={`${
                  activeTab === "packages"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Packages
              </button>
              <button
                onClick={() => setActiveTab("add")}
                className={`${
                  activeTab === "add"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Add Package
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`${
                  activeTab === "bookings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Bookings
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "dashboard" && <DashboardOverview />}
        {activeTab === "packages" && <PackageList />}
        {activeTab === "add" && <PackageForm />}
        {activeTab === "bookings" && <BookingsOverview />}
      </div>
    </div>
  );
};

export default AdminDashboard;