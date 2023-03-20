const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User",
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    deadline:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

const assignmentModel = mongoose.model("Task",assignmentSchema);

module.exports = assignmentModel;