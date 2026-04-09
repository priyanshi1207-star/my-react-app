import OpenAI from "openai";

let openai = null;

const apiKey = process.env.OPENAI_API_KEY?.replace(/^\"|\"$/g, '');
let baseURL = process.env.OPENAI_BASE_URL?.replace(/^\"|\"$/g, '');

if (baseURL && !baseURL.includes('openai.com')) {
    console.warn("OPENAI_BASE_URL is not a standard OpenAI endpoint and will be ignored. Remove or correct this setting to use OpenAI.");
    baseURL = undefined;
}

if (apiKey && apiKey.startsWith('sk-')) {
    openai = new OpenAI({
        apiKey,
        ...(baseURL ? { baseURL } : {})
    });
} else {
    console.warn("OpenAI API key is missing or invalid. Set OPENAI_API_KEY to a valid OpenAI secret key starting with sk-.");
}

export default openai;