const userSchema = require("../module/userScema.js");

const getuser = async (req, res) => {
    try {
        const result = await userSchema.find();
        return res.status(200).json({
            status: true,
            message: "User data fetch successfully !",
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "User data fetch failed !",
            err: err.message
        });
    }
};

module.exports = { getuser };