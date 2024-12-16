const User = require("../modals/user")
const Tour = require("../modals/Tour")
require('dotenv').config();


exports.getPackages = async (req,res)=>{
    try{
        const packages = Tour.find({});

        if(!packages){
            return res.status(400).json({
                success:false,
                message:"No tours found!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Fetched Packages Successfully!",
            data: packages
        })
        
    }catch(err){
        console.error("Details error- ",err);
        res.status(401).json({
            success:false,
            message:"Error in getting details"
        })
    }
}

exports.getPackegesByID = async(req,res)=>{
    try{
        const {id} = req.params;

        const tour = Tour.findById({_id:id});

        return res.status(200).json({
            success:true,
            message:"Fetched Packages by ID Successfully!",
            data:  tour
        })
    }catch(err){
        console.error("Details error- ",err);
        res.status(401).json({
            success:false,
            message:"Error in getting details"
        })
    }
}

// user submits his details and the tour he wants to buy
exports.submitPackage = async(req,res)=>{
    try{

        const {id, Name, email, phone, NoOfTravellers, specialRequest} = req.body;

        const tour = await Tour.findById(id);  
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        const newUser = new User({
            Name,
            email,
            phone,
            NoOfTravellers,
            specialRequest,
            tours: [tour._id] 
        })

        await newUser.save();

        return res.status(200).json({
            success:true,
            message:"Submited Packages Successfully!",
            data: newUser
        })
    }catch(err){
        console.error("Details error- ",err);
        res.status(401).json({
            success:false,
            message:"Error in getting details"
        })
    }
}