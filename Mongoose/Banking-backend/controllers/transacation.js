const transactionSchema = require("../module/trancationSchema.js");
const accountSchema = require("../module/acountsSchema.js");

const transactiondetails = async (req, res) => {
    try {
        const { accountNumber, tranamount, transactionType, IFSCCode } = req.body;

        if (!accountNumber || !tranamount || !transactionType) {
            return res.status(400).json({
                status: false,
                message: "Account number, amount and transaction type are required!"
            });
        }

        const amount = Number(tranamount);
        if (amount <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid transaction amount!"
            });
        }

        const account = await accountSchema.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account not found!"
            });
        }

        if (IFSCCode && account.IFSCCode !== IFSCCode) {
            return res.status(403).json({
                status: false,
                message: "This account does not belong to your branch!"
            });
        }

        let currentBalance = Number(account.balance) || 0;
        const type = transactionType.toLowerCase();

        if (type === "credit") {
            currentBalance = currentBalance + amount;
        } else if (type === "debit") {
            if (currentBalance < amount) {
                return res.status(400).json({
                    status: false,
                    message: "Insufficient balance!"
                });
            }
            currentBalance = currentBalance - amount;
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid transaction type!"
            });
        }

        account.balance = currentBalance;
        await account.save();

        const transactionDate = new Date();
        const transaction = await transactionSchema.create({
            user_id: account.userId,
            IFSCCode: account.IFSCCode,
            accountType: account.accountType,
            accountNumber: account.accountNumber,
            balance: currentBalance, // New updated calculated balance
            transactionType: type,
            transactionDate,
            tranamount: amount
        });

        return res.status(201).json({
            status: true,
            message: "Transaction successful!",
            transaction
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Transaction failed!",
            err: err.message
        });
    }
};

module.exports = { transactiondetails };
