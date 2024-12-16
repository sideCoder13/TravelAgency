const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim: true,
    },
    phone:{
        type:Number,
        required:true,
        trim: true,
    },
    NoOfTravellers:{
        type:Number,
        required:true,
        trim: true,
    },
    specialRequest:{
        type:String,
        trim: true,
    },
    tours:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Tour"
        }
    ]
})

module.exports = mongoose.model("User",userSchema)