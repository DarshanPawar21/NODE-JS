import jwt from "jsonwebtoken";

export const checkteacherAuth = (req, res, next) => {
    const token = req.cookies["teacher-token"];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized access !"
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