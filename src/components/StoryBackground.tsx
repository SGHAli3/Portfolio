import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Instagram, Volume2, VolumeX } from 'lucide-react';

// Import local images
import artistImg from '../assets/story/artist.png';
import athleteImg from '../assets/story/athlete.png';
import innovatorImg from '../assets/story/innovator.png';
import storytellerImg from '../assets/story/storyteller.png';
import cinematographerImg from '../assets/story/cinematographer.png';

const StoryBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const startedRef = useRef(false);
    const hasCompletedOnceRef = useRef(false);

    const scenes = useMemo(() => [
        { image: artistImg, title: "THE ARTIST", color: "#FF0000" },
        { image: athleteImg, title: "THE ATHLETE", color: "#FF0000" },
        { image: innovatorImg, title: "THE INNOVATOR", color: "#FF0000" },
        { image: storytellerImg, title: "THE STORYTELLER", color: "#FF0000" },
        { image: cinematographerImg, title: "THE CINEMATOGRAPHER", color: "#FF0000" },
        { image: innovatorImg, title: "THE QA PROFESSIONAL", color: "#FF0000" },
    ], []);

    const textPositions = useMemo(() => {
        return scenes.map((_, i) => {
            const quadrants = [
                "top-[15%] left-[5%] md:top-[20%] md:left-[10%]",
                "top-[15%] right-[5%] md:top-[20%] md:right-[10%]",
                "bottom-[15%] left-[5%] md:bottom-[20%] md:left-[10%]",
                "bottom-[15%] right-[5%] md:bottom-[20%] md:right-[10%]"
            ];
            return quadrants[i % quadrants.length];
        });
    }, [scenes]);

    const handleStart = () => {
        setHasStarted(true);
        startedRef.current = true;

        if (audioRef.current) {
            const audio = audioRef.current;
            audio.volume = 0.5;
            audio.play().catch(e => {
                console.log("Audio play failed:", e);
            });
        }
    };

    const handleAudioError = () => {
        setAudioError(true);
        console.error("Audio file missing or not supported. Please ensure 'Reptilia.mp3' is in 'public/audio/'.");
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const newMutedState = !isMuted;
            audioRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505);
        scene.fog = new THREE.FogExp2(0x050505, 0.035);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const loader = new THREE.TextureLoader();
        const tunnelGroup = new THREE.Group();
        scene.add(tunnelGroup);

        const spacing = 40;

        scenes.forEach((s, i) => {
            const tex = loader.load(s.image);
            tex.colorSpace = THREE.SRGBColorSpace;

            const group = new THREE.Group();
            const xOffset = (i % 2 === 0 ? -1 : 1) * (6 + Math.random() * 2);
            const yOffset = (Math.random() - 0.5) * 6;
            const zPos = -i * spacing;

            group.position.set(xOffset, yOffset, zPos);
            group.rotation.z = (Math.random() - 0.5) * 0.3;
            group.rotation.y = (i % 2 === 0 ? 0.4 : -0.4);

            const w = 18;
            const h = 18;
            const borderGeo = new THREE.PlaneGeometry(w + 1, h + 1);
            const borderMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const border = new THREE.Mesh(borderGeo, borderMat);
            border.position.z = -0.05;
            group.add(border);

            const geo = new THREE.PlaneGeometry(w, h);
            const mat = new THREE.MeshBasicMaterial({ map: tex });
            const mesh = new THREE.Mesh(geo, mat);
            group.add(mesh);

            tunnelGroup.add(group);
        });

        const particlesGeo = new THREE.BufferGeometry();
        const pCount = 3000;
        const pPos = new Float32Array(pCount * 3);

        for (let i = 0; i < pCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 25 + Math.random() * 50;
            pPos[i] = Math.cos(angle) * radius;
            pPos[i + 1] = Math.sin(angle) * radius;
            pPos[i + 2] = (Math.random() - 0.5) * (scenes.length * spacing * 4);
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true,
            opacity: 0.4
        });
        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        let cameraZ = 10;
        const flightSpeed = 0.25;
        const tunnelLength = scenes.length * spacing;

        const animate = () => {
            requestAnimationFrame(animate);

            if (startedRef.current) {
                cameraZ -= flightSpeed;

                if (cameraZ < -(tunnelLength - 10)) {
                    if (!hasCompletedOnceRef.current) {
                        hasCompletedOnceRef.current = true;
                        setShowSocialModal(true);
                    }
                    cameraZ = 10;
                }
            } else {
                cameraZ = 10 + Math.sin(Date.now() * 0.0005) * 2;
            }

            camera.position.z = cameraZ;

            const time = Date.now() * 0.001;
            camera.position.x = Math.sin(time * 0.5) * 1.0 + (Math.sin(time * 10) * 0.05);
            camera.position.y = Math.cos(time * 0.3) * 1.0 + (Math.cos(time * 12) * 0.05);

            const rawIndex = (20 - cameraZ) / spacing;
            const roundedIndex = Math.floor(rawIndex + 0.5);
            const safeIndex = (roundedIndex % scenes.length + scenes.length) % scenes.length;

            setActiveIndex((prev) => {
                if (prev !== safeIndex) return safeIndex;
                return prev;
            });

            const pPositions = particlesGeo.attributes.position.array as Float32Array;
            for (let i = 2; i < pPositions.length; i += 3) {
                if (pPositions[i] > cameraZ + 50) pPositions[i] -= 350;
                if (pPositions[i] < cameraZ - 300) pPositions[i] += 350;
            }
            particlesGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [scenes]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black font-sans">
            <audio
                ref={audioRef}
                src="/audio/Reptilia.mp3"
                onError={handleAudioError}
                loop
            />

            <style>{`
                @keyframes manga-slam {
                    0% { transform: scale(3) rotate(-15deg); opacity: 0; filter: blur(8px); }
                    50% { transform: scale(0.9) rotate(5deg); opacity: 1; filter: blur(0px); }
                    70% { transform: scale(1.05) rotate(-3deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
                @keyframes flash-bang {
                    0% { opacity: 0.9; background-color: white; }
                    100% { opacity: 0; background-color: transparent; }
                }
                @keyframes social-popup {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); }
                }
                .text-manga-slam {
                    animation: manga-slam 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .flash-effect {
                    animation: flash-bang 0.25s ease-out forwards;
                }
                .social-popup {
                    animation: social-popup 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>

            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* MUTE BUTTON - Top Right */}
            {hasStarted && !audioError && (
                <button
                    onClick={toggleMute}
                    className="fixed top-6 right-6 z-[100] pointer-events-auto cursor-pointer p-3 bg-black border-2 border-red-600 hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    style={{ fontFamily: "'Impact', sans-serif" }}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white" />
                    ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                    )}
                </button>
            )}

            {/* START OVERLAY */}
            {!hasStarted && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-500">
                    <button
                        onClick={handleStart}
                        className={`group relative px-12 py-6 ${audioError ? 'bg-gray-600' : 'bg-red-600'} text-white font-black text-4xl uppercase tracking-widest hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 border-4 border-white transform skew-x-[-10deg] mb-8`}
                        style={{ fontFamily: "'Impact', sans-serif" }}
                    >
                        <span className="relative z-10">{audioError ? "ENTER SILENTLY" : "ENTER THE VOID"}</span>
                        <div className="absolute inset-0 border-2 border-black transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                    </button>

                    {audioError && (
                        <div className="text-center space-y-4 animate-pulse p-6 border-2 border-red-500/50 bg-black/50 max-w-lg mx-4">
                            <p className="text-red-500 font-mono font-bold text-xl tracking-widest">MISSING AUDIO ASSET</p>
                            <div className="text-gray-400 font-mono text-sm space-y-2">
                                <p>To enable the soundtrack:</p>
                                <p>1. Download <strong>Reptilia.mp3</strong></p>
                                <p>2. Place it in: <span className="text-white bg-white/10 px-2 py-1 rounded">sugeeth-portfolio/public/audio/</span></p>
                                <p className="text-xs text-gray-500 pt-2">(Click button above to test without audio)</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* SOCIAL MEDIA MODAL - Shows after journey completes */}
            {showSocialModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
                    <div className="social-popup relative p-8 bg-black border-4 border-red-600 max-w-md mx-4 transform skew-y-[-2deg]">
                        <button
                            onClick={() => setShowSocialModal(false)}
                            className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-2xl hover:bg-red-600 hover:text-white transition-colors transform rotate-45"
                        >
                            ×
                        </button>

                        <h2 className="text-white font-black text-4xl mb-6 text-center italic tracking-tighter"
                            style={{ fontFamily: "'Impact', sans-serif" }}>
                            FIND ME ON
                        </h2>

                        <div className="flex gap-6 justify-center">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/sugeeth._?igsh=ejhqa3pweGg2azY2&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                                <div className="relative bg-black border-4 border-white p-8 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all group transform group-hover:scale-110">
                                    <Instagram className="w-16 h-16 text-white" />
                                    <p className="text-white font-bold mt-2 text-center text-xs">INSTAGRAM</p>
                                </div>
                            </a>

                            {/* Behance */}
                            <a
                                href="https://behance.net/sugeethrajvm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-blue-600 transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                                <div className="relative bg-black border-4 border-white p-8 hover:bg-blue-600 transition-all transform group-hover:scale-110">
                                    <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                    </svg>
                                    <p className="text-white font-bold mt-2 text-center text-xs">BEHANCE</p>
                                </div>
                            </a>
                        </div>

                        <p className="text-white/50 text-xs text-center mt-6 font-mono">
                            Click anywhere outside to continue
                        </p>
                    </div>

                    <div
                        className="absolute inset-0 -z-10"
                        onClick={() => setShowSocialModal(false)}
                    />
                </div>
            )}

            <div className="absolute inset-0 z-20 pointer-events-none opacity-15 mix-blend-overlay"
                style={{
                    backgroundImage: 'radial-gradient(circle, #888 2px, transparent 2.5px)',
                    backgroundSize: '6px 6px'
                }}
            />

            {/* Dynamic Text Overlay */}
            {hasStarted && scenes.map((scene, index) => {
                const isActive = index === activeIndex;
                return (
                    <div
                        key={index}
                        className={`absolute pointer-events-none z-30 transition-opacity duration-100 ease-linear
                            ${textPositions[index]} 
                            ${isActive ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        {isActive && (
                            <div className="relative group text-manga-slam origin-center p-10">
                                <div className="absolute inset-0 z-[-1] flash-effect" />

                                <h1 className="absolute top-2 left-2 md:top-3 md:left-3 text-6xl md:text-9xl font-black text-transparent z-0 italic select-none"
                                    style={{
                                        fontFamily: "'Impact', sans-serif",
                                        WebkitTextStroke: "20px black"
                                    }}>
                                    {scene.title}
                                </h1>

                                <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black text-transparent z-10 italic select-none"
                                    style={{
                                        fontFamily: "'Impact', sans-serif",
                                        WebkitTextStroke: "6px " + scene.color
                                    }}>
                                    {scene.title}
                                </h1>

                                <h1 className="relative text-6xl md:text-9xl font-black text-white z-20 italic tracking-tighter select-none"
                                    style={{
                                        fontFamily: "'Impact', sans-serif",
                                        transform: "skew(-10deg)",
                                        textShadow: '4px 4px 0px black'
                                    }}>
                                    {scene.title}
                                </h1>

                                <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 border-4 border-black transform -rotate-1 translate-y-6 translate-x-6 mix-blend-normal opacity-100"
                                    style={{
                                        backgroundColor: scene.color,
                                        clipPath: "polygon(2% 0%, 100% 2%, 98% 100%, 0% 98%)"
                                    }} />
                            </div>
                        )}
                    </div>
                );
            })}

            <div className="absolute top-0 left-0 right-0 h-[12vh] bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            <div className="absolute inset-0 pointer-events-none opacity-20 bg-repeat z-10 mix-blend-overlay"
                style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj48ZmlsdGVyIGlkPSJnoi48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS41IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')` }}>
            </div>
        </div>
    );
};

export default StoryBackground;
