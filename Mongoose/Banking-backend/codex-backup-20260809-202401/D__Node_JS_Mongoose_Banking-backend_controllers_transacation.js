const transactionSchema = require("../module/trancationSchema.js");
const accountSchema = require("../module/acountsSchema.js");

const transactiondetails = async (req, res) => {
    try {
        const { accountNumber, tranamount, transactionType } = req.body;
        const account = await accountSchema.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account or not found !"
            });
        }

        if (transactionType.toLowerCase() === "credit") {
            account.balance = account.balance + tranamount;
        } else if (transactionType.toLowerCase() === "debit") {
            if (account.balance < tranamount) {
                return res.status(400).json({
                    status: false,
                    message: "Insufficient balance !"
                });
            }
            account.balance = account.balance - tranamount;
        }

        const transactionDate = new Date(Date.now());
        const transaction = await transactionSchema.create({
            user_id: account.userId,
            accountNumber: account.accountNumber,
            balance: account.balance,
            transactionType,
            transactionDate,
            tranamount
        });

        return res.status(201).json({
            status: true,
            message: "Transaction successfully !",
            transaction
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Transaction failed !",
            err: err.message
        });
    }
};

module.exports = { transactiondetails };