const mongoose = require("mongoose");

const BrachnSchema = new mongoose.Schema({
    branchCode: {
        type: String,
    },
    branchName: {
        type: String,
    },
    branchCity: {
        type: String,
    }
}, { timestamps: true })
module.exports = mongoose.model("Branch", BrachnSchema);