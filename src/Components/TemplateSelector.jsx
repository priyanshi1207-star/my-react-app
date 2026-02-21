import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'
// REMOVED: import { preview } from 'vite' (This was causing an error)

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false) // Fixed: use imported useState

    const templates = [
        {
            id: 'classic',
            name: 'Classic',
            preview: "A classic, traditional resume format with clear sections and professional typography."
        },
        {
            id: 'modern',
            name: 'Modern',
            preview: "Sleek design with strategic use of color and modern font choices"
        },
        {
            id: 'minimal',
            name: 'Minimal',
            preview: "Ultra-clean design that puts your content front and center"
        },
        {
            id: 'minimal-image',
            name: 'Minimal Image',
            preview: "Minimal design with a single image and clean typography for a modern look"
        },
    ]

    return (
        <div className='relative'>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'
            >
                <Layout size={14} />
                <span className="max-sm:hidden">Select Template</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop to close when clicking outside */}
                    <div className='fixed inset-0 z-10' onClick={() => setIsOpen(false)}></div>

                    <div className='absolute top-full left-0 w-64 p-3 mt-2 space-y-3 z-20 bg-white rounded-md border border-gray-200 shadow-xl'>
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false) }}
                                className={`relative p-3 rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'
                                    }`}
                            >
                                {selectedTemplate === template.id && (
                                    <div className='absolute top-2 right-2'>
                                        <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                            <Check className='w-3 h-3 text-white' />
                                        </div>
                                    </div>
                                )}
                                <div className='space-y-1'>
                                    <h4 className='font-medium text-gray-800 text-sm'>{template.name}</h4>
                                    <p className='text-[10px] text-gray-500 italic leading-tight'>{template.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector