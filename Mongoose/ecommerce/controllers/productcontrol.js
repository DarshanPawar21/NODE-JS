import productSchema from "../modules/productSchema.js";

export const getproduct = async (req, res) => {
    try {
        const result = await productSchema.find();
        res.status(200).json({
            status: true,
            message: "Product Fetched successfuly !",
            products: result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "product add failed !",
            err: err.message
        })
    }
}
export const addproduct = async (req, res) => {
    try {
        const result = await productSchema.create(req.body)
        res.status(200).json({
            status: true,
            message: "Product Add successfuly !",
            products: result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "product add failed !",
            err: err.message
        })
    }
}
export const updateproduct = async (req, res) => {
    try {
        const result = await productSchema.findByIdAndUpdate(req.body.id, req.body )
        res.status(200).json({
            status: true,
            message: "Product update successfuly !",
            products: result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "product update failed !",
            err: err.message
        })
    }
}
export const deleteproduct = async (req, res) => {
    try {
        const result = await productSchema.findByIdAndDelete(req.params.id);
         res.status(200).json({
            status: true,
            message: "Product delete successfuly !",
            products: result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "product delete failed !",
            err: err.message
        })
    }
}