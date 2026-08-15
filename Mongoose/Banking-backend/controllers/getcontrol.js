const acountsSchema = require("../module/acountsSchema.js");
const brachShema = require("../module/brachShema.js");
const trancationSchema = require("../module/trancationSchema.js");
const userSchema = require("../module/userScema.js");
const { addAccount } = require("./addcontrol.js");

const getuser = async (req, res) => {
    try {
        const result = await userSchema.find();
        return res.status(200).json({
            status: true,
            message: "User data fetch successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "User data fetch failed !",
            err: err.message
        });
    }
};

const getbranch = async (req, res) => {
    try {
        const result = await brachShema.find();
        return res.status(200).json({
            status: true,
            message: "branch data fetch successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "User data fetch failed !",
            err: err.message
        });
    }
};

const getaccount = async (req, res) => {
    try {
        const result = await acountsSchema.find();
        return res.status(200).json({
            status: true,
            message: "User data fetch successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "User data fetch failed !",
            err: err.message
        });
    }
};

const gettransaction = async (req, res) => {
    try {
        const result = await trancationSchema.find();
        return res.status(200).json({
            status: true,
            message: "Account data fetch successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Account data fetch failed !",
            err: err.message
        });
    }
};

module.exports = { getuser, getbranch, getaccount, gettransaction };