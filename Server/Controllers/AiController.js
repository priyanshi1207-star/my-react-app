

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
                    content: JSON.stringify(jobDescriptions),
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