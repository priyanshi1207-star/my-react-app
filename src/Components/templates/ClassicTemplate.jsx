import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 shadow-lg">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {/* Dynamically renders the exact profession from the form */}
                <p className="text-sm uppercase tracking-widest font-semibold mb-3 text-gray-500">
                    {data.personal_info?.professional_title || "PROFESSIONAL TITLE"}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                    {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="size-3" />{data.personal_info.email}</div>}
                    {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="size-3" />{data.personal_info.phone}</div>}
                    {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="size-3" />{data.personal_info.location}</div>}
                </div>
            </header>

            {/* Experience Section - Fixed to work_experience */}
            {data.work_experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-4 border-b pb-1" style={{ color: accentColor }}>EXPERIENCE</h2>
                    <div className="space-y-4">
                        {data.work_experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between font-bold text-sm">
                                    <span>{exp.position}</span>
                                    <span>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <div className="text-sm italic text-gray-600">{exp.company}</div>
                                <p className="text-sm mt-1 whitespace-pre-line text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education Section */}
            {data.education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-4 border-b pb-1" style={{ color: accentColor }}>EDUCATION</h2>
                    {data.education.map((edu, index) => (
                        <div key={index} className="flex justify-between text-sm mb-2">
                            <div>
                                <span className="font-bold">{edu.degree}</span> in {edu.field}
                                <p className="text-gray-600">{edu.institution}</p>
                            </div>
                            <span>{formatDate(edu.graduation_date)}</span>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;