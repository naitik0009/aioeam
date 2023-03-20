const {getAllUsers,assignTask} = require("../controller/admin.controller");

const express = require("express");
const router = express.Router();
router.route("/admin/getAllUsers").get(getAllUsers);
router.route("/admin/assignTask").post(assignTask);

module.exports = router;