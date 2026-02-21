import { Layout } from 'lucide-react'
import React, { useState } from 'react'
import { preview } from 'vite'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const templates = [
        {
            id: 'classic',
            name: 'Classic',
            preview: "A classic, traditional resume format with clear sections and professional typography."
        },
        {
            id: 'modern',
            name: 'Modern',
            preview: "Sleek design with strategic use of color and mordern font choices"
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
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br
            from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} /><span className="max-sm:hidden">Select Template</span>
            </button>
        </div>
    )
}

export default TemplateSelector