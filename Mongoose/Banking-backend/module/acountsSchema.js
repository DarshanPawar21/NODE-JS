const mongoose = require("mongoose");

const AccountShcema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    accountNumber:{
        type:String,
        required:true,
        unique:true
    },
    aacountType:{
        type:String,
        enum:['saving','current'],
        default:'saving'
    },
    balance:{
        type:Number,
        default:0
    },
},
{timestamps:true});
module.exports = mongoose.model('Account',AccountShcema);