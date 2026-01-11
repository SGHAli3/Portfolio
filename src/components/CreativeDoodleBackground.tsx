import React, { useEffect, useRef, useState } from 'react';
import { Pencil, Medal, Shield, Monitor, Camera, Briefcase, Video, Heart } from 'lucide-react';

const CreativeDoodleBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Auto-scroll the timeline
    useEffect(() => {
        let animationFrame: number;
        let startTime = Date.now();
        const duration = 20000; // 20 seconds for full loop

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = (elapsed % duration) / duration;
            setScrollProgress(progress);
            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const storyPoints = [
        {
            icon: <Pencil className="w-8 h-8 text-indigo-600" />,
            label: "11 Years Old",
            desc: "Thalassery, Kerala. Found joy in drawing & art.",
            top: 15,
            left: 10
        },
        {
            icon: <Medal className="w-8 h-8 text-amber-500" />,
            label: "6th Grade",
            desc: "St. Joseph's Boys HSS. Sports medals & district games.",
            top: 30,
            left: 25
        },
        {
            icon: <Shield className="w-8 h-8 text-green-600" />,
            label: "NCC Cadet",
            desc: "Learning discipline & leadership.",
            top: 45,
            left: 15
        },
        {
            icon: <Monitor className="w-8 h-8 text-blue-600" />,
            label: "10th Grade",
            desc: "Discovered Computer Science & Innovation.",
            top: 60,
            left: 30
        },
        {
            icon: <Camera className="w-8 h-8 text-purple-600" />,
            label: "CSIT & Photography",
            desc: "Capturing moments, moving to Cinematography.",
            top: 75,
            left: 10
        },
        {
            icon: <Briefcase className="w-8 h-8 text-slate-700" />,
            label: "21 Years Old",
            desc: "The 9-to-6 Professional Journey.",
            top: 90,
            left: 25
        },
        {
            icon: <Video className="w-10 h-10 text-red-600" />,
            label: "The Dream",
            desc: "Dreaming of the Sony Cinema Line.",
            top: 85,
            left: 55 // Floating off to the side/end
        }
    ];

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-white pointer-events-none opacity-50">
            {/* Hand-drawn grid pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}>
            </div>

            {/* Moving wrapper to simulate camera movement along the timeline */}
            <div
                className="absolute w-full h-full transition-transform duration-100 ease-linear"
                style={{
                    transform: `translateY(-${scrollProgress * 50}%)`
                }}
            >
                {/* SVG Path connecting the dots */}
                <svg className="absolute w-full h-[200%] top-0 left-0" style={{ overflow: 'visible' }}>
                    <path
                        d="M 150 100 Q 400 300 150 500 T 150 900 Q 400 1100 150 1300 T 300 1700"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="3"
                        strokeDasharray="10 10"
                        className="opacity-50"
                    />
                    {/* Animated drawing line following the path could go here but simple dashed line fits 'doodle' */}
                </svg>

                {storyPoints.map((point, idx) => (
                    <div
                        key={idx}
                        className="absolute flex items-start gap-4 p-4 transition-all duration-500 transform hover:scale-110"
                        style={{
                            top: `${point.top}%`,
                            left: `${point.left}%`,
                            maxWidth: '300px'
                        }}
                    >
                        <div className="p-3 bg-white border-2 border-gray-200 rounded-full shadow-sm scribble-border">
                            {point.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-handwriting text-lg font-bold text-gray-800 rotate-1">
                                {point.label}
                            </span>
                            <span className="font-handwriting text-sm text-gray-500 -rotate-1">
                                {point.desc}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Floating "Dream" bubbles moving upward independently */}
                <div className="absolute top-[85%] right-[20%] opacity-20">
                    <Video className="w-24 h-24 animate-bounce" />
                </div>
            </div>

            {/* CSS for "scribble" look if we want to add a class later, or just use standard styles */}
            <style>{`
        .font-handwriting {
            font-family: 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif;
        }
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
      `}</style>
        </div>
    );
};

export default CreativeDoodleBackground;
