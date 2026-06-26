// import express from "express"
export const checktime = (req, res, next) => {
    const date = new Date();
    if (date.getHours() >= 15) {
        next();
    }
    else {
    res.json({
        message: "Webside open after 5pm !"
    })
}
}