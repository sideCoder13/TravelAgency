import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { FaDownload, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const InvoiceGeneration = () => {
  const { id } = useParams();
  const [tourPrice, setTourPrice] = useState(0);
  const [tourName, setTourName] = useState("");
  const [user, setUser] = useState(null);
  
  const invoiceData = {
    services: [
      { name: "Website Fees", price: 1000 },
      { name: "GST", price: 100 }
    ]
  };

  const totalAmount = () => {
    return invoiceData.services.reduce((sum, service) => sum + service.price, 0) + tourPrice;
  };

  useEffect(() => {
    const getUser = `${process.env.REACT_APP_BACKEND_URL}/admin/users`;

    axios.get(getUser)
      .then((response) => {
        const ans = response.data.data.find((user) => user._id === id);
        if (ans) {
            // console.log(ans)
          setUser(ans);
          const len = ans.tours.length;
          setTourPrice(ans.tours[len - 1]?.price || 0);
          setTourName(ans.tours[len - 1].title)
          toast.success("Invoice generated successfully");
        } else {
          toast.error("User not found");
        }
      })
      .catch((error) => {
        toast.error("Error fetching user data");
      });
  }, [id]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(20);
    doc.text("YatraNow Invoice", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Booking ID: ${user._id}`, 20, 40);
    doc.text(`Customer: ${user.Name}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

    doc.text("Services:", 20, 80);
    let yPos = 90;
    doc.text(`Tours And Travels - Rs ${tourPrice}`, 30, yPos);
    yPos += 10;
    invoiceData.services.forEach((service) => {
      doc.text(`${service.name} - Rs ${service.price}`, 30, yPos);
      yPos += 10;
    });

    // Add total
    doc.text(`Total Amount: Rs ${totalAmount()}`, 20, yPos + 20);

    // Save PDF
    doc.save(`invoice-${user._id}.pdf`);
  };

  if (!user) return <div>Loading...</div>;  // Add a loading state

  return (
    <div className="pt-24 min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">YatraNow</h1>
            </div>
            <div className="space-x-2">
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-2"
              >
                <FaDownload />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Invoice Details</h2>
              <p className="text-gray-600">Booking ID: {user._id}</p>
              <p className="text-gray-600">Tour Name: {tourName}</p>
              <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Customer Details</h2>
              <p className="text-gray-600">Name: {user.Name}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Services</h2>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800">Tours and Travels</td>
                  <td className="px-6 py-4 text-sm text-gray-800 text-right">Rs {tourPrice}</td>
                </tr>
                {invoiceData.services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800">{service.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-right">Rs {service.price}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">Total</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                    Rs {totalAmount()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t pt-8">
            <div className="text-sm text-gray-600">
              <p>Avenue B2, Global City, Mumbai</p>
              <p>Phone: 8374562904</p>
              <p>Email: yatraNow@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGeneration;
