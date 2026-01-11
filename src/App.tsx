import React, { useState, useEffect, useLayoutEffect } from "react";
import StoryBackground from "./components/StoryBackground";
import ProfessionalBackground from "./components/ProfessionalBackground";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import ProjectModal from "./components/modals/ProjectModal";
import CertificateModal from "./components/modals/CertificateModal";
import CreditsModal from "./components/modals/CreditsModal";

const App = () => {
  const [isExpAnimating, setIsExpAnimating] = useState(false);
  const [expYears, setExpYears] = useState(0);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [activeExpProject, setActiveExpProject] = useState<number | null>(null);
  const [theme, setTheme] = useState<'professional' | 'creative'>('professional');

  // Experience Counter Animation Logic
  useEffect(() => {
    if (!isExpAnimating) return;

    const startDate = new Date("2022-03-14");
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    const target = parseFloat(years.toFixed(1));

    const duration = 3500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);

      const current = target * ease;
      setExpYears(parseFloat(current.toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setExpYears(target);
        setIsExpAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [isExpAnimating]);

  // Initial Trigger-useLayoutEffect for immediate scroll
  useLayoutEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Immediate scroll to top when the app mounts
    window.scrollTo(0, 0);
    // Ensure refresh also scrolls to top
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Start experience counter animation
    setIsExpAnimating(true);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Ensure scroll to top after any possible restoration (e.g., on reload)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Body scroll lock when modals are open
  useEffect(() => {
    if (activeCert || activeExpProject || showCreditsPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeCert, activeExpProject, showCreditsPopup]);

  const handleOpenPopup = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowCreditsPopup(true);

    // 1. Wait 3 seconds before starting the event
    setTimeout(() => {
      setIsClosing(true);

      // 2. Animation duration (Shake + Explode + Black Hole) = ~4 seconds
      setTimeout(() => {
        setShowCreditsPopup(false);
        setIsClosing(false);

        // 3. Reset Experience Counter Animation and scroll to top
        setExpYears(0);
        setIsExpAnimating(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 4000);
    }, 3000);
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 font-sans ${theme === 'creative' ? 'bg-black text-white selection:bg-purple-500/30' : 'bg-white text-zinc-900 selection:bg-blue-100'}`}>

      {/* Background Toggle */}
      {theme === 'creative' ? <StoryBackground /> : <ProfessionalBackground />}

      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative z-10">
        {theme === 'professional' && (
          <>
            <Hero theme={theme} expYears={expYears} isExpAnimating={isExpAnimating} />

            <About
              theme={theme}
              expYears={expYears}
              isExpAnimating={isExpAnimating}
              setActiveCert={setActiveCert}
            />

            <Experience
              theme={theme}
              setActiveExpProject={setActiveExpProject}
            />

            <Contact
              theme={theme}
              handleOpenPopup={handleOpenPopup}
            />
          </>
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        activeExpProject={activeExpProject}
        setActiveExpProject={setActiveExpProject}
      />

      <CertificateModal
        link={activeCert}
        onClose={() => setActiveCert(null)}
      />

      <CreditsModal
        showCreditsPopup={showCreditsPopup}
        setShowCreditsPopup={setShowCreditsPopup}
        isClosing={isClosing}
      />

    </div>
  );
};

export default App;
