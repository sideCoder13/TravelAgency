const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
    price:{
        type:Number,
        required:true,
        trim: true,
    },
    availableDates:[
        {
            type:Date,
            required:true,
            trim: true,
        }
    ],
    images:[{
        type:String,
        required:true,
        trim: true,
    }],
    
})

module.exports = mongoose.model("Tour",tourSchema)