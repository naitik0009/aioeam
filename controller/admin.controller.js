const userModel = require("../database/models/auth.model");
const taskModel = require("../database/models/task.model");
const { ErrorResponse } = require("../utils/errorResponse.utils");
const sendMail = require("../utils/send.email");

const getAllUsers = async (request, response, next) => {
    const user = await userModel.find({});
    if (!user) {
        return next(new ErrorResponse("cannot find any user", 404));
    }

    return response.status(200).json({ code: "success", user });

};

const assignTask = async (request, response, next) => {
    const { userId, name, description, deadline } = request.body;
    const task = await taskModel.create({ userid: userId, name, description, deadline });
    if (!task) {
        return next(new ErrorResponse("Cannot upload task", 400));
    }

    const { email } = await userModel.findOne({ _id: userId });

    if (email) {
        await sendMail({
            to: email,
            subject: "New Assignment Notification",
            text: `Hey you got a new assignment and the deadline is ${deadline}\n`,
        }).catch((error) => { console.log(error) });
    }

    return response.status(200).json({ code: "success", message: "task created successfully" });
}

async function verifyUser(request, response, next) {
    const { id } = request.body;
    try {
        const data = await userModel.findOne({ _id: id });
        data.verified = true;
        const ok = await data.save();
        if (!ok) {
            return next(new ErrorResponse("couldn't verify the user please try again", 400));
        }
        const message = `hey ${data.username} your account is verified now you can access your dashboard`;

        await sendMail({
            to: data.email,
            subject: "User account verified",
            text: message,
        }).then(() => {
            return response.status(200).json({ code: "success", message: "User verified successfully" });
        });

    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
}

module.exports = { getAllUsers, assignTask,verifyUser };