import Resume from '../models/Resume.js';

// PUT: api/resumes/update/:id
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        // Security check: Ensure user owns the resume
        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let updateData = {};

        // 1. Parse the stringified JSON from FormData
        if (req.body.resumeData) {
            try {
                updateData = JSON.parse(req.body.resumeData);
            } catch (parseError) {
                return res.status(400).json({ message: "Invalid resume data format" });
            }
        } else {
            // Fallback for direct JSON requests
            updateData = req.body;
        }

        // 2. Map fields to Schema (Fixing typos)
        if (updateData.title !== undefined) resume.title = updateData.title;

        // Corrected typo from professional_Summary to professional_summary
        if (updateData.professional_summary !== undefined) {
            resume.professional_summary = updateData.professional_summary;
        } else if (updateData.summary !== undefined) {
            resume.professional_summary = updateData.summary;
        }

        if (updateData.skills !== undefined) resume.skills = updateData.skills;
        if (updateData.work_experience !== undefined) resume.experience = updateData.work_experience;
        if (updateData.projects !== undefined) resume.projects = updateData.projects;
        if (updateData.education !== undefined) resume.education = updateData.education;
        if (updateData.template !== undefined) resume.template = updateData.template;
        if (updateData.accent_color !== undefined) resume.accent_color = updateData.accent_color;
        if (updateData.public !== undefined) resume.public = updateData.public;

        // 3. Safe Merge for Personal Info
        if (updateData.personal_info !== undefined) {
            resume.personal_info = { ...resume.personal_info, ...updateData.personal_info };
        }

        // 4. Handle uploaded file from Multer
        if (req.file) {
            if (!resume.personal_info) resume.personal_info = {};
            // Ensure your schema has personal_info.image
            resume.personal_info.image = req.file.path;
        }

        await resume.save();
        res.json({ message: "Resume updated successfully", resume });
    } catch (error) {
        console.error("Update resume error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};