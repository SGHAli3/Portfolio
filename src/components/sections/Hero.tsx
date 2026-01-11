import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface HeroProps {
    theme: 'professional' | 'creative';
    expYears: number;
    isExpAnimating: boolean;
}

const Hero: React.FC<HeroProps> = ({ theme, expYears, isExpAnimating }) => {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center px-8 pt-24 relative z-10"
        >
            <div className="max-w-5xl w-full">
                <p className={`animate-fade-up text-[11px] tracking-[0.32em] uppercase mb-4 ${theme === 'creative' ? 'text-gray-400' : 'text-zinc-500'}`}>
                    Software Quality Engineer · Test Automation · Web & Mobile QA
                </p>

                <h1
                    className={`animate-fade-up hero-font text-4xl sm:text-[9vw] md:text-[6.5vw] lg:text-[5.5rem] leading-[1.05] ${theme === 'creative' ? 'text-white' : 'text-zinc-900'}`}
                    style={{
                        letterSpacing: "0.08em",
                        animationDelay: "0.1s"
                    }}
                >
                    SUGEETH RAJ V M
                </h1>

                <h2 className={`animate-fade-up hero-font text-3xl md:text-5xl lg:text-[1.9rem] font-light leading-[1.15] mt-6 ${theme === 'creative' ? 'text-gray-300' : 'text-zinc-700'}`} style={{ animationDelay: "0.2s" }}>
                    Reliable Test Journeys
                    <br className="hidden md:block" />
                    Built with Precision
                </h2>

                <p className={`text-lg md:text-xl max-w-2xl mt-8 leading-relaxed animate-fade-up ${theme === 'creative' ? 'text-gray-400' : 'text-zinc-600'}`} style={{ animationDelay: '0.3s' }}>
                    QA Engineer with <span className={`transition-all duration-500 ${isExpAnimating ? (theme === 'creative' ? 'font-bold text-white text-2xl' : 'font-bold text-black text-2xl') : ''} `}>{expYears}</span> years of experience in web, mobile, and API testing, mainly in fintech and payments. Skilled in test planning, functional and regression testing, and using tools like Playwright, Postman, and SQL to keep releases stable.
                </p>

                <div className="animate-fade-up flex flex-wrap gap-6 pt-10" style={{ animationDelay: "0.4s" }}>
                    {[
                        {
                            icon: <Linkedin className="w-5 h-5" />,
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/in/sugeethrajvm",
                        },
                        {
                            icon: <Mail className="w-5 h-5" />,
                            label: "Email",
                            href: "mailto:sugeethraj99@gmail.com",
                        },
                        {
                            icon: <Github className="w-5 h-5" />,
                            label: "GitHub",
                            href: "https://github.com/SGHAli3",
                        },
                    ].map((social, idx) => (
                        <a
                            key={idx}
                            href={social.href}
                            target={social.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className={`nav-link flex items-center gap-2 transition-colors duration-300 text-xs ${theme === 'creative' ? 'text-gray-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                            aria-label={`Visit my ${social.label} `}
                        >
                            {social.icon}
                            <span className="tracking-[0.22em] uppercase text-[11px]">
                                {social.label}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Resume Download & Availability */}
                <div className="animate-fade-up flex flex-wrap items-center gap-4 pt-8" style={{ animationDelay: "0.5s" }}>
                    <div className={`flex items-center gap-2 px-4 py-2 border rounded-sm backdrop-blur-sm ${theme === 'creative' ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-green-600/30 bg-green-50 text-green-700'} `}>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 tracking-wide">Open to Opportunities</span>
                    </div>

                    <a
                        href="https://drive.google.com/uc?export=download&id=1ang5LLGQcrCrUX657eDSydOcpeDlv6E2"
                        download="Sugeeth_Raj_VM_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2 px-4 py-2 border backdrop-blur-sm transition-all duration-300 ${theme === 'creative' ? 'border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300' : 'border-blue-500 bg-blue-500/5 hover:bg-blue-500 hover:text-white text-blue-600'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium tracking-wide">Download Resume</span>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className={`text-xs tracking-widest ${theme === 'creative' ? 'text-gray-500' : 'text-gray-400'}`}>SCROLL</span>
                    <div className={`w-px h-12 bg-gradient-to-b ${theme === 'creative' ? 'from-gray-500 to-transparent' : 'from-gray-400 to-transparent'}`}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
