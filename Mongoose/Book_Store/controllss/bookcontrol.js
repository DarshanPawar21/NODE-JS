import Book from "../models/booksModel.js";
export const addbook = async (req,res) => {
    try {
        const book = await Book.create(
            {
                title: "Rich dad poor dad",
                author: "darshan",
            }
        );
        res.status(201).json({
            status :true,
            message:"Book insert successfuly !",
        });
    }catch(err){
        res.status(400).json({
            status:false,
            message:"Book insert failed !",
            err:err.message,
        });
    }
};
addbook();