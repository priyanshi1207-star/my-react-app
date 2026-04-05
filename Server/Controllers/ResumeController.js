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
//GET: api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Get resume by ID public
//GET: api/resumes/public
export const getResumeByIdPublic = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id).populate('user', 'name email');
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//controller for updating a resume
//PUT: api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        const image = req.file;
        let resumeDataCopy = JSON.parse(resume);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { title, summary, skills, experience, projects, education } = req.body;
        resume.title = title || resume.title;
        resume.summary = summary || resume.summary;
        resume.skills = skills || resume.skills;
        resume.experience = experience || resume.experience;
        resume.projects = projects || resume.projects;
        resume.education = education || resume.education;
        await resume.save();
        res.json({ message: "Resume updated successfully", resume });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};