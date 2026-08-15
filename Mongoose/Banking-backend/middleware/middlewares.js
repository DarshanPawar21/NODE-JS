const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const checkAdminToken = (req, res, next) => {
    const token = req.cookies?.admintoken || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Not logged in",
        });
    }

    try {
        const decoded = jwt.verify(token,"!@#$%^&*()");
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Token invalid or expired. Please login again.",
            error: err.message
        });
    }
};

module.exports = { checkAdminToken }