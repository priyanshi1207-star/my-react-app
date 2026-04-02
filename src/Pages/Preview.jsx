import React from 'react'
import { useParams, Link } from 'react-router-dom' // Added Link
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../Components/ResumePreview'
import Loader from '../Components/Loader'
import { ArrowLeftIcon } from 'lucide-react'

const Preview = () => {
  const { resumeId } = useParams()
  const [isloading, setIsLoading] = React.useState(true)
  const [resumeData, setResumeData] = React.useState(null)

  const loadResumeData = async () => {
    // Search for data and default to null if not found
    const foundData = dummyResumeData.find(resume => resume._id === resumeId);
    setResumeData(foundData || null);
    setIsLoading(false)
  }

  React.useEffect(() => {
    loadResumeData()
  }, [resumeId])

  return resumeData ? (
    <div className='bg-slate-100 min-h-screen'>
      {/* Fixed typo from 3x1 to 3xl */}
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview
          data={resumeData}
          template="classic"
          accentColor={resumeData.accent_color} // Fixed key mismatch
          classes='py-4 bg-white shadow-xl'
        />
      </div>
    </div>
  ) : (
    <div>
      {isloading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>
            Resume not found
          </p>
          {/* Changed <a> to <Link> and added path */}
          <Link to='/app' className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4 ' /> Go to Home Page
          </Link>
        </div>
      )}
    </div>
  )
}

export default Preview