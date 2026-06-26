import Customer from "../models/costomer_model.js";

export const addcustomer = async (req, res) => {
    try {
        const result = await Customer.create(req.body);
        res.status(201).json(
            {
                status: true,
                message: "Book Add Successfuly !",
                result
            }
        )
    }
    catch (err) {
        res.status(400).json(
            {
                status: false,
                message: "Customer data Add Failed !",
                err: err.message
            }
        )
    }
};

export const getcustomer = async (req, res) => {
    try {
        const result = await Customer.find();
        res.status(201).json(
            {
                status: true,
                message: "Customer data Get Successfuly !",
                result
            }
        )
    }
    catch (err) {
        res.status(400).json(
            {
                status: false,
                message: "Customer data get Failed !",
                err: err.message
            }
        )
    }
}

export const updatecustomer = async (req, res) => {
    try {
        const result = await Customer.findByIdAndUpdate(req.body.id, req.body);
        res.status(201).json(
            {
                status: true,
                message: "Customer data update Successfuly !",
                result
            }
        )
    }
    catch (err) {
        res.status(400).json(
            {
                status: false,
                message: "Customer data update Failed !",
                err: err.message
            }
        )
    }
}

export const deletecustomer = async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.body.id);
        res.status(201).json(
            {
                status: true,
                message: "Customer data Delete Successfuly !",
                result
            }
        )
    }
    catch (err) {
        res.status(400).json(
            {
                status: false,
                message: "Customer data delete Failed !",
                err: err.message
            }
        )
    }
}