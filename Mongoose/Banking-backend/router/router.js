const express = require("express");
const { addAdmin, addBranch, adduser, addAccount, addmanager, addemployee } = require("../controllers/addcontrol.js");
const { getuser, getbranch, getaccount, gettransaction, getmanagerdata, getemployee } = require("../controllers/getcontrol.js");
const { SearchBranch, SearchUser, SearchAccount, SearchTransaction } = require("../controllers/serachcontrol.js")
const { userauth, loginAdmin, loginManager, loginEmployee } = require("../controllers/auth.js");
const { transactiondetails } = require("../controllers/transacation.js")
const { checkAdminToken } = require("../middleware/middlewares.js");
const {User_data, Account_data, Transaction_data, Employee_data} = require("../controllers/manager-controls/manager_control.js")
const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/loginadmin", loginAdmin);
router.post("/loginmanager",loginManager);
router.post("/loginemployee",loginEmployee);

router.post("/addBranch", addBranch);
router.post("/addUser", adduser);
router.post("/addAccount", addAccount);
router.post("/userauth", userauth);
router.post("/addmanager",addmanager);
router.post("/transacation", transactiondetails);
router.post("/addemployee",addemployee);

router.get("/getusers", getuser);
router.get("/getbranch", getbranch);
router.get("/getaccount", getaccount);
router.get("/gettransaction", gettransaction);
router.get("/getmanager",getmanagerdata);
router.get("/getemployee",getemployee);

router.post("/searchbranch", SearchBranch);
router.post("/searchuser", SearchUser);
router.post("/searchAccount",SearchAccount);
router.post("/searchTransaction",SearchTransaction);

router.post("/manager/getuser",User_data);
router.post("/manager/getaccount",Account_data)
router.post("/manager/gettransaction",Transaction_data)
router.post("/manager/getemployee",Employee_data);
module.exports = router;