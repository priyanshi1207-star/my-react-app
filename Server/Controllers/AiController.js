import openai from "../configs/Ai.js";
import Resume from "../Models/ResumeModel.js";

//controller for enhancing a resume's professional summary using AI
//POST: api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { summary } = req.body;
        if (!summary) {
            return res.status(400).json({ message: "Professional summary is required" });
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: 'You are an expert resume writer. Your task is to enhance the professional summary of a resume. The summary should be concise, impactful, and highlight the candidate\'s key skills and achievements.Focus on using strong action verbs, quantifying achievements where possible, and tailoring the summary to be relevant to a wide range of industries. Avoid generic statements and ensure the summary stands out to potential employers. Make it ATS friendly.',
                },
                {
                    role: "user",
                    content: summary,
                },
            ],
        });
        const enhancedSummary = response.choices[0].message.content;
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//controller for enhancing a resume's job descriptions using AI
//POST: api/ai/enhance-job-desc
export const enhanceJobDescriptions = async (req, res) => {
    try {
        const { jobDescriptions } = req.body;
        if (!jobDescriptions || !Array.isArray(jobDescriptions) || jobDescriptions.length === 0) {
            return res.status(400).json({ message: "Job descriptions are required and should be an array" });
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: 'You are an expert resume writer.Your task is to enhance the job descriptions in a resume. Each job description should be concise, impactful, and highlight the candidate\'s key responsibilities and achievements for that role. Focus on using strong action verbs, quantifying achievements where possible, and tailoring the descriptions to be relevant to a wide range of industries. Avoid generic statements and ensure each job description stands out to potential employers. Make them ATS friendly.',
                },
                {
                    role: "user",
                    content: jobDescriptions.join("\n"), // Join the array of job descriptions into a single string for the AI to process
                },
            ],
        });
        const enhancedJobDescriptions = JSON.parse(response.choices[0].message.content);
        return res.status(200).json({ enhancedJobDescriptions });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//controller for uploading a resume to the database
//POST: api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {

        const { title, summary, skills, experience, projects, education } = req.body;
        const userId = req.user; // Assuming user ID is available in the request (after authentication)
        if (!title || !summary || !skills || !experience || !projects || !education) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const systemPrompt = "You are an expert AI Agent to extract data from a Resume."
        const userPrompt = `Extract the following information from the resume: Title: ${title}, Summary: ${summary}, Skills: ${skills}, Experience: ${experience}, Projects: ${projects}, Education: ${education}
        
        The response should be in the following JSON format:
{
    professional_Summary: {
        type: String,
        default: ''
    },
    skills: [{
        type: String,
        default: ''
    }],
    personal_info: {
        image: {
            type: String,
            default: ''
        },
        full_name: {
            type: String,
            default: ''
        },
        profession: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        }
    },
    experience: [{
        company: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        },
        start_date: {
            type: String,
            default: ''
        },
        end_date: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        is_current: {
            type: Boolean,
            default: false
        }
    }],
    projects: [{
        name: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }],
    education: [{
        institution: {
            type: String,
            default: ''
        },
        degree: {
            type: String,
            default: ''
        },
        field_of_study: {
            type: String,
            default: ''
        },
        graduation_date: {
            type: String,
            default: ''
        },
        gpa: {
            type: String,
            default: ''
        }
    }]
}`;



        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {
                type: "json_object",
                json_object: {
                    title: "string",
                    summary: "string",
                    skills: ["string"],
                    experience: ["string"],
                    projects: ["string"],
                    education: ["string"]
                }
            }
        });

        const extractedData = JSON.parse(response.choices[0].message.content);
        const parsedData = JSON.parse(extractedData);
        // Save the extracted data to the database
        const newResume = await Resume.create({ userId, ...parsedData });
        return res.status(200).json({ message: "Resume uploaded successfully", resume: newResume });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};