const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "!@#$%^&*()";

// const checkAdminLogin = (req, res, next) => {
//     const token = req.cookies.adminToken;

//     if (!token) {
//         return res.status(401).json({
//             status: false,
//             message: "Not logged in"
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.admin = decoded;
//         next();
//     } catch (err) {
//         res.clearCookie("adminToken", {
//             httpOnly: true,
//             sameSite: "lax"
//         });
//         return res.status(401).json({
//             status: false,
//             message: "Invalid or expired token"
//         });
//     }
// };

const checkAdminToken = (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Not logged in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
    } catch (err) {
        res.clearCookie("adminToken", {
            httpOnly: true,
            sameSite: "lax"
        });
    }

    next();
};

module.exports = { checkAdminToken }