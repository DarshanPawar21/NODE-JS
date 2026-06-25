import Customer from "../models/costomer_model.js";

export const addcustomer = async (req, res) => {
    try {
        const result = await Customer.create(req.body);
        res.status(201).json(
            {
                status: true,
                message: "Book Add Successfuly !"
            }
        )
    }
    catch (err) {
        res.status(400).json(
            {
                status: false,
                message: "Book Add Failed !",
                err: err.message
            }
        )
    }
}