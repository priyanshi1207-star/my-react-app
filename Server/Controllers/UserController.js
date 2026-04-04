
//controller for user registration and login
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
//POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
