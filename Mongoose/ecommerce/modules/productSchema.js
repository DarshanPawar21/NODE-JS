import mongoose, { Types } from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        price: { type: Number, require: true },
        description: { type: String },
        discount: { type: Number }
    },
    { timestamps: true }
);

export default mongoose.model("product",productSchema);