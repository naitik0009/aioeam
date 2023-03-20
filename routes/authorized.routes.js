const express = require("express");
const authRoute = express.Router();
const authorization = require("../middlewares/authorization");
const {profile,getAllTasks,updateUserProfile,taskUpload} = require("../controller/authorized.controller");
authRoute.route("/profile").get(authorization,profile);
authRoute.route("/profile/update").patch(authorization,updateUserProfile);
authRoute.route("/upload").post(taskUpload);
authRoute.route("/getAllTasks").get(getAllTasks);
module.exports = authRoute;
