const adminSchema = require("../module/adminSchema.js");
const BrachSchema = require("../module/brachShema.js");
const UserSchema = require("../module/userScema.js");
const AccountShema = require("../module/acountsSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerSchema = require("../module/managerSchema.js");
const userScema = require("../module/userScema.js");
const brachShema = require("../module/brachShema.js");
const employeeSchema = require("../module/employeeSchema.js");
const JWT_SECRET = process.env.JWT_SECRET || "!@#$%^&*()";

const addAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await adminSchema.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(200).json({
            status: true,
            message: "admin added successfully !",
            result,
            token
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "admin add failed !",
            err: err.message
        });
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
        const { name, IFSCCode, aadharNumber, phone, email, accountType, balance } = req.body;
        let user = await UserSchema.findOne({ aadharNumber });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User Not found enter user !",
            })
            const result = await UsreSchema.create(req.body);
        }
        let branch = await BrachSchema.findOne({ IFSCCode });
        if (!IFSCCode) {
            return res.status(404).json({
                status: false,
                message: "branch Not found !",
            })
            const result = await UsreSchema.create(req.body);
        }
        const newaccount = await AccountShema.create({
            userId: user._id,
            aadharNumber: user.aadharNumber,
            branchId: branch._id,
            IFSCCode: branch.IFSCCode,
            accountNumber: '1000' + Math.floor(10000000 + Math.random() * 90000000),
            accountType: accountType || 'savings',
            balance,
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
        const { name, email, aadharNumber, phone, password, IFSCCode } = req.body;

        if (!name || !email || !aadharNumber || !phone || !IFSCCode) {
            return res.status(400).json({
                status: false,
                message: "name, email, aadharNumber, and phone are required !"
            });
        }

        const user = await UserSchema.findOne({ aadharNumber });
        if (user) {
            return res.status(409).json({
                status: false,
                message: "User is aadharNumber already exists"
            });
        }
        const hash = await bcrypt.hash(password, 10);
        const result = await UserSchema.create({ name, email, aadharNumber, phone, password: password, IFSCCode });

        res.status(201).json({
            status: true,
            message: 'User is Create Successfully !',
            result
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User add failed successfuly !",
            err: err.message
        });
    }
};

const addmanager = async (req, res) => {
    try {
        const { name, email, aadharNumber, phone, IFSCCode, password } = req.body;

        const branch = await brachShema.findOne({ IFSCCode });
        if (!branch) {
            return res.status(409).json({
                status: false,
                message: "Branch Not found !",
            });
        }
        const manager_aadharNumber = await managerSchema.findOne({ aadharNumber });
        if (manager_aadharNumber) {
            return res.status(400).json({
                status: false,
                message: "Manager is already exists !",
            });
        };

        const hashpassword = await bcrypt.hash(password, 10)
        const result = await managerSchema.create({
            name: name,
            email: email,
            aadharNumber: aadharNumber,
            phone: phone,
            IFSCCode: branch.IFSCCode,
            password: hashpassword
        })
        return res.status(201).json({
            status: true,
            message: 'Manger is Create Successfully !',
            result
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "User add failed successfuly !",
            err: err.message
        });
    }
};

const addemployee = async (req, res) => {
    try {
        const { IFSCCode, Employee_name, Employee_email, Employee_phone, Employee_password, Employee_aadharNumber } = req.body;

        // Un-comment if you want to validate branch
        // const branch = await branchSchema.findOne({ IFSCCode });
        // if (!branch) {
        //     return res.status(404).json({
        //         status: false,
        //         message: "Branch Not found !",
        //     });
        // }

        // FIX: Check if Employee EXISTS (Remove the '!' operator)
        const Employee = await employeeSchema.findOne({ Employee_email });
        if (Employee) { 
            return res.status(409).json({
                status: false,
                message: "Employee is already exists !",
            });
        }

        const hashPassword = await bcrypt.hash(Employee_password, 10);
        const result = await employeeSchema.create({
            IFSCCode,
            Employee_name,
            Employee_email,
            Employee_phone,
            Employee_Password: hashPassword,
            Employee_aadharNumber
        });

        res.status(201).json({
            status: true,
            message: 'Employee Created Successfully !',
            result
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Employee add failed !",
            err: err.message
        });
    }
}
module.exports = { addAdmin, addBranch, addAccount, adduser, addmanager, addemployee};