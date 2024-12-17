const express = require('express')

const router = express.Router();

const {getPackages, getPackegesByID, submitPackage} = require("../controllers/details")
const {postAdminPackages,getAllUser,getAdminPackagesbyID,deletePackage} = require("../controllers/auth")
const {adminLogin,verifyToken} = require("../middleware/adminAuth")

//travel details routes
router.get("/packages",getPackages)
router.get("/packages/:id",getPackegesByID)
router.post("/bookings",submitPackage)

// admin routes
router.post("/admin/login",adminLogin)
router.post("/admin/packages",verifyToken,postAdminPackages)
router.put("/admin/packages/:id",verifyToken,getAdminPackagesbyID)
router.delete("/admin/packages/:id",verifyToken,deletePackage)
router.get("/admin/users",getAllUser)




module.exports = router;