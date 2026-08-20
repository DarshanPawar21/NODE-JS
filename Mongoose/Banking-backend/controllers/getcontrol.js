const acountsSchema = require("../module/acountsSchema.js");
const brachShema = require("../module/brachShema.js");
const employeeSchema = require("../module/employeeSchema.js");
const managerSchema = require("../module/managerSchema.js");
const trancationSchema = require("../module/trancationSchema.js");
const userSchema = require("../module/userScema.js");
const { addAccount } = require("./addcontrol.js");

const getPagination = (req) => {
    const pageValue = req.query.page || req.body?.page;
    const limitValue = req.query.limit || req.body?.limit;
    const shouldPaginate = pageValue !== undefined || limitValue !== undefined;
    const page = Math.max(parseInt(pageValue, 10) || 1, 1);
    const limit = Math.max(parseInt(limitValue, 10) || 10, 1);

    return {
        shouldPaginate,
        page,
        limit,
        skip: (page - 1) * limit
    };
};

const sendData = async (req, res, Model, filter, successMessage) => {
    const pagination = getPagination(req);

    if (!pagination.shouldPaginate) {
        const result = await Model.find(filter);
        return res.status(200).json({
            status: true,
            message: successMessage,
            result
        });
    }

    const totalCount = await Model.countDocuments(filter);
    const result = await Model.find(filter).skip(pagination.skip).limit(pagination.limit);

    return res.status(200).json({
        status: true,
        message: successMessage,
        result,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            totalCount,
            totalPages: Math.ceil(totalCount / pagination.limit),
            hasNextPage: pagination.page < Math.ceil(totalCount / pagination.limit),
            hasPrevPage: pagination.page > 1
        }
    });
};

const getuser = async (req, res) => {
    try {
        return await sendData(req, res, userSchema, {}, "User data fetch successfully !");
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
        return await sendData(req, res, brachShema, {}, "branch data fetch successfully !");
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
        return await sendData(req, res, acountsSchema, {}, "User data fetch successfully !");
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
        return await sendData(req, res, trancationSchema, {}, "Account data fetch successfully !");
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Account data fetch failed !",
            err: err.message
        });
    }
};

const getmanagerdata = async (req, res) => {
    try {
        return await sendData(req, res, managerSchema, {}, "Manager data fetch successfully !")
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Manager data fetch failed !",
            err: err.message
        });
    }
}

const getemployee = async (req, res) => {
    try {
        return await sendData(req, res, employeeSchema, {}, "Employee data fetch successfully !")
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Emplyee data fetch failed !",
            err: err.message
        });
    }
}
module.exports = { getuser, getbranch, getaccount, gettransaction, getmanagerdata, getemployee };
