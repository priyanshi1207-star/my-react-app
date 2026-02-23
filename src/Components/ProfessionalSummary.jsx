import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
    return (
        <div className='space-y-4 animate-in fade-in duration-500'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>Professional Summary</h3>
                    <p className='text-sm text-gray-500'>Add summary for your resume here</p>
                </div>
                <button
                    type="button"
                    className='flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-purple-50 
                    text-purple-600 rounded-md hover:bg-purple-100 transition-colors border border-purple-100'
                >
                    <Sparkles className='size-3.5' />
                    AI Enhance
                </button>
            </div>

            <div className='mt-4'>
                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={8}
                    className='w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 outline-none transition-all resize-none text-gray-700 leading-relaxed'
                    placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
                />
                <p className='text-[11px] text-gray-400 mt-3 text-center px-4'>
                    <span className='font-medium'>Tip:</span> Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
                </p>
            </div>
        </div>
    )
}

export default ProfessionalSummary