import jwt from "jsonwebtoken";

const checkFacultyAuth = (req, res, next) => {
    const token = req.cookies["employee-token"];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "token missing !"
        })
        next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.teacher = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Invalid token !"
        })
    }
}

export default checkFacultyAuth;