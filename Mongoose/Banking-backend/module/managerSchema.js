const { default: mongoose } = require("mongoose");
const MangerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:true
    }, 
    barnchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        required:true
    },
    role:{
        type:String,
        default:'Manager',
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model("Manager",MangerSchema);