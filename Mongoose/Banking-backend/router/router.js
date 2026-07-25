const express = require("express");
const router = express.Router();

// Correct Destructured Import
const { addAdmin, addBranch, adduser, addAccount } = require("../controllers/addcontrol.js");

router.post("/addAdmin", addAdmin);
router.post("/addBranch", addBranch);
router.post("/addUser", adduser);
router.post("/addAccount", addAccount);

module.exports = router;