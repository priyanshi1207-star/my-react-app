import Resume from '../models/Resume.js';

// POST: api/resumes/create
export const createResume = async (req, res) => {
    try {
        const { title, summary, skills, experience, projects, education, personal_info, template, accent_color, public: isPublic } = req.body;
        const newResume = await Resume.create({
            user: req.user,
            title: title || 'Untitled Resume',
            professional_Summary: summary || '',
            skills: skills || [],
            experience: experience || [],
            projects: projects || [],
            education: education || [],
            personal_info: personal_info || {},
            template: template || 'classic',
            accent_color: accent_color || '#3b82f6',
            public: isPublic || false
        });
        res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    } catch (error) {
        console.error('Create resume error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE: api/resumes/delete/:id
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        if (resume.user.toString() !== req.user) return res.status(401).json({ message: 'Unauthorized' });
        await resume.deleteOne();
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET: api/resumes/get/:id
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id).select('-__v');
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json({ resume });
    } catch (error) {
        console.error('Get resume error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET: api/resumes/public/:id
export const getResumeByIdPublic = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .populate('user', 'name email')
            .select('-__v');
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json({ resume });
    } catch (error) {
        console.error('Get public resume error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PUT: api/resumes/update/:id
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let updateData = {};
        if (req.body.resumeData) {
            try {
                updateData = JSON.parse(req.body.resumeData);
            } catch (parseError) {
                console.error('Resume update parse failure:', parseError.message, req.body.resumeData);
                return res.status(400).json({ message: 'Invalid resume data format' });
            }
        } else {
            updateData = req.body;
        }

        console.log('Resume update request:', { resumeId: req.params.id, updateData, hasFile: !!req.file });

        if (updateData.title !== undefined) resume.title = updateData.title;

        const summaryValue = updateData.professional_Summary ?? updateData.professional_summary ?? updateData.summary;
        if (summaryValue !== undefined) resume.professional_Summary = summaryValue;

        if (updateData.skills !== undefined) resume.skills = updateData.skills;
        if (updateData.work_experience !== undefined) resume.experience = updateData.work_experience;
        if (updateData.experience !== undefined) resume.experience = updateData.experience;
        if (updateData.projects !== undefined) resume.projects = updateData.projects;
        if (updateData.education !== undefined) resume.education = updateData.education;
        if (updateData.template !== undefined) resume.template = updateData.template;
        if (updateData.accent_color !== undefined) resume.accent_color = updateData.accent_color;
        if (updateData.public !== undefined) resume.public = updateData.public;
        if (updateData.personal_info !== undefined) {
            resume.personal_info = { ...(resume.personal_info || {}), ...updateData.personal_info };
        }
        if (req.file) {
            if (!resume.personal_info) resume.personal_info = {};
            resume.personal_info.image = req.file.path;
        }

        await resume.save();
        res.json({ message: 'Resume updated successfully', resume });
    } catch (error) {
        console.error('Update resume error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};