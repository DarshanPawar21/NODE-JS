const express = require("express");
// const { default: adminSchema } = require("../module/adminSchema");
const addadmin = require("../controllers/addcontrol.js");
const router = express.Router();

router.post("/", addadmin);
module.exports = router;