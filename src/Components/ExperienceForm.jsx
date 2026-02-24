import { Briefcase, Plus } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data, onChange }) => {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }


    const updateExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experience</p>
                </div>
                <button
                    onClick={addExperience}
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-purple-50 
                    text-purple-600 rounded-md hover:bg-purple-100 transition-colors border border-purple-100' >
                    <Plus className='size-3.5' />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3
                    text-gray-300'/>
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border
                        border-gray-200 rounded-lg space-y-3'>

                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default ExperienceForm