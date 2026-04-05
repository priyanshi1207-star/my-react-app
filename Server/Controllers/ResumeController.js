//Controller for Creating New Resume
//POST: api/resumes
import Resume from '../models/Resume.js';
import User from '../models/User.js';


export const createResume = async (req, res) => {
    try {
        const { title, summary, skills, experience, projects, education } = req.body;
        const newResume = await Resume.create({
            user: req.user, // Attach the user ID from the auth middleware
            title,
            summary,
            skills,
            experience, // Expecting an array of experience objects
            projects,   // Expecting an array of project objects
            education   // Expecting an array of education objects
        });
        res.status(201).json({ message: "Resume created successfully", resume: newResume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Controller for Getting User Resumes
//GET: api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('Resume');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user.Resume);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//controller for deleting a resume
//DELETE: api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await resume.deleteOne();
        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Get a specific resume by ID
//GET: api/resumes/:id
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};