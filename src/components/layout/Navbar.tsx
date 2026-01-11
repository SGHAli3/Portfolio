import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
    theme: 'professional' | 'creative';
    setTheme: (theme: 'professional' | 'creative') => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 transition-all duration-500 pointer-events-none ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'} ${theme === 'creative' && scrolled ? '!bg-black/50 !backdrop-blur-xl !border-b !border-white/10' : ''}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto pointer-events-auto">
                {/* Logo Section - Left Aligned */}
                <div className="flex items-center gap-6">
                    {theme === 'creative' ? (
                        // Manga tri-layer effect - with padding to prevent cutoff
                        <div className="relative px-3 py-2">
                            {/* Background Heavy Stroke */}
                            <div className="absolute inset-0 flex items-center px-3">
                                <div className="text-lg font-black text-transparent italic select-none whitespace-nowrap"
                                    style={{
                                        fontFamily: "'Impact', sans-serif",
                                        WebkitTextStroke: "6px black"
                                    }}>
                                    SUGEETH RAJ VM
                                </div>
                            </div>

                            {/* Middle Red Stroke */}
                            <div className="absolute inset-0 flex items-center px-3">
                                <div className="text-lg font-black text-transparent italic select-none whitespace-nowrap"
                                    style={{
                                        fontFamily: "'Impact', sans-serif",
                                        WebkitTextStroke: "2.5px #FF0000"
                                    }}>
                                    SUGEETH RAJ VM
                                </div>
                            </div>

                            {/* Front White Text */}
                            <div className="relative text-lg font-black text-white italic tracking-tight select-none whitespace-nowrap"
                                style={{
                                    fontFamily: "'Impact', sans-serif",
                                    textShadow: '1.5px 1.5px 0px black'
                                }}>
                                SUGEETH RAJ VM
                            </div>
                        </div>
                    ) : (
                        // Professional mode - smaller, simple
                        <div className="font-black text-base tracking-tight text-zinc-900">
                            SUGEETH RAJ VM
                        </div>
                    )}

                    {/* Creative Mode Toggle (Left Side) - Only show if in creative mode to switch back */}
                    {theme === 'creative' && (
                        <button
                            onClick={() => setTheme('professional')}
                            className="relative flex items-center justify-between gap-2 px-4 py-2 border-2 border-red-500 bg-black/80 hover:bg-red-600 text-white transition-all duration-300 group transform skew-x-[-5deg]"
                            aria-label="Switch to Professional"
                            style={{ fontFamily: "'Impact', sans-serif" }}
                        >
                            <span className="text-xs uppercase tracking-widest font-black">Other Side</span>
                            <div className="absolute inset-0 border border-white/20 transform translate-x-0.5 translate-y-0.5" />
                        </button>
                    )}
                </div>

                {/* Right Section: Links + Pro Toggle */}
                <div className="flex items-center gap-8">
                    {/* Navigation links - ONLY show in Professional mode */}
                    {theme === 'professional' && (
                        <div className="hidden md:flex gap-8">
                            {['About', 'Experience', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={'nav-link transition-colors relative group text-zinc-500 hover:text-zinc-900'}
                                >
                                    {item.toUpperCase()}
                                    <span className={'absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-zinc-900'}></span>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Professional Mode Toggle (Right Side - Minimal) */}
                    {theme === 'professional' && (
                        <button
                            onClick={() => setTheme('creative')}
                            className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
                            aria-label="Switch to Creative"
                        >
                            <span className="hidden sm:block text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                The Other Side
                            </span>
                            <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-400 bg-white shadow-sm transition-all duration-300 hover:scale-110">
                                <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-600 transition-colors" />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
