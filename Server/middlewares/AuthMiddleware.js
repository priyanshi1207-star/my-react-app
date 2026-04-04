import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    // Note: If using Bearer tokens, use: req.headers.authorization?.split(" ")[1]
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // This attaches the ID to req.user for use in getUserProfile
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default protect;