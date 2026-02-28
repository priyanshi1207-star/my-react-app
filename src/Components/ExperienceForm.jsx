import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data = [], onChange }) => {

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
                    <p className='text-sm text-gray-500'>Add your job history</p>
                </div>
                <button
                    onClick={addExperience}
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 border border-blue-100' >
                    <Plus className='size-3.5' /> Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-10 border-2 border-dashed border-gray-100 rounded-xl'>
                    <Briefcase className='w-10 h-10 mx-auto mb-3 text-gray-300' />
                    <p className='text-gray-400 text-sm'>No experience added yet.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4'>
                            <div className='flex justify-between items-center border-b border-gray-50 pb-2'>
                                <span className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Role #{index + 1}</span>
                                <button onClick={() => removeExperience(index)} className='text-red-400 hover:text-red-600 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>Company</label>
                                    <input value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} type='text' className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none' placeholder='e.g. Google' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>Job Title</label>
                                    <input value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)} type='text' className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none' placeholder='e.g. Senior Developer' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>Start Date</label>
                                    <input value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)} type='month' className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none' />
                                </div>
                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>End Date</label>
                                    <input value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)} type='month' disabled={experience.is_current} className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md disabled:bg-gray-50 text-sm' />
                                </div>
                            </div>

                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input type='checkbox' checked={experience.is_current || false} onChange={(e) => updateExperience(index, "is_current", e.target.checked)} className='rounded border-gray-300 text-blue-600' />
                                <span className='text-xs text-gray-600'>I am currently working in this role</span>
                            </label>

                            <div className='space-y-1'>
                                <label className='text-xs font-semibold text-gray-500'>Description</label>
                                <textarea value={experience.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} rows={4} className='w-full text-sm px-3 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none' placeholder='Key achievements and responsibilities...' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm;