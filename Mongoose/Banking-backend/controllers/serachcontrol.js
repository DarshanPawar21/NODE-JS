const acountsSchema = require("../module/acountsSchema");
const BranchSchema = require("../module/brachShema");
const trancationSchema = require("../module/trancationSchema");
const userScema = require("../module/userScema");

const getPagination = (req) => {
    const pageValue = req.body?.page;
    const limitValue = req.body?.limit;
    const shouldPaginate = pageValue !== undefined || limitValue !== undefined;
    const page = Math.max(parseInt(pageValue, 10) || 1, 1);
    const limit = Math.max(parseInt(limitValue, 10) || 10, 1);

    return {
        shouldPaginate,
        page,
        limit,
        start: (page - 1) * limit
    };
};

const sendSearchResult = (req, res, result) => {
    const pagination = getPagination(req);
    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / pagination.limit);
    const pageResult = pagination.shouldPaginate
        ? result.slice(pagination.start, pagination.start + pagination.limit)
        : result;

    if (totalCount == 0) {
        return res.status(404).json({
            status: false,
            message: "Data not found !",
            result: pageResult,
            ...(pagination.shouldPaginate && {
                pagination: {
                    page: pagination.page,
                    limit: pagination.limit,
                    totalCount,
                    totalPages,
                    hasNextPage: false,
                    hasPrevPage: pagination.page > 1
                }
            })
        })
    }

    return res.status(201).json({
        status: true,
        message: "Data Serach successfuly !",
        result: pageResult,
        ...(pagination.shouldPaginate && {
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalCount,
                totalPages,
                hasNextPage: pagination.page < totalPages,
                hasPrevPage: pagination.page > 1
            }
        })
    })
};

const SearchBranch = async (req, res) => {
    try {
        const { search, IFSCCode } = req.body;
        const arr = await BranchSchema.find(IFSCCode ? { IFSCCode } : {});
        const result = arr.filter(
            (a) => a.branchName.toLowerCase().includes((search || "").toLowerCase()) ||
                a.branchCity.toLowerCase().includes((search || "").toLowerCase()) ||
                a.IFSCCode.toLowerCase().includes((search || "").toLowerCase())
        );
        return sendSearchResult(req, res, result);
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}

const SearchUser = async (req, res) => {
    try {
        const { search, IFSCCode } = req.body;
        const arr = await userScema.find(IFSCCode ? { IFSCCode } : {});
        const result = arr.filter(
            (a) => a.aadharNumber.toLowerCase().includes((search || "").toLowerCase()) ||
                a.email.toLowerCase().includes((search || "").toLowerCase()) ||
                a.name.toLowerCase().includes((search || "").toLowerCase())
        );
        return sendSearchResult(req, res, result);
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}

const SearchAccount = async (req, res) => {
    try {
        const { search, IFSCCode } = req.body;
        const arr = await acountsSchema.find(IFSCCode ? { IFSCCode } : {});
        const result = arr.filter(
            (a) => a.aadharNumber.toLowerCase().includes((search || "").toLowerCase()) ||
                // a.userId.toLowerCase().includes(search.toLowerCase()) ||
                a.IFSCCode.toLowerCase().includes((search || "").toLowerCase())
        );
        return sendSearchResult(req, res, result);
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}

const SearchTransaction = async (req, res) => {
    try {
        const { search, IFSCCode } = req.body;
        const arr = await trancationSchema.find(IFSCCode ? { IFSCCode } : {});
        const result = arr.filter(
            (a) => a.accountNumber.toLowerCase().includes((search || "").toLowerCase()) ||
                // a.user_id.toLowerCase().includes(search.toLowerCase()) ||
                a.IFSCCode.toLowerCase().includes((search || "").toLowerCase())
        );
        return sendSearchResult(req, res, result);
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}

module.exports = { SearchBranch, SearchUser, SearchAccount, SearchTransaction };
