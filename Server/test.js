
import 'dotenv/config';
import mongoose from 'mongoose';

const atlasUri = process.env.MONGODB_URI;
const localUri = process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/resume-builder';
const useLocal = process.env.USE_LOCAL_DB === 'true';
const uri = useLocal ? localUri : atlasUri;

const looksLikeSingleAtlasNodeUri =
    typeof uri === 'string' &&
    uri.startsWith('mongodb://') &&
    uri.includes('.mongodb.net') &&
    uri.includes('-shard-');

const clientOptions = {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
    family: 4,
};

const printActionableHint = (error) => {
    const message = String(error?.message || '').toLowerCase();
    let hintPrinted = false;

    if (message.includes('whitelist')) {
        console.error('HINT: Add your current public IP in Atlas -> Network Access and allow it.');
        hintPrinted = true;
    }

    if (message.includes('authentication failed')) {
        console.error('HINT: Atlas username/password may be invalid, or password needs URL encoding.');
        hintPrinted = true;
    }

    if (message.includes('enotfound') || message.includes('querysrv')) {
        console.error('HINT: Hostname lookup failed. Verify the Atlas cluster URI copied from Atlas Connect dialog.');
        hintPrinted = true;
    }

    if (looksLikeSingleAtlasNodeUri) {
        console.error('HINT: MONGODB_URI appears to target a single Atlas shard host.');
        console.error('Use the full Atlas cluster URI (mongodb+srv://...) from Atlas -> Connect -> Drivers.');
        hintPrinted = true;
    }

    if (!hintPrinted) {
        console.error('HINT: Verify Atlas network access, credentials, and the cluster URI from Atlas -> Connect -> Drivers.');
    }
};

async function run() {
    if (!uri) {
        console.error('Missing MONGODB_URI. Add it to Server/.env or set USE_LOCAL_DB=true.');
        process.exit(1);
    }

    try {
        const target = useLocal ? 'local MongoDB' : 'MongoDB Atlas';
        console.log(`Attempting to connect to ${target}...`);
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Ping succeeded. MongoDB connection is healthy.');
    } catch (error) {
        console.error(error);
        printActionableHint(error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
}

run();
