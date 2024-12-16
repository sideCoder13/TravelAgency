import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPackage, FiUsers, FiDollarSign, FiCalendar } from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Paradise Island Getaway",
      description: "Experience luxury on a pristine island",
      price: 1299,
      duration: "7 days",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21"
    },
    {
      id: 2,
      name: "Mountain Adventure Trek",
      description: "Challenging trails and breathtaking views",
      price: 899,
      duration: "5 days",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "John Doe",
      packageName: "Paradise Island Getaway",
      bookingDate: "2024-02-15",
      status: "Confirmed"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      packageName: "Mountain Adventure Trek",
      bookingDate: "2024-02-20",
      status: "Pending"
    }
  ]);

  const [editPackage, setEditPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPackage) {
      setPackages(packages.map(pkg => pkg.id === editPackage.id ? { ...formData, id: editPackage.id } : pkg));
      setEditPackage(null);
    } else {
      setPackages([...packages, { ...formData, id: packages.length + 1 }]);
    }
    setFormData({ name: "", description: "", price: "", duration: "", image: "" });
  };

  const handleEdit = (pkg) => {
    setEditPackage(pkg);
    setFormData(pkg);
    setActiveTab("add");
  };

  const handleDelete = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
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
            <h3 className="text-2xl font-bold">$
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
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td className="px-6 py-4 whitespace-nowrap">{pkg.name}</td>
              <td className="px-6 py-4">{pkg.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">${pkg.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Package Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.packageName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.bookingDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tour Package Management Dashboard</h1>
        
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