import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, AwardIcon, BriefcaseIcon, ChevronLeft, ChevronRight, FileTextIcon, FolderIcon, GraduationCapIcon, HeartIcon, LanguagesIcon, SparklesIcon, UserIcon } from 'lucide-react'
import PersonalInfoForm from '../Components/PersonalInfoForm'
import ResumePreview from '../Components/ResumePreview'
import TemplateSelector from '../Components/TemplateSelector'

const ResumeBuilder = () => {
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
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

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all font-medium'>
          <ArrowLeftIcon className='size-4' />Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        {/* Main Grid Container */}
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* Left - Resume Editor */}
          <div className='relative lg:col-span-5'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 overflow-hidden relative'>
              {/* Progress Bar */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-100' />
              <div
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-in-out'
                style={{ width: `${((activeSectionIndex + 1) * 100) / sections.length}%` }}
              ></div>

              {/* Navigation Tabs */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-3 mt-4'>

                {/* Template Selector*/}
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                />

                <div className='flex items-center gap-4'>
                  {/* Current Section Indicator */}
                  <div className='flex items-center gap-2 max-sm:hidden'>
                    <activeSection.icon className='size-5 text-gray-400' />
                    <span className='font-medium text-gray-600 text-sm'>{activeSection.name}</span>
                  </div>

                  {/* Prev/Next Buttons */}
                  <div className='flex items-center border-l pl-4 border-gray-200'>
                    {activeSectionIndex !== 0 && (
                      <button
                        onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                        className='flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      >
                        <ChevronLeft className='size-4' />
                      </button>
                    )}

                    <button
                      onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
                      className={`flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                      disabled={activeSectionIndex === sections.length - 1}
                    >
                      <span className="max-sm:hidden">Next</span> <ChevronRight className='size-4' />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Form Content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal_info' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {/* Other section forms would be added here */}
              </div>
            </div>
          </div>

          {/* Right - Resume Preview (Now inside the grid) */}
          <div className='lg:col-span-7 max-lg:mt-6 sticky top-6 h-fit'>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder