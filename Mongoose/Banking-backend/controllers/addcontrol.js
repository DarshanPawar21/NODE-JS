const adminSchema = require("../module/adminSchema.js");
const BrachSchema = require("../module/brachShema.js");
const UserSchema = require("../module/userScema.js");
const AccountShema = require("../module/acountsSchema.js")
const addAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await adminSchema.create(req.body);
        res.status(200).json({
            status: true,
            message: "admin add successfuly !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "admin add failed successfuly !",
            err: err.message
        })
    }
};

const addBranch = async (req, res) => {
    try {
        const { branchCode, branchName, branchCity } = req.body;
        const result = await BrachSchema.create(req.body);
        res.status(201).json({
            status: true,
            message: "Branch add successfuly !",
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Branch add failed !",
            err: err.message
        })
    }
}

const addAccount = async (req, res) => {
    try {
        const { name, branchCode, aadharNumber, phone, email, accountType, intDeposit } = req.body;
        let user = await UserSchema.findOne({ aadharNumber });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User Not found enter user !",
            })
            const result = await UsreSchema.create(req.body);
        }
        let branch = await BrachSchema.findOne({ branchCode });
        if (!branch) {
            return res.status(404).json({
                status: false,
                message: "branch Not found !",
            })
            const result = await UsreSchema.create(req.body);
        }
        const newaccount = await AccountShema.create({
            userId: user._id,
            branchId: branch._id,
            accountNumber: '1000' + Math.floor(10000000 + Math.random() * 90000000),
            accountType: accountType || 'savings',
            balance: intDeposit || 0
        });
        const allaccount = await AccountShema.find({ userId: user._id });
        res.status(201).json({
            status: true,
            message: 'Account Create Successfully !',
            allaccount
        })
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
};

const adduser = async (req, res) => {
    try {
        const { name, email, aadharNumber, phone } = req.body;
        const result = await UserSchema.create(req.body);
        res.status(201).json({
            status: true,
            message: 'User is Create Successfully !',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User add failed successfuly !",
            err: err.message
        })
    }
};
module.exports = { addAdmin, addBranch, addAccount, adduser }