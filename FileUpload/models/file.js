const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
       
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String,
       
    }
})

fileSchema.post("save",async function(doc){
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info= await transporter.sendMail({
            from:`devkaranjawal`,
            to:doc.email,
            subject:"New img posted on cloudinary",
            html:`<h2>Hello,</h2><p>File uploaded. View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("info: ",info);
    }catch(e){
        console.log("Error while sending the mail.");
        console.log(e);
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;