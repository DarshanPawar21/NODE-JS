const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    IFSCCode: {
        type: String,
        required: true
    },
    Employee_name: {
        type: String,
        required: true
    },
    Employee_email: {
        type: String,
        required: true
    },
    Employee_phone: {
        type: Number,
        required: true
    },
    Employee_Password: {
        type: String,
        required: true
    },
    Employee_aadharNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });




module.exports = mongoose.model("Employee", EmployeeSchema);