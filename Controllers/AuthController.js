const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const user = await UserModel.findOne({ email });
        const user2 = await UserModel.findOne({ phone });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        else if(user2){
            return res.status(409)
            .json({ message: 'phone number is already used', success: false });  
        }
        const userModel = new UserModel({ name, email, phone, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed as a route parameter
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({
            message: 'User data fetched successfully',
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
                // Add other fields as needed
            }
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { password: 0 }); // Exclude password from results
        res.status(200).json({
            message: 'Users data fetched successfully',
            success: true,
            users
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


const udpateUserStatus = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const userData = req.body; // Assuming userId is passed as a route parameter
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const result = await UserModel.updateOne({_id:userId}, userData)

        res.status(200).json({
            message: 'User is active now',
            success: true,
            result
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};



module.exports = {
    signup,
    login,
    getUserById,
    getAllUsers ,
    udpateUserStatus
};
