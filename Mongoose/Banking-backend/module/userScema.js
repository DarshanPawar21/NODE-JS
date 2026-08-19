const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    IFSCCode:{
        type:String,
        required:true
    },
    aadharNumber: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Users", userSchema);