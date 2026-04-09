import OpenAI from "openai";

let openai = null;

if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
    });
} else {
    console.warn("OpenAI API key not found. AI features will be disabled.");
}

export default openai;