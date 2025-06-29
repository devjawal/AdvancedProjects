const File=require("../models/file");
const cloudinary=require("cloudinary").v2;
exports.localFileUpload=async(req,res)=>{
    try{
        const file=req.files.file;
        console.log("file:->",file);
        let path=__dirname+"/files/"+Date.now()+`${file.name.split('.')[1]}`;
        console.log("PAth:",path);
        file.mv(path,(e)=>{
            console.log(e);
        });
        res.json({
            success:true,
            message:"File uploaded locally"
        })
    }catch(e){
        console.log(e);
        console.log("Not ble to upload on server");
    }
}
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log("File:",file);

        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"FileFormat not supported"
            })
        }

        const response=await uploadFileToCloudinary(file,"Dev")
        console.log(response);
        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            message:"Img uploaded to cloudinary"
            
        })
    }catch(e){
        console.log(e);
        console.log("Not ble to upload on Cloudinary");
    }
}

exports.videoUpload=async(req,res)=>{
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags);
        const file=req.files.videoFile;
        console.log("vidFile:",file);

        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"vidFileFormat not supported"
            })
        }

        const response=await uploadFileToCloudinary(file,"Dev")
        console.log(response);
        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            message:"vid uploaded to cloudinary"
            
        })
    }catch(e){
        console.log(e);
        console.log("Not able to upload video on Cloudinary");
    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.cmpImageFile;
        console.log("File:",file);

        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"FileFormat not supported"
            })
        }

        const response=await uploadFileToCloudinary(file,"Dev",30);
        console.log(response);
        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            message:"cmpImg uploaded to cloudinary"
            
        })
    }catch(e){
        console.log(e);
        console.log("Not able to upload cmpImg on Cloudinary");
    }
}

