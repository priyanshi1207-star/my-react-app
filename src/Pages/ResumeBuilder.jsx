import React, { useState, useEffect } from 'react' // Fix: Added useEffect and useState
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, AwardIcon, BriefcaseIcon, FileText, FileTextIcon, FolderIcon, GraduationCapIcon, HeartIcon, LanguagesIcon, SparklesIcon, User, UserIcon } from 'lucide-react'

const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({ // Use the imported useState
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    work_experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: 'personal_info', name: 'Personal Info', icon: UserIcon },
    { id: 'professional_summary', name: 'Professional Summary', icon: FileTextIcon },
    { id: 'work_experience', name: 'Work Experience', icon: BriefcaseIcon },
    { id: 'education', name: 'Education', icon: GraduationCapIcon },
    { id: 'skills', name: 'Skills', icon: SparklesIcon },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'certifications', name: 'Certifications', icon: AwardIcon },
    { id: 'languages', name: 'Languages', icon: LanguagesIcon },
    { id: 'interests', name: 'Interests', icon: HeartIcon },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [resumeId]) // Added resumeId to dependency array for best practice

  return (
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500
        hover:text-slate-700 transition-all font-medium'>
          <ArrowLeftIcon className='size-4' />Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left - Resume Editor */}
          <div className='lg:col-span-5'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative overflow-hidden'>

              {/* Progress Bar Background */}
              <div className='absolute top-0 left-0 right-0 h-1 bg-gray-100'></div>

              {/* Animated Progress Bar Fill */}
              <div
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-in-out'
                style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}
              ></div>
              {/* Section Tabs */}
              <div className='flex justify-between items-center'>

              </div>
            </div>
          </div>
        </div>
        {/* Right - Resume Preview */}
      </div>
    </div>

  )
}

export default ResumeBuilder