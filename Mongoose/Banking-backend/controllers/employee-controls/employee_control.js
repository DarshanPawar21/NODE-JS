const acountsSchema = require("../../module/acountsSchema");
const employeeSchema = require("../../module/employeeSchema");
const trancationSchema = require("../../module/trancationSchema");
const userScema = require("../../module/userScema");

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

const sendBranchData = async (req, res, Model, filter) => {
    const pagination = getPagination(req);

    if (!pagination.shouldPaginate) {
        const result = await Model.find(filter);
        return res.status(201).json({
            status: true,
            message: "Data is found !",
            result
        });
    }

    const totalCount = await Model.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / pagination.limit);
    const result = await Model.find(filter).skip(pagination.skip).limit(pagination.limit);

    return res.status(201).json({
        status: true,
        message: "Data is found !",
        result,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            totalCount,
            totalPages,
            hasNextPage: pagination.page < totalPages,
            hasPrevPage: pagination.page > 1
        }
    });
};

const User_data = async (req, res) => {
    try {
        const { IFSCCode } = req.body;
        return await sendBranchData(req, res, userScema, { IFSCCode });
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
        return await sendBranchData(req, res, acountsSchema, { IFSCCode });
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
        return await sendBranchData(req, res, trancationSchema, { IFSCCode });
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
        return await sendBranchData(req, res, employeeSchema, { IFSCCode });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User Data fetch failed !",
            err: err.message
        });
    }
};

module.exports = { User_data, Account_data, Transaction_data, Employee_data };
