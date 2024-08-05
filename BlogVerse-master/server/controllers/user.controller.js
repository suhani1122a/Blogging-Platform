const validateUser = require("../middleware/userValidator.middleware");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Register logic
// POST /blogverse/user/register
const register = async (req, res) => {
    try{
        await validateUser(req, res, async () => {
            const { username, email, password, phoneNumber} = req.body;

        const existingUser = await User.findOne({username: username});
        if (existingUser) {
            return res.status(400).json({message: "Username already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phoneNumber
        });
        await user.save();

        res.status(201).json({message: "User registered successfully"});
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Error registering the user"});
    }
}

// Login Logic
// POST /blogverse/user/login
const login = async (req, res) => {
    try{
            const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid username or password"});
        }

        res.status(200).json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Error logging in"});
    }
}

module.exports = {register, login};