const {ErrorResponse} = require("../utils/errorResponse.utils");
const userModel = require("../database/models/auth.model");
const taskModel = require("../database/models/task.model");
var fs = require('fs');
var path = require("path");
let i = 0;

function profile (request,response,next){
    let user = request.user;
    return response.status(200).json({code:"success",message:"You are authorized to access this route",data:user});
};

const dashboard = async(request,response,next)=>{
    const username = request.headers.username;
    const userData = await userModel.findOne({username}).lean();
    const task = await taskModel.findOne({userid:userData._id}).lean();
    if(!data){
        return next(new ErrorResponse("Can't Find Any task for this user",404));
    }
    return response.status(200).json({code:"success",message:data});
}

const taskUpload = async(request,response,next)=>{
    const folderName = String(request.files.task.name.split(".")[0]);
    console.log(request.files);
    var dir = path.join(__dirname,`${folderName.split(" ")[0]}`);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
   
    const file = request.files.task;
    const uploadPath = __dirname+`/${folderName.split(" ")[0]}/`+`${++i}`+".pdf";
    const move = file.mv(uploadPath,(error)=>{
        console.log(error);
    })
    console.log(folderName);
    
        return response.send("ok");
    

}

async function verifyUser(request,response,next){
    
}

async function getAllTasks(request,response,next){
    const id = request.headers.id;
    console.log(id);
    const task = await taskModel.find({userid:id});
    if(!task){
        return next(new ErrorResponse("cannot find any task for you",404))
    }
    return response.status(200).json({code:"success",message:"successfully retrieved all tasks for this user",task});
}

async function updateUserProfile(request,response,next){
    
    const user=request.user;
    
    const body = request.body;
    
    if(!user){
        return next(new ErrorResponse("no user can be found you're not authorized"));
    }

   try {
    const update = await userModel.updateOne({_id:user._id},body);
    if(!update){
        return next(new ErrorResponse("Can't update the user data please try again"));
    }
    return response.status(200).json({code:"success",message:"successfully updated your profile"});
   } catch (error) {
    return next(error);
   }

    
};

module.exports = {profile,updateUserProfile,taskUpload,getAllTasks};