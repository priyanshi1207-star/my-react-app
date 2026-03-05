import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data = [], onChange }) => { // Added default empty array

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>Projects</h3>
                    <p className='text-sm text-gray-500'>Add your Project Details</p>
                </div>
                <button
                    onClick={addProject}
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 border border-blue-100' >
                    <Plus className='size-3.5' /> Add Project
                </button>
            </div>

            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4'>
                        <div className='flex justify-between items-center border-b border-gray-50 pb-2'>
                            <span className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Project #{index + 1}</span>
                            <button onClick={() => removeProject(index)}
                                className='text-red-400 hover:text-red-600 transition-colors'>
                                <Trash2 className='size-4' />
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <label className='text-xs font-semibold text-gray-500'>Project Name</label>
                                <input
                                    value={project.name || ""}
                                    onChange={(e) => updateProject(index, "name", e.target.value)}
                                    type='text'
                                    className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                    placeholder='e.g. Portfolio Website'
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='text-xs font-semibold text-gray-500'>Project Type</label>
                                <input
                                    value={project.type || ""}
                                    onChange={(e) => updateProject(index, "type", e.target.value)}
                                    type='text'
                                    className='w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                                    placeholder='e.g. Web App / Research'
                                />
                            </div>
                            <div className='md:col-span-2 space-y-1'>
                                <label className='text-xs font-semibold text-gray-500'>Description</label>
                                <textarea
                                    rows={4}
                                    value={project.description || ""}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none'
                                    placeholder='Describe your contributions...'
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className='text-center py-10 border-2 border-dashed border-gray-100 rounded-xl'>
                        <p className='text-gray-400 text-sm'>No projects added yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectForm