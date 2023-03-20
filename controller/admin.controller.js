const userModel = require("../database/models/auth.model");
const taskModel = require("../database/models/task.model");
const {ErrorResponse} = require("../utils/errorResponse.utils");


const getAllUsers =async (request,response,next)=>{
    const user = await userModel.find({});
    if(!user){
        return next(new ErrorResponse("cannot find any user",404));
    }

    return response.status(200).json({code:"success",user});

};

const assignTask = async (request,response,next)=>{         
    const {userId,name,description,deadline} = request.body;
    const task = await taskModel.create({userid:userId,name,description,deadline});
    if(!task){
        return next(new ErrorResponse("Cannot upload task",400));
    }
    
    return response.status(200).json({code:"success",message:"task created successfully"});
}

module.exports = {getAllUsers,assignTask};