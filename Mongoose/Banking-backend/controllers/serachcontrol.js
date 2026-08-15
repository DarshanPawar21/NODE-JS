const BranchSchema = require("../module/brachShema");

const SearchBranch = async (req, res) => {
    try {
        const { search } = req.body;
        const arr = await BranchSchema.find();
        const result = arr.filter(
            (a) => a.branchName.toLowerCase().includes(search.toLowerCase()) ||
                a.branchCity.toLowerCase().includes(search.toLowerCase())
        );
        if (result.length == 0) {
            return res.status(404).json({
                status: false,
                message: "Data not found !",
                result
            })
        }
        return res.status(201).json({
            status: true,
            message: "Data Serach successfuly !",
            result
        })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Data Serach Failed !",
            err: err.message
        })
    }
}
module.exports = { SearchBranch }