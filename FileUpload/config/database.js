const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Connection with db successfull!")})
    .catch((e)=>{
        console.log("Connection with db not successfull!");
        process.exit(1); 
    });
}