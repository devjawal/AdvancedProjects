const bcrypt= require("bcrypt");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User exists'
            }); 
        }
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);

        }
        catch(e){
            return res.status(500).json({
                success:false,
                message:"Error in hashing Password"
            })
        }
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        res.status(200).json({
            success:true,
            message:"User created!"
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered."
        })
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill data correctly"
            })
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered"
            })
        }

        const payload= {
            email:user.email,
            id:user._id,
            role:user.role
        }

        if(await bcrypt.compare(password,user.password) ){
             let token=jwt.sign(payload,process.env.JWT_SECRET,
                {
                    expiresIn:"10h"
                }
             );
             
             user.token=token;
             user.password=undefined;
             console.log(user);
             const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
             }

             res.cookie("token1",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in!"
             });
        }
        else{
            return res.status(403).json({
            success:false,
            message:"Password Incorrect!"
        })
        }

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Login Controller Error"
        })
    }
}