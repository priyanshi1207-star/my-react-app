import React from 'react'
import ClassicTemplate from './Templates/ClassicTemplate'
import ModernTemplate from './Templates/ModernTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './Templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {


    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <Modern

                    return (
                        <div className='w-full bg-gray-100'>
                            <div id='resume-preview'
                                className={'border border-gray-200 print:shadow-none print:border-none' + classes}>

                            </div>
                        </div>
                    )
        }
        export default ResumePreview