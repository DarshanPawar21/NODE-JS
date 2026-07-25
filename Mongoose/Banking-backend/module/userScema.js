const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    aadharNumber: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
    },
}, {
    timestamps: true
})
module.exports = mongoose.model("Users", userSchema);