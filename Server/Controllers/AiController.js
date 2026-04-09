import openai from "../configs/Ai.js";
import Resume from "../models/Resume.js"; // Corrected path

// Enhance professional summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { summary } = req.body;
        if (!summary) {
            return res.status(400).json({ message: "Professional summary is required" });
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: 'You are an expert resume writer. Enhance the summary to be concise, impactful, and ATS friendly. Use strong action verbs.'
                },
                { role: "user", content: summary },
            ],
        });
        const enhancedSummary = response.choices[0].message.content;
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Enhance job descriptions
export const enhanceJobDescriptions = async (req, res) => {
    try {
        const { jobDescriptions } = req.body;
        if (!jobDescriptions || !Array.isArray(jobDescriptions)) {
            return res.status(400).json({ message: "Job descriptions array is required" });
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: 'You are an expert resume writer. Enhance the following job descriptions. Return the result strictly as a JSON array of strings.'
                },
                { role: "user", content: jobDescriptions.join("\n") },
            ],
            response_format: { type: "json_object" } // Ensures JSON output
        });

        const result = JSON.parse(response.choices[0].message.content);
        // Assuming AI returns { "descriptions": [...] }
        return res.status(200).json({ enhancedJobDescriptions: result.descriptions || result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Extract and Upload Resume
export const uploadResume = async (req, res) => {
    try {
        const { title, summary, skills, experience, projects, education, content } = req.body;
        const userId = req.user;

        const textSource = content || summary;
        if (!title || !textSource) {
            return res.status(400).json({ message: "Title and resume content or summary are required" });
        }

        const systemPrompt = "You are an expert AI Agent. Extract resume data into structured JSON matching the user's requested schema.";
        const userPrompt = `Extract data from the resume text below. Title: ${title}. Resume Text: ${textSource}. Skills: ${skills || ''}. Return a JSON object with keys: professional_Summary, skills, personal_info, experience, projects, education.`;

        let parsedData = null;
        if (process.env.OPENAI_API_KEY) {
            try {
                const response = await openai.chat.completions.create({
                    model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt },
                    ],
                });
                const contentText = response.choices?.[0]?.message?.content || '';
                try {
                    parsedData = JSON.parse(contentText);
                } catch (parseError) {
                    console.error('AI parse failed:', parseError.message, contentText);
                }
            } catch (aiError) {
                console.error('OpenAI error:', aiError.message, aiError);
            }
        }

        if (!parsedData) {
            parsedData = {
                professional_Summary: textSource,
                skills: [],
                personal_info: {},
                experience: [],
                projects: [],
                education: []
            };
        }

        // Save to Database
        const newResume = await Resume.create({
            user: userId, // Ensure your schema uses 'user' or 'userId' consistently
            title,
            professional_Summary: parsedData.professional_Summary || parsedData.summary || textSource,
            skills: parsedData.skills || [],
            experience: parsedData.experience || [],
            projects: parsedData.projects || [],
            education: parsedData.education || [],
            personal_info: parsedData.personal_info || parsedData.personalInfo || {}
        });

        return res.status(200).json({ message: "Resume uploaded successfully", resume: newResume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};