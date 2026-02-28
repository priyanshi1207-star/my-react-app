import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: 'full_name', label: 'Full Name', type: 'text', icon: User, required: true },
        { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
        { key: 'phone', label: 'Phone Number', type: 'tel', icon: Phone },
        { key: 'location', label: 'Location', type: 'text', icon: MapPin },
        { key: 'professional_title', label: 'Professional Title', type: 'text', icon: BriefcaseBusiness }, //
        { key: 'linkedin', label: 'LinkedIn Profile', type: 'url', icon: Linkedin },
        { key: 'website', label: 'Personal Website', type: 'url', icon: Globe }
    ]

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <div className='flex items-center gap-2 mb-6'>
                <label className="cursor-pointer">
                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user" className='w-16 h-16 rounded-full object-cover ring ring-slate-300' />
                    ) : (
                        <div className='inline-flex items-center gap-2 text-slate-600'><User className='size-10 p-2.5 border rounded-full' /> Upload Image</div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleChange('image', e.target.files[0])} />
                </label>
            </div>

            {fields.map((field) => (
                <div key={field.key} className='space-y-1 mt-4'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                        <field.icon className='size-4' /> {field.label} {field.required && <span className='text-red-500'>*</span>}
                    </label>
                    <input
                        type={field.type}
                        value={data[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm'
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                </div>
            ))}
        </div>
    )
}

export default PersonalInfoForm