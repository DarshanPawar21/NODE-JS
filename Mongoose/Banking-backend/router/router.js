const express = require("express");
const { addAdmin, addBranch, adduser, addAccount } = require("../controllers/addcontrol.js");
const { getuser, getbranch, getaccount, gettransaction } = require("../controllers/getcontrol.js");
const { SearchBranch } = require("../controllers/serachcontrol.js")
const { userauth, loginAdmin } = require("../controllers/auth.js");
const { transactiondetails } = require("../controllers/transacation.js")
const { checkAdminToken } = require("../middleware/middlewares.js");
const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/loginadmin", loginAdmin);
router.post("/addBranch", addBranch);
router.post("/addUser", adduser);
router.post("/addAccount", addAccount);
router.get("/getaccount", getuser);
router.post("/userauth", userauth);
router.post("/transacation", transactiondetails);

router.get("/getusers", getuser);
router.get("/getbranch", getbranch);
router.get("/getaccount", getaccount);
router.get("/gettransaction", gettransaction)

router.post("/searchbranch",SearchBranch);
module.exports = router;