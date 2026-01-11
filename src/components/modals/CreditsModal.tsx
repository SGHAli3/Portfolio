import React, { CSSProperties } from 'react';

interface CreditsModalProps {
    showCreditsPopup: boolean;
    setShowCreditsPopup: (show: boolean) => void;
    isClosing: boolean;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ showCreditsPopup, setShowCreditsPopup, isClosing }) => {
    if (!showCreditsPopup) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"} `}
            onClick={() => setShowCreditsPopup(false)}
        >
            {/* Shatter & Void Animation Elements */}
            {isClosing && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">

                    {/* 1. The Shockwave & Flash */}
                    <div className="absolute inset-0 bg-white animate-flash z-50" />
                    <div className="absolute w-[500px] h-[500px] rounded-full border-white border-[50px] animate-shockwave z-40" />

                    {/* 2. The Blast Shards (Monochromatic Debris) */}
                    {[...Array(60)].map((_, i) => {
                        const angle = (i / 60) * 360;
                        const dist = 400 + Math.random() * 300;
                        const tx = Math.cos(angle * Math.PI / 180) * dist + 'px';
                        const ty = Math.sin(angle * Math.PI / 180) * dist + 'px';
                        const r = Math.random() * 720 + 'deg';
                        const size = 5 + Math.random() * 15;

                        return (
                            <div
                                key={i}
                                className="absolute bg-white animate-shard"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    left: '50%',
                                    top: '50%',
                                    '--tx': tx,
                                    '--ty': ty,
                                    '--r': r,
                                    borderRadius: Math.random() > 0.5 ? '50%' : '0%', // Mix of dots and squares
                                    animationDelay: '0.5s',
                                    boxShadow: '0 0 10px white'
                                } as CSSProperties}
                            />
                        );
                    })}

                    {/* 3. The "Pure" Void (Minimalist Black Hole) */}
                    <div className="absolute w-0 h-0 flex items-center justify-center animate-void z-40">
                        {/* The Event Horizon (Pure Core) */}
                        <div className="absolute w-40 h-40 bg-black rounded-full z-20 animate-pulse shadow-[0_0_60px_rgba(255,255,255,0.2)]" />
                    </div>
                </div>
            )}

            <div
                className={`relative bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-10 max-w-md mx-4 shadow-2xl overflow-hidden ${isClosing ? "animate-shake opacity-0 transition-opacity duration-0 delay-500" : "animate-scaleIn"} `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button (Hidden during sequence) */}
                {!isClosing && (
                    <button
                        onClick={() => setShowCreditsPopup(false)}
                        className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Content */}
                <div className="text-center relative z-10">
                    <h3 className="text-2xl font-light mb-2 text-white">
                        Handcrafted Portfolio
                    </h3>

                    <p className="text-xs text-zinc-500 mb-8 font-medium tracking-[0.2em] uppercase">
                        Designed & Developed by Sugeeth
                    </p>

                    <div className="space-y-6 text-zinc-400 text-sm leading-relaxed font-light">
                        <p>
                            This entire experience was conceptualized, designed, and coded from scratch.
                        </p>
                        <p>
                            Built with <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Tailwind CSS</span>, and a <span className="text-white font-medium">vibe coding</span> approach to merge aesthetics with performance.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col gap-2">
                        <p className="text-xs text-zinc-600">
                            © {new Date().getFullYear()} Sugeeth Raj V M
                        </p>
                        <p className="text-[10px] text-zinc-700 uppercase tracking-widest">
                            All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditsModal;
