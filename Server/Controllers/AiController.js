

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
