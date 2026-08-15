const mongoose = require("mongoose");

const BrachnSchema = new mongoose.Schema({
    IFSCCode: {
        type: String,
    },
    branchName: {
        type: String,
    },
    branchCity: {
        type: String,
    },
    branchPhone:{
        type:String
    }
}, { timestamps: true })
module.exports = mongoose.model("Branch", BrachnSchema);