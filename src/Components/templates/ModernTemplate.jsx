import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-1">{data.personal_info?.full_name || "Your Name"}</h1>
				{/* Added professional_title display */}
				<p className="text-white/80 uppercase tracking-widest text-sm mb-4">
					{data.personal_info?.professional_title || "Professional Title"}
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2"><Mail className="size-4" /><span>{data.personal_info.email}</span></div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2"><Phone className="size-4" /><span>{data.personal_info.phone}</span></div>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* FIXED: Changed data.experience to data.work_experience */}
				{data.work_experience && data.work_experience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Experience</h2>
						<div className="space-y-6">
							{data.work_experience.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">{exp.description}</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* FIXED: Changed data.project to data.projects */}
				{data.projects && data.projects.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Projects</h2>
						<div className="space-y-6">
							{data.projects.map((p, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
									<h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
									<div className="text-gray-700 leading-relaxed text-sm mt-3">{p.description}</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default ModernTemplate;