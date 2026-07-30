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
    const { email, password } = req.body;
            const result = await adminSchema.findOne({ email });
            if (!result) {
                return res.status(404).json({
                    status: false,
                    message: "Admin Not Found !"
                })
            }
            const ismatch = await bcrypt.compare(password, result.password);
            if (!ismatch) {
                return res.status(401).json({
                    status: false,
                    message: "invalid Password !"
                })
            };
    next();
};

module.exports = { checkAdminToken }