import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 p-10">
            <div className="flex items-center gap-10 mb-12 border-b pb-10 border-zinc-100">
                <div className="flex-shrink-0">
                    {data.personal_info?.image ? (
                        <img src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                            className="w-36 h-36 object-cover rounded-full border-4 shadow-sm" style={{ borderColor: accentColor }} alt="Profile" />
                    ) : (
                        <div className="w-36 h-36 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">No Photo</div>
                    )}
                </div>
                <div>
                    <h1 className="text-5xl font-bold tracking-tight">{data.personal_info?.full_name || "Your Name"}</h1>
                    <p className="text-lg uppercase tracking-[0.3em] font-medium mt-2" style={{ color: accentColor }}>
                        {data.personal_info?.professional_title || "Professional Title"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-12">
                <aside className="col-span-4 border-r border-zinc-100 pr-10">
                    <section className="mb-10">
                        <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">Contact</h2>
                        <div className="space-y-4 text-sm">
                            {data.personal_info?.email && <div className="flex items-center gap-3"><Mail size={14} style={{ color: accentColor }} />{data.personal_info.email}</div>}
                            {data.personal_info?.phone && <div className="flex items-center gap-3"><Phone size={14} style={{ color: accentColor }} />{data.personal_info.phone}</div>}
                        </div>
                    </section>

                    {/* Added Skills to Sidebar */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-600">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                <main className="col-span-8">
                    {data.work_experience?.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">Experience</h2>
                            <div className="space-y-10">
                                {data.work_experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between"><h3 className="font-bold">{exp.position}</h3><span className="text-[10px] text-zinc-400">{formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}</span></div>
                                        <p className="text-sm font-semibold" style={{ color: accentColor }}>{exp.company}</p>
                                        <p className="text-sm text-zinc-600 whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Added Missing Projects section */}
                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-5">Projects</h2>
                            <div className="space-y-6">
                                {data.projects.map((p, index) => (
                                    <div key={index}><h3 className="font-bold text-sm">{p.name}</h3><p className="text-sm text-zinc-600">{p.description}</p></div>
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