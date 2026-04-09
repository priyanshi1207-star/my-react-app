import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Atlas connection failed: ${error.message}`);
        if (process.env.LOCAL_MONGODB_URI) {
            console.log("Attempting local fallback...");
            try {
                const localConn = await mongoose.connect(process.env.LOCAL_MONGODB_URI);
                console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
            } catch (fallbackError) {
                console.error(`Local fallback failed: ${fallbackError.message}`);
                throw fallbackError;
            }
        } else {
            throw error;
        }
    }
};

export default connectDB;