import React from 'react';
import { experienceProjects } from '../../data/portfolioData';
import { ExternalLink } from 'lucide-react';

interface ExperienceProps {
    theme: 'professional' | 'creative';
    setActiveExpProject: (id: number) => void;
}

const Experience: React.FC<ExperienceProps> = ({ theme, setActiveExpProject }) => {
    return (
        <section
            id="experience"
            className={`min-h-0 md:min-h-screen px-6 md:px-8 py-8 md:py-16 relative z-10 transition-colors duration-700 ${theme === 'creative' ? 'bg-transparent' : 'bg-gradient-to-b from-gray-50 to-white'}`}
        >
            <div className="max-w-6xl mx-auto w-full">
                <p className={`text-sm tracking-[0.3em] uppercase mb-6 ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'} `}>
                    Professional Journey
                </p>
                <h2 className={`text-4xl md:text-5xl font-light mb-12 ${theme === 'creative' ? 'text-white' : 'text-zinc-900'}`}>Experience</h2>

                {/* Visual Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

                    <div className="space-y-12">
                        {experienceProjects.map((exp) => (
                            <div key={exp.id} className="relative pl-8 md:pl-20">
                                {/* Timeline Dot */}
                                <div className={`absolute left-0 md:left-8 top-2 w-4 h-4 -ml-[7px] rounded-full border-4 ${theme === 'creative' ? 'bg-white border-zinc-900 shadow-[0_0_10px_white]' : 'bg-black border-white shadow-md'}`}></div>

                                <div className={`border p-6 rounded-lg transition-all duration-300 ${theme === 'creative'
                                        ? 'bg-zinc-900/40 backdrop-blur-md border-zinc-700/50 hover:border-zinc-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                        : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-lg'
                                    }`}>
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                                        <div>
                                            <h3 className={`text-xl font-light mb-1 ${theme === 'creative' ? 'text-white' : 'text-zinc-900'}`}>
                                                {exp.role}
                                            </h3>
                                            <p className={`text-sm font-medium ${theme === 'creative' ? 'text-gray-400' : 'text-zinc-600'} `}>
                                                {exp.projectTitle}
                                            </p>
                                        </div>
                                        <span className={`text-sm md:text-right whitespace-nowrap ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'} `}>
                                            {exp.period}
                                        </span>
                                    </div>

                                    <p className={`text-sm mb-4 ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'} `}>
                                        {exp.company} · {exp.location}
                                    </p>

                                    <ul className={`space-y-2 text-sm leading-relaxed ${theme === 'creative' ? 'text-gray-400' : 'text-zinc-600'} `}>
                                        {exp.summary.map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="text-gray-500 mr-2">▹</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setActiveExpProject(exp.id)}
                                        className={`mt-4 inline-flex items-center gap-2 px-4 py-2 border transition-all duration-300 text-sm ${theme === 'creative'
                                                ? 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500 text-blue-300'
                                                : 'border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 text-blue-700'
                                            } `}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Projects</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
