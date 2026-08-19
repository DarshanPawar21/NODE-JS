const acountsSchema = require("../../module/acountsSchema");
const employeeSchema = require("../../module/employeeSchema");
const managerSchema = require("../../module/managerSchema");
const trancationSchema = require("../../module/trancationSchema");
const userScema = require("../../module/userScema");
// import { loginAdmin } from "../auth";




const User_data = async (req, res) => {
    try {
        const { IFSCCode } = req.body;
        const result = await userScema.find({ IFSCCode });

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Data is not found !"
            })
        };

        return res.status(201).json({
            status: true,
            message: "Data is found !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User Data fetch failed !",
            err: err.message
        });
    }
};

const Account_data = async (req, res) => {
    try {
        const { IFSCCode } = req.body;
        const result = await acountsSchema.find({ IFSCCode });

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Data is not found !"
            })
        };

        return res.status(201).json({
            status: true,
            message: "Data is found !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User Data fetch failed !",
            err: err.message
        });
    }
};

const Transaction_data = async (req, res) => {
    try {
        const { IFSCCode } = req.body;
        const result = await trancationSchema.find({ IFSCCode });

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Data is not found !"
            })
        };

        return res.status(201).json({
            status: true,
            message: "Data is found !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User Data fetch failed !",
            err: err.message
        });
    }
};

const Employee_data = async (req, res) => {
    try {
        const { IFSCCode } = req.body;
        const result = await employeeSchema.find({ IFSCCode });

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Data is not found !"
            })
        };

        return res.status(201).json({
            status: true,
            message: "Data is found !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User Data fetch failed !",
            err: err.message
        });
    }
};
module.exports = { User_data, Account_data, Transaction_data, Employee_data};