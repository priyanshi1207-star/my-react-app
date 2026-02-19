import React from 'react'
import ClassicTemplate from './Templates/ClassicTemplate'
import ModernTemplate from './Templates/ModernTemplate'
import MinimalImageTemplate from './Templates/MinimalImageTemplate' // Fixed path casing
import MinimalTemplate from './Templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }

    return (
        <div className='w-full bg-gray-100 p-4 md:p-10 flex justify-center'>
            <div
                id='resume-preview'
                className={`bg-white shadow-2xl w-full max-w-[800px] print:shadow-none print:border-none ${classes}`}
            >
                {renderTemplate()}
            </div>

            {/* Injected Styles for Printing and PDF generation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @page {
                    size: letter;
                    margin: 0;
                }
                @media print {
                    html, body {
                        width: 8.5in;
                        height: 11in;
                        overflow: hidden;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #resume-preview, #resume-preview * {
                        visibility: visible;
                    }
                    #resume-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: auto;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                        border: none !important;
                    }
                }
            `}} />
        </div>
    )
}

export default ResumePreview