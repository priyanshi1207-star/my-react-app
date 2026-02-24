import { Plus } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data, onChange }) => {
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experience</p>
                </div>
                <button
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-purple-50 
                    text-purple-600 rounded-md hover:bg-purple-100 transition-colors border border-purple-100'
                >
                    <Plus className='size-3.5' />
                    Add Experience
                </button>
            </div>
        </div>
    )
}

export default ExperienceForm