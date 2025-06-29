const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    },
    token:{
        type:String,
        required:false
    }
})
module.exports=mongoose.model("User",userSchema);