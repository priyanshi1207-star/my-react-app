import { GraduationCap } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data = [], onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            CGPA: "",
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    return (

        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your Education Details</p>
                </div>
                <button
                    onClick={addEducation}
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 border border-blue-100' >
                    <Plus className='size-3.5' /> Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-10 border-2 border-dashed border-gray-100 rounded-xl'>
                    <GraduationCap className='w-10 h-10 mx-auto mb-3 text-gray-300' />
                    <p className='text-gray-400 text-sm'>No Education added yet.</p>
                    <p className='text-sm'>Click "Add Education" to get started</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg 
                        bg-white shadow-sm space-y-4'>
                            <div className='flex justify-between items-center 
                            border-b border-gray-50 pb-2'>
                                <span className='text-xs font-bold text-gray-400 
                                uppercase tracking-wider'>Education #{index + 1}</span>
                                <button onClick={() => removeEducation(index)}
                                    className='text-red-400 hover:text-red-600 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>Education</label>
                                    <input value={education.institution || ""}
                                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                        type='text' className='w-full px-3 py-2 text-sm border 
                                        border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                        placeholder='e.g. IIM' />
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>
                                        Degree</label>
                                    <input value={education.degree || ""}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                        type='text' className='w-full px-3 py-2 text-sm border
                                     border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                        placeholder='e.g. Graduate, Post-Graduate or PHD' />
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>Start Date</label>
                                    <input value={education.field || ""}
                                        onChange={(e) => updateEducation(index, "field", e.target.value)}
                                        type='text'
                                        className='w-full px-3 py-2 text-sm border border-gray-200 
                                    rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                        placeholder='field of study' />
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-xs font-semibold text-gray-500'>End Date</label>
                                    <input value={education.graduation_date || ""}
                                        onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                        type='month'
                                        className='w-full px-3 py-2 text-sm border border-gray-200 
                                    rounded-md' />
                                </div>

                            </div>

                            <input value={education.CGPA || ""}
                                onChange={(e) => updateEducation(index, "cgpa", e.target.value)}
                                type='text'
                                className='w-full px-3 py-2 text-sm border border-gray-200 
                                    rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                placeholder='cgpa (optional)' />


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

export default EducationForm