const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    IFSCCode: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ["credit", "debit"]
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    tranamount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);