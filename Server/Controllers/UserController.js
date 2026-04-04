import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

//controller for user registration and login
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
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });

        //Return Success Response
        const token = generateToken(newUser);
        newUser.password = undefined; // Hide password in response
        res.status(201).json({ message: "User registered successfully", token, user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//controller for user login
//POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Return success response
        const token = generateToken(user);
        user.password = undefined; // Hide password in response
        res.json({ message: "User logged in successfully", token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}; 
