const mongoose =require('mongoose');
require("dotenv").config();

const connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("Connected to DB")})
    .catch((e)=>{
        console.log("DB connection unsuccessful");
        process.exit(1);
    })
}
module.exports=connect;