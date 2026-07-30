const userSchema = require("../module/userScema.js");
const bcrypt = require("bcrypt");

const userauth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userSchema.findOne({ email });
        if (!result) {
            return res.status(401).json({
                message: "The user email not found !"
            });
        }
        const ismatch = await bcrypt.compare(password, result.password);
        if (!ismatch) {
            return res.status(401).json({
                message: "The password is invalid !",
            });
        }
        return res.status(200).json({
            status: true,
            message: "The user signed in successfully !",
        });
    } catch (err) {
        return res.status(500).json({
            message: "User can't sign in",
            error: err.message
        });
    }
};

module.exports = { userauth };