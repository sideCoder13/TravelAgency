const express = require('express')
const { DBConnect } = require('./config/database')
const routes = require('./routes/routes')
const morgan = require("morgan")
const cors = require('cors')

const app = express()

require('dotenv').config()


const PORT = process.env.PORT || 4000

// miidlewares
app.use(express.json())
// app.use(cors()) // Enable CORS for all routes and origins
// CORS should be mentioned first among middleware
app.use(cors({
    origin: 'https://travelagency-1-0hz5.onrender.com' // Allow only this origin
}));
app.use(morgan('dev'))
app.use("/api/v1",routes)




app.listen(PORT,()=>{
    console.log(`The server has started at ${PORT}`)
})

// const DBConnect = require('./config/database')
DBConnect()
// const Routes = require()
// app.use(Routes,)
