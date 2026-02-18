import { User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({
            ...data,
            [field]: value,
        })
    } // Closed handleChange properly here

    // Return must be outside the helper function
    return (
        <div className='animate-in fade-in duration-500'>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the Personal Information</p>

            <div className='flex items-center gap-2'>
                <label className="cursor-pointer">
                    {data.image ? (
                        <img
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                            alt="user-image"
                            className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'
                        />
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            <span className="text-sm font-medium">Upload User Image</span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handleChange('image', e.target.files[0])}
                    />
                </label>

                {/* Show toggle only if an image is uploaded */}
                {data.image && (
                    <div className='flex flex-col gap-1 pl-4 text-sm mt-5'>
                        <p className="text-gray-500 text-[12px] font-medium">Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer gap-3'>
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />
                            {/* Toggle Track */}
                            <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                            {/* Toggle Dot */}
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></div>
                        </label>
                    </div>
                )}
            </div>

            {/* Added: Input fields to match your Dashboard screenshot */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Full Name</label>
                    <input
                        type="text"
                        placeholder="e.g. John Doe"
                        className='p-2 border rounded-md outline-none focus:border-indigo-500'
                        value={data.full_name || ''}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Job Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Frontend Developer"
                        className='p-2 border rounded-md outline-none focus:border-indigo-500'
                        value={data.job_title || ''}
                        onChange={(e) => handleChange('job_title', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoForm