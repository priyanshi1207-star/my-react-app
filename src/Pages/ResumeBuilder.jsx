import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import {
  ArrowLeftIcon, BriefcaseIcon, ChevronLeft, ChevronRight,
  Download, EyeIcon, EyeOffIcon, FileTextIcon, FolderIcon,
  GraduationCapIcon, Share2Icon, SparklesIcon, UserIcon
} from 'lucide-react'
import PersonalInfoForm from '../Components/PersonalInfoForm'
import ResumePreview from '../Components/ResumePreview'
import TemplateSelector from '../Components/TemplateSelector'
import ColorPicker from '../Components/ColorPicker'
import ProfessionalSummary from '../Components/ProfessionalSummary'
import ExperienceForm from '../Components/ExperienceForm'
import EducationForm from '../Components/EducationForm'
import ProjectForm from '../Components/ProjectForm'
import SkillsForm from '../Components/SkillsForm'

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
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal_info', name: 'Personal Info', icon: UserIcon },
    { id: 'professional_summary', name: 'Professional Summary', icon: FileTextIcon },
    { id: 'work_experience', name: 'Work Experience', icon: BriefcaseIcon },
    { id: 'education', name: 'Education', icon: GraduationCapIcon },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: SparklesIcon },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(() => { loadExistingResume() }, [resumeId])

  const changeResumeVisibility = async () => {
    setResumeData({ ...resumeData, public: !resumeData.public })
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: 'MyResume', })
    } else {
      alert('Share not supported on this browser')
    }
  }

  const downloadResume = () => {
    window.print();
  }

  return (
    /* Added print:p-0 to root to ensure no margins in PDF */
    <div className='min-h-screen bg-slate-50 print:bg-white print:p-0'>
      {/* Navigation Header - Hidden on Print */}
      <div className='max-w-7xl mx-auto px-4 py-6 print:hidden'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 font-medium'>
          <ArrowLeftIcon className='size-4' />Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8 print:max-w-none print:p-0'>
        <div className='grid lg:grid-cols-12 gap-8 print:block'>

          {/* Left Side: Form Editor - Completely Hidden on Print */}
          <div className='relative lg:col-span-5 print:hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 overflow-hidden relative'>
              <div className='absolute top-0 left-0 h-1 bg-green-500 transition-all duration-500'
                style={{ width: `${((activeSectionIndex + 1) * 100) / sections.length}%` }}>
              </div>

              <div className='flex justify-between items-center mb-8 border-b border-gray-100 py-5 mt-2'>
                <div className='flex items-center gap-4'>
                  <TemplateSelector selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center gap-2'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                      className='flex items-center gap-1 p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100'>
                      <ChevronLeft className='size-5' />
                      <span>Prev</span>
                    </button>
                  )}

                  <button onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
                    className={`flex items-center gap-1 p-2 px-3 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 ${activeSectionIndex === sections.length - 1 && 'opacity-30'}`}
                    disabled={activeSectionIndex === sections.length - 1}>
                    <span>Next</span>
                    <ChevronRight className='size-5' />
                  </button>
                </div>
              </div>

              <div className='space-y-6'>
                {activeSection.id === 'personal_info' && (
                  <PersonalInfoForm data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'professional_summary' && (
                  <ProfessionalSummary data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} />
                )}
                {activeSection.id === 'work_experience' && (
                  <ExperienceForm data={resumeData.work_experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, work_experience: data }))} />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.projects || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))} />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}
              </div>
              <button className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Side: Resume Preview */}
          {/* Changed print:static and print:mt-0 to remove the top whitespace gap */}
          <div className='lg:col-span-7 max-lg:mt-6 sticky top-6 h-fit print:static print:mt-0 print:w-full'>

            {/* Action Buttons - Hidden on Print */}
            <div className='relative w-full print:hidden mb-4'>
              <div className='flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <Download className='size-4' /> Download
                </button>
              </div>
            </div>

            {/* The Resume Preview Wrapper */}
            <div id="resume-preview-root" className='print:m-0 print:p-0'>
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder