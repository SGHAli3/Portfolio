import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ContactProps {
    theme: 'professional' | 'creative';
    handleOpenPopup: (e?: React.MouseEvent) => void;
}

const Contact: React.FC<ContactProps> = ({ theme, handleOpenPopup }) => {
    return (
        <section id="contact" className="min-h-0 md:min-h-screen flex items-center justify-center px-6 md:px-8 py-12 md:py-24 relative z-10">
            <div className="max-w-4xl w-full text-center">
                <p className={`text-sm tracking-[0.3em] uppercase mb-8 ${theme === 'creative' ? 'text-gray-500' : 'text-zinc-500'}`}>
                    Get In Touch
                </p>
                <h2 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-12 leading-tight ${theme === 'creative' ? 'text-white' : 'text-zinc-900'}`}>
                    Let&apos;s build reliable products together
                </h2>

                <a
                    href="mailto:sugeethraj99@gmail.com?subject=Opportunity%20for%20Software%20Quality%20Engineer"
                    className={`group inline-flex items-center gap-4 px-8 py-4 border transition-all duration-500 ${theme === 'creative'
                            ? 'border-white text-white hover:bg-white hover:text-black'
                            : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                        }`}
                >
                    <span className="text-lg">Start a conversation</span>
                    <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                </a>

                <div className="mt-24 text-gray-600 text-sm flex flex-col items-center gap-2">
                    <button
                        type="button"
                        onClick={handleOpenPopup}
                        className={`transition-colors cursor-pointer ${theme === 'creative' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-black'} `}
                    >
                        © {new Date().getFullYear()} Sugeeth Raj V M. All rights reserved.
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
