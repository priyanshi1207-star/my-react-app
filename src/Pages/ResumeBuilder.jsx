import React, { useState, useEffect } from 'react' // Fix: Added useEffect and useState
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon } from 'lucide-react'

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
          <div>

          </div>
          {/* Right - Resume Preview */}
        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder