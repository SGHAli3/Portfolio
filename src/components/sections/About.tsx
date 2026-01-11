import React from 'react';
import { skills, creativeSkills, aiSkills, qaTools, databases, platforms, additionalSkills, certifications } from '../../data/portfolioData';
import { Award } from 'lucide-react';

interface AboutProps {
    theme: 'professional' | 'creative';
    expYears: number;
    isExpAnimating: boolean;
    setActiveCert: (link: string | null) => void;
}

const About: React.FC<AboutProps> = ({ theme, expYears, isExpAnimating, setActiveCert }) => {
    const getSectionTitleClass = () => `text-sm tracking-[0.3em] uppercase mb-4 ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'}`;

    const getSkillBadgeClass = (color: string) => {
        // Map simplified color names to tailwind classes based on theme
        const baseClasses = "px-5 py-2 border transition-colors duration-300 text-sm backdrop-blur-sm";

        if (theme === 'creative') {
            switch (color) {
                case 'green': return `${baseClasses} border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-300`;
                case 'blue': return `${baseClasses} border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-300`;
                case 'cyan': return `${baseClasses} border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300`;
                case 'purple': return `${baseClasses} border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300`;
                case 'gray': return `${baseClasses} border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 text-gray-300`;
                default: return `${baseClasses} border-gray-700 bg-gray-800/30 text-gray-300`;
            }
        } else {
            // Professional Theme
            switch (color) {
                case 'green': return `${baseClasses} border-green-200 bg-green-50 hover:border-green-300 text-green-800`;
                case 'blue': return `${baseClasses} border-blue-200 bg-blue-50 hover:border-blue-300 text-blue-800`;
                case 'cyan': return `${baseClasses} border-cyan-200 bg-cyan-50 hover:border-cyan-300 text-cyan-800`;
                case 'purple': return `${baseClasses} border-purple-200 bg-purple-50 hover:border-purple-300 text-purple-800`;
                case 'gray': return `${baseClasses} border-gray-200 bg-gray-100 hover:border-gray-300 text-gray-700`;
                default: return `${baseClasses} border-gray-200 bg-gray-50 text-gray-800`;
            }
        }
    };

    return (
        <section id="about" className={`flex items-center px-6 md:px-8 py-12 md:py-20 relative z-10 transition-colors duration-700 ${theme === 'creative' ? 'text-gray-300' : 'text-zinc-600'}`}>
            <div className="max-w-6xl mx-auto w-full">
                <p className={`text-sm tracking-[0.3em] uppercase mb-6 ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'}`}>About</p>
                <h2 className={`text-4xl md:text-5xl font-light mb-8 leading-tight ${theme === 'creative' ? 'text-white' : 'text-zinc-900'}`}>
                    Building Quality into Every Product
                </h2>

                <div className="space-y-6 mb-8">
                    <p className="text-lg leading-relaxed">
                        I focus on ensuring reliable, well-tested products through careful test planning,
                        functional and regression testing, and close collaboration with product and
                        engineering teams across various industries.
                    </p>
                    <p className="text-lg leading-relaxed">
                        My experience spans web applications, mobile apps, payment systems, and API validation.
                        I design test strategies that protect core flows while catching edge cases early in
                        the development cycle.
                    </p>
                </div>

                <div className="mb-10">
                    <p className={getSectionTitleClass()}>
                        Location · Experience
                    </p>
                    <p className={`text-lg ${theme === 'creative' ? 'text-gray-300' : 'text-zinc-700'} `}>
                        Bengaluru, India · <span className={`transition-all duration-500 ${isExpAnimating ? (theme === 'creative' ? "font-bold text-white text-2xl" : "font-bold text-black text-2xl") : "font-medium"} `}>{expYears}</span> years in QA
                    </p>
                </div>

                <div>
                    <p className={getSectionTitleClass()}>QA & Technical Skills</p>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, idx) => (
                            <span key={idx} className={getSkillBadgeClass('green')}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>Creative & Design Skills</p>
                    <div className="flex flex-wrap gap-3">
                        {creativeSkills.map((skill, idx) => (
                            <span key={idx} className={getSkillBadgeClass('blue')}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>AI & Vibe Coding</p>
                    <div className="flex flex-wrap gap-3">
                        {aiSkills.map((skill, idx) => (
                            <span key={idx} className={getSkillBadgeClass('cyan')}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>QA & Automation Tools</p>
                    <div className="flex flex-wrap gap-3">
                        {qaTools.map((tool, idx) => (
                            <span key={idx} className={getSkillBadgeClass('purple')}>
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>Databases</p>
                    <div className="flex flex-wrap gap-3">
                        {databases.map((db, idx) => (
                            <span key={idx} className={getSkillBadgeClass('blue')}>
                                {db}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>Platforms</p>
                    <div className="flex flex-wrap gap-3">
                        {platforms.map((platform, idx) => (
                            <span key={idx} className={getSkillBadgeClass('cyan')}>
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>Additional Skills</p>
                    <div className="flex flex-wrap gap-3">
                        {additionalSkills.map((skill, idx) => (
                            <span key={idx} className={getSkillBadgeClass('gray')}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <p className={getSectionTitleClass()}>Certifications</p>
                    <div className="flex flex-wrap gap-3">
                        {certifications.map((cert, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCert(cert.link)}
                                className={`group flex items-center gap-2 px-5 py-2 border transition-all duration-300 text-sm cursor-pointer ${theme === 'creative'
                                        ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-200'
                                        : 'border-amber-200 bg-amber-50 hover:border-amber-300 hover:bg-amber-100 text-amber-800'
                                    } `}
                            >
                                <Award className={`w-4 h-4 transition-colors ${theme === 'creative' ? 'group-hover:text-amber-100' : 'group-hover:text-amber-900'} `} />
                                <span>{cert.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
