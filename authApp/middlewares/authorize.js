const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }
        //verify token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            console.log(decode);
        }catch(e){
            return res.status(401).json({
                success:false,
                message:"Token invalid"
            })
        }
        next();
    }catch(e){
        return res.status(401).json({
                success:false,
                message:"Something went wrong while verifying token"
            })
    }
}
exports.isStudent=async(req,res,next)=>{
    try{
        console.log(req.user.role);
        if(req.user.role!="Student"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for students Other roles not allowed"
            })
        }

        next();
    }
    catch(e){
        return res.status(401).json({
                success:false,
                message:"User role not matched!"
            })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin"
            })
        } 
        next();
    }
    catch(e){
        console.log(e);
        return res.status(401).json({
                success:false,
                message:"User role not matched!"
            })
    }
}