const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.adminLogin = async (req,res)=>{
    try{
        const {user, password} = req.body;

        if(user==="admin" && password=="admin123"){
            const payload = { username: "admin"};
            const options = { expiresIn: '1h' };

            const token = jwt.sign(payload, process.env.JWT_SECRET, options);
            // req.token = token;

            //create new cookie and send response 
            const option = {
                httpOnly: true, 
                secure: true,
                expires: new Date(Date.now() + 3*24*60*60*1000)
            }
            return res.cookie("token", token, option).status(200).json({
                success:true,
                token,
                user,
                message:"Successfully logged in"
            })

        }

        return res.status(200).json({
            success:true,
            message:"Admin logged in successfully!"
        })

    }catch(err){
        console.error("Error in logging the admin- ",err);
        res.status(401).json({
            success:false,
            message:"Error in logging the admin"
        })
    }
}



exports.verifyToken = async (req,res,next)=>{
    try{
        // console.log(req)
        // const token = null;
        const token = req.cookie?.token || req.body?.token || req.header("Authorisation")?.replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing!"
            })
        }

        try{
            //decode token
            const decode = jwt.decode(token,process.env.JWT_SECRET);
            console.log("Auth middleware token - ", decode),
            req.user = decode
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error in decoding JWT token (auth middleware)"
            })
        }
        next();

    }
    catch(err){
        console.error("Error in logging the admin- ",err);
        res.status(401).json({
            success:false,
            message:"Error in logging the admin"
        })
    }
}
