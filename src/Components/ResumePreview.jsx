import React from 'react'
import ClassicTemplate from './Templates/ClassicTemplate'
import ModernTemplate from './Templates/ModernTemplate'
import MinimalImageTemplate from './Templates/MinimalImageTemplate'
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
        /* Added print:p-0 and print:bg-white to remove the gray background and padding in PDF */
        <div className='w-full bg-gray-100 p-4 md:p-10 flex justify-center print:p-0 print:bg-white'>
            <div
                id='resume-preview'
                className={`bg-white shadow-2xl w-full max-w-[800px] print:shadow-none print:border-none print:max-w-none ${classes}`}
            >
                {renderTemplate()}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    /* 1. Reset Global Layout */
                    html, body {
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* 2. Hide everything except the resume */
                    body > *:not(#root), 
                    #root > *:not(.min-h-screen),
                    .min-h-screen > *:not(.max-w-7xl),
                    .max-w-7xl > *:not(.px-4),
                    .grid > *:not(.lg:col-span-7),
                    .lg:col-span-7 > *:not(#resume-preview-root) {
                        display: none !important;
                    }

                    /* 3. Force Resume to top left and prevent extra page */
                    #resume-preview {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: 100vh;
                    }

                    /* 4. Strictly set Page size */
                    @page {
                        size: auto;
                        margin: 0mm;
                    }

                    /* Remove link URLs that browsers sometimes add automatically */
                    a[href]:after {
                        content: none !important;
                    }
                }
            `}} />
        </div>
    )
}

export default ResumePreview