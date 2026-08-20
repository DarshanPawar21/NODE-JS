const userScema = require("../module/brachShema");

const pagination_userdata = async (req, res) => {
    try {
        const { page = 1 } = req.body;
        const limit = 10;

        const allData = await userScema.find();
        const totalCount = allData.length;

        const start = (page - 1) * limit;
        const end = start + limit;

        const result = allData.slice(start, end);

        return res.status(200).json({
            status: true,
            message: "page data is found !",
            totalCount,
            result
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Page Data fetch failed !",
            err: err.message
        });
    }
};

module.exports = { pagination_userdata };