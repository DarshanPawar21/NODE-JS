import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const teacher_signin = async (req, res) => {
  const { email, password } = req.body;
  const result = await Faculty.findOne({ email });
  if (!result) {
    return res.status(400).json({ message: "Invalid email !" });
  }
  const ismatch = await bcrypt.compare(password, result.password);
  if (!ismatch) {
    return res.status(401).json({ message: "invalid password !" });
  }
  const token = jwt.sign({ id: result._id, email: result.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("employee-token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1 });
  return res.status(200).json({ status: true, message: "Signin successful", token });
};

export default teacher_signin;
