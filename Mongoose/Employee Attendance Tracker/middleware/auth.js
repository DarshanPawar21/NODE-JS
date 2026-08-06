import jwt from "jsonwebtoken";

const checkFacultyAuth = (req, res, next) => {
    const token = req.cookies["teacher-token"];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "token missing !"
        })
        next();
    }
    try {
        const decoded = jwt.verify(token, "!@#$%&()");
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