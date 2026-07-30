const express = require("express");
const { addAdmin, addBranch, adduser, addAccount, loginAdmin } = require("../controllers/addcontrol.js");
const { checkAdminToken } = require("../middleware/middlewares.js");
const { getuser } = require("../controllers/getcontrol.js");
const { userauth } = require("../controllers/auth.js");
const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/addBranch", addBranch);
router.post("/addUser", adduser);
router.post("/addAccount", addAccount);
router.get("/getaccount", getuser);
router.post("/loginadmin",loginAdmin,checkAdminToken);
router.post("/userauth",userauth)

module.exports = router;