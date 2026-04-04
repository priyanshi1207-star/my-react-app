import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        const projectName = 'my-react-app';
        if (!conn) {
            throw new Error("MONGODB_URI is not defined. Please set MONGODB_URI in your .env file.");
        }
        if (conn.endsWith('/')) {
            console.warn(`Warning: MONGODB_URI should not end with a '/'. Please check your MONGODB_URI.`);
            conn = conn.slice(0, -1); // Remove trailing slash if present
        }
        await mongoose.connect(`${conn}/${projectName}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB; 