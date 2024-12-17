
const Tour = require("../modals/Tour");
const User = require("../modals/user")

//auth
exports.postAdminPackages = async (req,res)=>{
    try{

        console.log(req.body);
        const {title,description,price,availableDates,images} = req.body.formData;

        const tour = new Tour({
            title,
            description,
            price,
            availableDates,
            images
        })
        
        await tour.save();

        return res.status(200).json({
            success:true,
            message:"Packages By Admin posted successfully!"
        })

    }catch(err){
        console.error("Error in posting package- ",err);
        res.status(401).json({
            success:false,
            message:"Error in posting package"
        })
    }
}

exports.deletePackage = async (req,res)=>{
    try{
        console.log("here");
        const {id} = req.params;

        const result = await Tour.deleteOne({_id:id});

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Tour not found or already deleted."
            });
        }

        return res.status(200).json({
            success:true,
            message:"Deleted Package successfully!"
        })

    }catch(err){
        console.error("Error in deleting package-",err);
        res.status(401).json({
            success:false,
            message:"Error in deleting package"
        })
    }
}

exports.getAdminPackagesbyID = async (req,res)=>{
    try{

        // console.log(req.body)
        const {id} = req.params;

        const { title, description, price, availableDates } = req.body.data.formData;
        const image = req.body.data.image
        
        const tour = await Tour.findOne({_id:id});
        const images = [...tour.images,image];

        const updatedTour = await Tour.findOneAndUpdate(
            { _id: id },  //find document by id
            { $set: { title, description, price, availableDates,images } },  // Fields to update
            { new: true }  //ensures that the returned document is the updated one
        );

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tour updated successfully!",
            data: updatedTour
        });

    }catch(err){
        console.error("Error in 3- ",err);
        res.status(401).json({
            success:false,
            message:"Error in authenticating token"
        })
    }
}

exports.getAllUser = async (req,res)=>{
    try{

        const users = await User.find({}).populate("tours").lean();

        res.status(200).json({
            success:true,
            message:"Packages By Admin posted successfully!",
            data: users
        })

    }catch(err){
        console.error("Error in posting package- ",err);
        res.status(401).json({
            success:false,
            message:"Error in posting package"
        })
    }
}