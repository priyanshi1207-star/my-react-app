import Resume from '../models/Resume.js';

// POST: api/resumes/create
export const createResume = async (req, res) => {
    try {
        const { title, summary, skills, experience, projects, education } = req.body;
        const newResume = await Resume.create({
            user: req.user, // Injected by AuthMiddleware
            title,
            summary,
            skills,
            experience,
            projects,
            education
        });
        res.status(201).json({ message: "Resume created successfully", resume: newResume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE: api/resumes/delete/:id
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        // Security check: Ensure user owns the resume
        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await resume.deleteOne();
        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET: api/resumes/get/:id
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id).select('-__v -createdAt -updatedAt');
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        res.status(200).json({ resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET: api/resumes/public/:id
export const getResumeByIdPublic = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .populate('user', 'name email')
            .select('-__v -createdAt -updatedAt');

        if (!resume) return res.status(404).json({ message: "Resume not found" });
        res.status(200).json({ resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT: api/resumes/update/:id
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        const { title, summary, skills, experience, projects, education } = req.body;

        resume.title = title || resume.title;
        resume.summary = summary || resume.summary;
        resume.skills = skills || resume.skills;
        resume.experience = experience || resume.experience;
        resume.projects = projects || resume.projects;
        resume.education = education || resume.education;

        // If you have image logic, handle req.file here

        await resume.save();
        res.json({ message: "Resume updated successfully", resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};