const acountsSchema = require("../module/acountsSchema");
const BranchSchema = require("../module/brachShema");
const trancationSchema = require("../module/trancationSchema");
const userScema = require("../module/userScema");

const SearchBranch = async (req, res) => {
    try {
        const { search } = req.body;
        const arr = await BranchSchema.find();
        const result = arr.filter(
            (a) => a.branchName.toLowerCase().includes(search.toLowerCase()) ||
                a.branchCity.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Data not found !",
                result
            })
        }
        return res.status(201).json({
            status: true,
            message: "Data Serach successfuly !",
            result
        })
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
        const { search } = req.body;
        const arr = await userScema.find();
        const result = arr.filter(
            (a) => a.aadharNumber.toLowerCase().includes(search.toLowerCase()) ||
                a.email.toLowerCase().includes(search.toLowerCase()) ||
                a.name.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Data not found !",
                result
            })
        }
        return res.status(201).json({
            status: true,
            message: "Data Serach successfuly !",
            result
        })
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
        const { search } = req.body;
        const arr = await acountsSchema.find();
        const result = arr.filter(
            (a) => a.aadharNumber.toLowerCase().includes(search.toLowerCase()) ||
                // a.userId.toLowerCase().includes(search.toLowerCase()) ||
                a.IFSCCode.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Data not found !",
                result
            })
        }
        return res.status(201).json({
            status: true,
            message: "Data Serach successfuly !",
            result
        })
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
        const { search } = req.body;
        const arr = await trancationSchema.find();
        const result = arr.filter(
            (a) => a.accountNumber.toLowerCase().includes(search.toLowerCase()) ||
                // a.user_id.toLowerCase().includes(search.toLowerCase()) ||
                a.IFSCCode.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Data not found !",
                result
            })
        }
        return res.status(201).json({
            status: true,
            message: "Data Serach successfuly !",
            result
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}

module.exports = { SearchBranch, SearchUser, SearchAccount, SearchTransaction };