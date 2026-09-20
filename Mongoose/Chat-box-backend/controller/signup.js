import User_signup from "../module/user.js";
import bcrypt from "bcrypt";


const sign_up = async (req, res) => {
    try {
        const { name, email, phone, Password } = req.body;

        const hash = await bcrypt.hash(Password, 10);

        if (!name || !email || !phone || !Password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required !",
            });
        }

        const exits_user = await User_signup.findOne({email:email});
        
        if(exits_user){
            return res.status(400).json({
                status:false,
                message:"User is already exits !"
            })
        }

        const user = await User_signup.create({
            name: name,
            email: email,
            phone: phone,
            Password: hash
        });
    
        return res.status(200).json({
            status: true,
            message: "User Signup Successfully !",
            data: user
        })
    
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Error while signup !",
            data: err
        })
    }
};

export { sign_up };