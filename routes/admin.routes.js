const {getAllUsers,assignTask,verifyUser} = require("../controller/admin.controller");

const express = require("express");
const router = express.Router();
router.route("/admin/getAllUsers").get(getAllUsers);
router.route("/admin/assignTask").post(assignTask);
router.route("/admin/verifyUser").post(verifyUser);

module.exports = router;