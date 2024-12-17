import React, { useState, useEffect } from "react";
import Services from "../componenets/Services"
import Testimonials from "../componenets/Testimonials";
import Footer from "../componenets/Footer";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  
  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const [tourPackages, setTourPackages] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/packages`)
        if(!data){
          console.log("no data")
        }else{
          const result = Object.values(data.data.data)
          // console.log(result)
          setTourPackages(result)
        }
      }catch(err){
        console.log(err)
      }
    }

    fetchData();
    
  },[])


  return (
    <div className=" w-11/12 mx-auto min-h-screen bg-gray-800">

        {/* Tour Packages Section */}
        <section className="pt-24 pb-12 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Tour Packages</h2>
            <div className=" pt-8 px-12 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tourPackages && tourPackages.map((pkg, index) => (
                <div key={index} className=" bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <div className="relative">
                    <img
                        src={`${pkg.images[0]}`}
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
                    <button onClick={() => {handleClick(pkg._id)} } className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-sm">
                        Details
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