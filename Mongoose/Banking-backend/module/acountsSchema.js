const mongoose = require("mongoose");

const AccountShcema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    aadharNumber: {
        type: String,
        required: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    madebyManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
    },
    IFSCCode: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    accountType: {
        type: String,
        enum: ["saving", "current"],
        default: 'saving',
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
},
    { timestamps: true });
module.exports = mongoose.model('Account', AccountShcema);