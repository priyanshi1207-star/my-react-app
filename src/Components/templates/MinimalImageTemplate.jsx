import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 p-10">
            {/* 1. HEADER SECTION (Fixes the alignment issue) */}
            <div className="flex items-center gap-10 mb-12 border-b pb-10 border-zinc-100">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    {data.personal_info?.image ? (
                        <img
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                            alt="Profile"
                            className="w-36 h-36 object-cover rounded-full border-4 shadow-sm"
                            style={{ borderColor: accentColor }}
                        />
                    ) : (
                        <div className="w-36 h-36 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                            No Photo
                        </div>
                    )}
                </div>

                {/* Name & Profession */}
                <div className="flex flex-col">
                    <h1 className="text-5xl font-bold text-zinc-800 tracking-tight leading-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg uppercase tracking-[0.3em] font-medium mt-2" style={{ color: accentColor }}>
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>
            </div>

            {/* 2. BODY SECTION (Fixes the duplicate contact/grid issue) */}
            <div className="grid grid-cols-12 gap-12">

                {/* LEFT SIDEBAR (Span 4 of 12) */}
                <aside className="col-span-4 border-r border-zinc-100 pr-10">
                    {/* Contact - Rendered ONLY here */}
                    <section className="mb-10">
                        <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                            Contact
                        </h2>
                        <div className="space-y-4 text-sm">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={14} style={{ color: accentColor }} />
                                    <span className="text-zinc-600">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span className="text-zinc-600 break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span className="text-zinc-600">{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                                Education
                            </h2>
                            <div className="space-y-6 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-zinc-800">{edu.degree}</p>
                                        <p className="text-zinc-500">{edu.institution}</p>
                                        <p className="text-[10px] text-zinc-400 mt-1 uppercase">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-xs bg-zinc-50 px-2 py-1 rounded border border-zinc-100 text-zinc-600">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* RIGHT MAIN CONTENT (Span 8 of 12) */}
                <main className="col-span-8">
                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-12">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                                Profile
                            </h2>
                            <p className="text-sm text-zinc-600 leading-relaxed italic">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {(data.work_experience?.length > 0) && (
                        <section className="mb-12">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {data.work_experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-zinc-800 text-base">{exp.position}</h3>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-sm text-zinc-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">
                                Projects
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {data.projects.map((project, index) => (
                                    <div key={index} className="p-4 rounded-lg border border-zinc-100 bg-zinc-50/50">
                                        <h3 className="text-sm font-bold text-zinc-800 mb-1">{project.name}</h3>
                                        <p className="text-[10px] font-bold uppercase mb-2" style={{ color: accentColor }}>{project.type}</p>
                                        <p className="text-xs text-zinc-500 line-clamp-3">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;