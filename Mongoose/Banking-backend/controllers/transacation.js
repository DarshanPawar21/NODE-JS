import transactionSchema from "../module/trancationSchema.js";
import accountSchema from "../module/accountSchema.js";
import userSchema from "../module/userScema.js";

const transactiondetails = async (res,res)=>{
    try{
        const {accountNumber,tranamount,transactionType} = req.body;
        const account = await accountSchema.findOne({ accountNumber });
        if(!account){
            return res.status(404).json({
                status:false,
                message:"Account or not faound !"
            })
        };
        const transactionDate = new Date(Date.now());
        const transaction = await transactionSchema.create({
            user_id:account.userId,
            accountNumber:account.accountNumber,
            balance:account.balance,
            transactionType,
            transactionDate,
            tranamount
        })
        return res.status(201).json({
            status:true,
            message:"Transaction successfully !",
            transaction
        })
    }catch(err){
        return res.status(400).json({
            status:false,
            message:"Transaction failed !",
            err:err.message
        })
    }
}