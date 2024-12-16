const mongoose = require('mongoose')
require('dotenv').config()


exports.DBConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected Successfully to DB")
    }
    )
    .catch(
        (err)=>{
            console.log("Error in DB connection")
            console.error(err)
            process.exit(1)
        }
        
    )
} 
