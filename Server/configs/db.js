import mongoose from 'mongoose';

const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/resume-builder';

const connectWithLocalFallback = async () => {
    try {
        const conn = await mongoose.connect(LOCAL_MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host} (local fallback)`);
    } catch (fallbackError) {
        console.error(`❌ Local MongoDB fallback failed: ${fallbackError.message}`);
        console.error('Install and start MongoDB locally, or fix your Atlas network access.');
        process.exit(1);
    }
};

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.warn('WARNING: MONGODB_URI is not defined in your .env file. Trying local MongoDB fallback...');
        return connectWithLocalFallback();
    }

    try {
        console.log('Attempting to connect to MongoDB Atlas...');

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`);
        console.warn('HINT: Atlas is not reachable. Trying local MongoDB fallback...');
        return connectWithLocalFallback();
    }
};

export default connectDB;