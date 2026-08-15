import Faculty from "../models/Faculty.js";

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ status: false, message: "Faculty id is required" });
    }
    const result = await Faculty.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ status: false, message: "Faculty not found" });
    }
    return res.status(200).json({ status: true, message: "Faculty deleted successfully!" });
  } catch (err) {
    return res.status(400).json({ status: false, message: "Faculty delete failed!", err: err.message });
  }
};

export default deleteFaculty;
