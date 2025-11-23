import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
} from "lucide-react";

const App = () => {
  const [isExpAnimating, setIsExpAnimating] = useState(false);
  const [expYears, setExpYears] = useState(0);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [activeExpProject, setActiveExpProject] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detailed project information for each experience role
  const experienceProjects = [
    {
      id: 1,
      role: "Senior QA Engineer",
      period: "Aug 2024 – Present",
      projects: [
        {
          name: "TPP (Third Party Provider) Testing",
          description: "Comprehensive testing of Third Party Provider integrations under Open Finance UAE platform.",
          responsibilities: [
            "Designed test cases for account information and payment initiation APIs",
            "Validated OAuth 2.0 authentication flows and consent management",
            "Performed API contract testing using Postman collections",
            "Executed security testing for data encryption and PII handling"
          ],
          tools: ["Postman", "JIRA", "SQL", "Git"]
        },
        {
          name: "PFM (Personal Finance Management) QA",
          description: "End-to-end quality assurance for Personal Finance Management features.",
          responsibilities: [
            "Tested transaction categorization and budget tracking features",
            "Validated data aggregation from multiple financial institutions",
            "Performed cross-browser and mobile app testing",
            "Executed regression testing for new feature releases"
          ],
          tools: ["Playwright", "Appium", "PostgreSQL", "JIRA"]
        },
        {
          name: "CFM (Cash Flow Management) Validation",
          description: "Quality validation for Cash Flow Management and forecasting modules.",
          responsibilities: [
            "Validated cash flow prediction algorithms and reporting",
            "Tested integration with banking APIs for real-time balance updates",
            "Performed data accuracy testing using SQL queries",
            "Coordinated UAT with fintech partners"
          ],
          tools: ["SQL", "Postman", "Excel", "JIRA"]
        }
      ]
    },
    {
      id: 2,
      role: "QA Automation Engineer",
      period: "Dec 2023 – Aug 2024",
      projects: [
        {
          name: "UPI Autopay Automation Framework",
          description: "Built comprehensive automation suite for UPI Autopay mandate lifecycle testing.",
          responsibilities: [
            "Developed 150+ Playwright test cases covering mandate creation, modification, and cancellation",
            "Implemented API testing framework for NPCI integration validation",
            "Created data-driven tests for multiple bank and PSP combinations",
            "Reduced regression testing time by 30-40% per release cycle"
          ],
          tools: ["Playwright", "TypeScript", "Postman", "Git", "Jenkins"]
        },
        {
          name: "NACH-UPI LMS Integration Testing",
          description: "Led integration testing for NACH and UPI mandate solutions with client Loan Management Systems.",
          responsibilities: [
            "Executed integration testing for 8+ NBFCs, banks, and PSPs",
            "Validated end-to-end mandate flows from LMS to NPCI",
            "Performed reconciliation testing between LMS and payment gateway",
            "Identified and reported 25+ critical production issues during UAT"
          ],
          tools: ["Postman", "DBeaver", "JIRA", "SQL"]
        },
        {
          name: "Payment Gateway API Validation",
          description: "Comprehensive API testing for payment gateway integrations.",
          responsibilities: [
            "Validated mandate registration, presentation, and status update APIs",
            "Performed negative testing for error handling scenarios",
            "Tested webhook notifications and callback mechanisms",
            "Created automated API test suites in Postman"
          ],
          tools: ["Postman", "Newman", "Git", "JIRA"]
        }
      ]
    },
    {
      id: 3,
      role: "QA Implementation Engineer",
      period: "Mar 2022 – Dec 2023",
      projects: [
        {
          name: "NACH Mandate Implementation",
          description: "Manual testing and implementation support for NACH mandate solution across multiple banks.",
          responsibilities: [
            "Executed end-to-end testing for 6+ bank implementations",
            "Validated NACH mandate registration, modification, and cancellation flows",
            "Tested file-based processing (NACH input/output files)",
            "Performed data validation using SQL queries on mandate databases"
          ],
          tools: ["SQL", "DBeaver", "Excel", "JIRA", "FileZilla"]
        },
        {
          name: "NACH Collection Testing",
          description: "Testing of NACH collection presentation and response file processing.",
          responsibilities: [
            "Validated debit presentation file generation and processing",
            "Tested collection success/failure scenarios across different banks",
            "Performed reconciliation testing between mandate and collection data",
            "Executed UAT coordination with NBFC clients"
          ],
          tools: ["SQL", "Excel", "Putty", "JIRA"]
        },
        {
          name: "Production Support & Defect Management",
          description: "Production validation and issue resolution for banking clients.",
          responsibilities: [
            "Resolved 40+ critical production defects for NBFCs and banks",
            "Performed root cause analysis using application logs and database queries",
            "Coordinated with development team for hotfix deployments",
            "Maintained test documentation and defect reports"
          ],
          tools: ["JIRA", "SQL", "Putty", "Excel"]
        }
      ]
    }
  ];


  const skills = [
    "Manual Testing",
    "Test Automation",
    "API Testing",
    "Mobile App Testing",
    "SQL & Database Testing",
    "Performance Testing",
    "Agile & Scrum",
    "Defect Management",
  ];

  const creativeSkills = [
    "User Experience (UX) Analysis",
    "Accessibility Testing",
    "Visual Regression Testing",
    "Process Optimization",
  ];

  const aiSkills = [
    "AI-Assisted Test Generation",
    "Prompt Engineering for QA",
    "Automated Visual Validation",
  ];

  const qaTools = [
    "Playwright",
    "Postman",
    "JIRA",
    "Git",
    "Appium",
    "DBeaver",
    "Putty",
    "FileZilla",
  ];

  const databases = [
    "PostgreSQL",
    "MSSQL",
    "Oracle",
    "MySQL",
  ];

  const platforms = [
    "Linux",
    "Windows",
    "Android",
    "iOS",
  ];

  const additionalSkills = [
    "Figma",
    "Canva",
    "Adobe Photoshop",
    "Premiere Pro",
    "VN Editor",
  ];

  const certifications = [
    {
      name: "Introduction to Postman API",
      link: "https://drive.google.com/file/d/1XN-zhYU8UdK5iWv0u9NHeQp8Q8RWnCVv/preview",
    },
    {
      name: "Malware Analysis",
      link: "https://drive.google.com/file/d/1W_bFat7s91p0X9nKdeEcgrmlwNjlM_hz/preview",
    },
  ];

  interface CertificateModalProps {
    link: string | null;
    onClose: () => void;
  }

  const CertificateModal = ({ link, onClose }: CertificateModalProps) => {
    if (!link) return null;

    // ESC key handler
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
      <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <div
          className="bg-white rounded-lg w-[90%] max-w-3xl p-4 relative"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black text-xl hover:text-gray-700 transition-colors z-10"
            aria-label="Close certificate modal"
          >
            ✖
          </button>

          {/* Preview iframe */}
          <iframe
            src={link}
            className="w-full h-[500px] rounded"
            allow="fullscreen"
            title="Certificate preview"
          ></iframe>
        </div>
      </div>
    );
  };

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

  // ESC key handler for Experience Projects Modal
  useEffect(() => {
    if (!activeExpProject) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveExpProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeExpProject]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 200; // More stars for space effect

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Varying star sizes - most small, some medium, few large
        const rand = Math.random();
        if (rand > 0.95) {
          this.size = Math.random() * 2 + 2; // Large stars (2-4px)
        } else if (rand > 0.7) {
          this.size = Math.random() * 1.5 + 1; // Medium stars (1-2.5px)
        } else {
          this.size = Math.random() * 1 + 0.5; // Small stars (0.5-1.5px)
        }

        // Very slow drift for space effect
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;

        // Twinkling effect
        this.baseOpacity = Math.random() * 0.5 + 0.3; // Base 0.3-0.8
        this.opacity = this.baseOpacity;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01; // Twinkle speed
        this.twinklePhase = Math.random() * Math.PI * 2; // Random start phase
      }

      update() {
        // Slow drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Twinkling effect using sine wave
        this.twinklePhase += this.twinkleSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.3;
      }

      draw() {
        if (!ctx) return;

        // Draw star with glow effect for larger stars
        if (this.size > 2) {
          // Add glow for large stars
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Simple dot for small stars
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Comet/Shooting Star class
    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;

      constructor() {
        // Random starting position - can start from top or sides
        if (Math.random() > 0.5) {
          this.x = Math.random() * width;
          this.y = -50;
        } else {
          this.x = -50;
          this.y = Math.random() * height * 0.5; // Top half only
        }
        this.length = Math.random() * 100 + 60; // Tail length 60-160px
        this.speed = Math.random() * 4 + 3; // Speed 3-7 (faster)
        this.opacity = Math.random() * 0.6 + 0.4; // Opacity 0.4-1.0
        this.angle = Math.PI / 4; // 45 degree angle (diagonal)
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
      }

      draw() {
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );

        // Brighter comet head
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.1, `rgba(200, 220, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        // Add bright head glow
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      isOffScreen() {
        return this.x > width + 100 || this.y > height + 100;
      }
    }

    // Nebula Cloud class for ambient space atmosphere
    class Nebula {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 150; // 150-350px (larger)
        this.baseOpacity = Math.random() * 0.07 + 0.05; // More visible 0.05-0.12
        this.opacity = this.baseOpacity;
        this.pulseSpeed = Math.random() * 0.008 + 0.003; // Faster pulse
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * this.baseOpacity * 0.8;
      }

      draw() {
        if (!ctx) return;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        gradient.addColorStop(0, `rgba(100, 150, 255, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(150, 100, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Dark Matter class - subtle dark clouds drifting through space
    class DarkMatter {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speedX: number;
      speedY: number;
      pulseSpeed: number;
      pulsePhase: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 180 + 120; // 120-300px
        this.baseOpacity = Math.random() * 0.15 + 0.1; // 0.1-0.25
        this.opacity = this.baseOpacity;
        this.speedX = (Math.random() - 0.5) * 0.1; // Slow drift
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.pulseSpeed = Math.random() * 0.003 + 0.001;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;

        // Subtle pulse
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * this.baseOpacity * 0.3;
      }

      draw() {
        if (!ctx) return;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        // Dark gradient - creates darker regions
        gradient.addColorStop(0, `rgba(0, 0, 0, ${this.opacity})`);
        gradient.addColorStop(0.6, `rgba(0, 0, 0, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const comets: Comet[] = [];
    const nebulas: Nebula[] = [];
    const darkMatter: DarkMatter[] = [];

    // Create nebula clouds
    for (let i = 0; i < 8; i++) {
      nebulas.push(new Nebula());
    }

    // Create dark matter clouds
    for (let i = 0; i < 6; i++) {
      darkMatter.push(new DarkMatter());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw nebulas first (background layer)
      nebulas.forEach((nebula) => {
        nebula.update();
        nebula.draw();
      });

      // Draw dark matter (creates depth)
      darkMatter.forEach((dm) => {
        dm.update();
        dm.draw();
      });

      // Draw particles (stars)
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw comets (foreground)
      comets.forEach((comet, index) => {
        comet.update();
        comet.draw();

        if (comet.isOffScreen()) {
          comets.splice(index, 1);
        }
      });

      // Spawn new comets more frequently
      if (Math.random() < 0.015) { // 1.5% chance per frame (more frequent)
        comets.push(new Comet());
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Initial Trigger - useLayoutEffect for immediate scroll
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        /* Shatter & Void Animations */
        @keyframes violentShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translate(5px, -5px) rotate(2deg); }
        }

        @keyframes shardExplode {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0.5); opacity: 0; }
        }

        @keyframes voidExpand {
          0% { transform: scale(0); opacity: 0; }
          10% { transform: scale(1); opacity: 1; }
          100% { transform: scale(50); opacity: 1; }
        }

        @keyframes shockwaveExpand {
          0% { transform: scale(0); opacity: 1; border-width: 100px; }
          100% { transform: scale(5); opacity: 0; border-width: 0px; }
        }

        @keyframes flashBang {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes voidPulse {
          0% { transform: scale(1); box-shadow: 0 0 50px rgba(255,255,255,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 80px rgba(255,255,255,0.5); }
          100% { transform: scale(1); box-shadow: 0 0 50px rgba(255,255,255,0.3); }
        }

        .animate-shake {
          animation: violentShake 0.5s linear infinite;
        }

        .animate-shard {
          animation: shardExplode 0.8s ease-out forwards;
        }

        .animate-void {
          animation: voidExpand 4s ease-in forwards;
          animation-delay: 0.6s;
        }

        .animate-shockwave {
          animation: shockwaveExpand 0.8s ease-out forwards;
          animation-delay: 0.5s;
        }

        .animate-flash {
          animation: flashBang 0.3s ease-out forwards;
          animation-delay: 0.5s;
        }

        .animate-pulse {
          animation: voidPulse 4s ease-in-out infinite;
        }

        /* General Animations */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .hero-font {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .nav-link {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
        }
      `}</style>

      {/* Particle background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-white font-bold text-xl tracking-tighter">
          SR
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="nav-link text-gray-300 hover:text-white transition-colors">ABOUT</a>
          <a href="#experience" className="nav-link text-gray-300 hover:text-white transition-colors">EXPERIENCE</a>
          <a href="#contact" className="nav-link text-gray-300 hover:text-white transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-8 pt-24 relative z-10"
      >
        <div className="max-w-5xl w-full">
          <p className="animate-fade-up text-gray-400 text-[11px] tracking-[0.32em] uppercase mb-4">
            Software Quality Engineer · Test Automation · Web & Mobile QA
          </p>

          <h1
            className="animate-fade-up hero-font text-4xl sm:text-[9vw] md:text-[6.5vw] lg:text-[5.5rem] leading-[1.05]"
            style={{
              letterSpacing: "0.08em",
              animationDelay: "0.1s"
            }}
          >
            SUGEETH RAJ V M
          </h1>

          <h2 className="animate-fade-up hero-font text-3xl md:text-5xl lg:text-[1.9rem] font-light leading-[1.15] mt-6 text-gray-200" style={{ animationDelay: "0.2s" }}>
            Reliable Test Journeys
            <br className="hidden md:block" />
            Built with Precision
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
            QA Engineer with <span className={`transition-all duration-500 ${isExpAnimating ? 'font-bold text-white text-2xl' : 'font-normal text-gray-400'}`}>{expYears}</span> years of experience in web, mobile, and API testing, mainly in fintech and payments. Skilled in test planning, functional and regression testing, API testing, and using tools like Playwright, Postman, and SQL to keep releases stable.
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
                rel="noreferrer"
                className="nav-link flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-xs"
                aria-label={`Visit my ${social.label}`}
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
            <div className="flex items-center gap-2 px-4 py-2 border border-green-500/30 bg-green-500/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 tracking-wide">Open to Opportunities</span>
            </div>

            <a
              href="https://drive.google.com/uc?export=download&id=1ang5LLGQcrCrUX657eDSydOcpeDlv6E2"
              download="Sugeeth_Raj_VM_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border border-blue-500 bg-blue-500/30 hover:bg-blue-500 hover:text-white transition-all duration-300"
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
            <span className="text-xs text-gray-500 tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </div>
        </div>
      </section>

      <section id="about" className="flex items-center px-6 md:px-8 py-12 md:py-20 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">About</p>
          <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
            Building Quality into Every Product
          </h2>

          <div className="space-y-6 mb-8">
            <p className="text-gray-400 text-lg leading-relaxed">
              I focus on ensuring reliable, well-tested products through careful test planning,
              functional and regression testing, and close collaboration with product and
              engineering teams across various industries.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              My experience spans web applications, mobile apps, payment systems, and API validation.
              I design test strategies that protect core flows while catching edge cases early in
              the development cycle.
            </p>
          </div>

          <div className="mb-10">
            <p className="text-gray-500 text-base tracking-[0.3em] uppercase mb-4">
              Location · Experience
            </p>
            <p className="text-gray-300 text-lg">
              Bengaluru, India · <span className={`transition-all duration-500 ${isExpAnimating ? "font-bold text-white text-2xl" : "font-medium text-white"}`}>{expYears}</span> years in QA
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              QA & Technical Skills
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-green-800/50 bg-green-500/10 hover:border-green-600 transition-colors duration-300 text-sm text-green-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Creative & Design Skills
            </p>
            <div className="flex flex-wrap gap-3">
              {creativeSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-blue-800/50 bg-blue-500/10 hover:border-blue-600 transition-colors duration-300 text-sm text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              AI & Vibe Coding
            </p>
            <div className="flex flex-wrap gap-3">
              {aiSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-cyan-800/50 bg-cyan-500/10 hover:border-cyan-600 transition-colors duration-300 text-sm text-cyan-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              QA & Automation Tools
            </p>
            <div className="flex flex-wrap gap-3">
              {qaTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-purple-800/50 bg-purple-500/10 hover:border-purple-600 transition-colors duration-300 text-sm text-purple-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Databases
            </p>
            <div className="flex flex-wrap gap-3">
              {databases.map((db, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-blue-800/50 bg-blue-500/10 hover:border-blue-600 transition-colors duration-300 text-sm text-blue-200"
                >
                  {db}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Platforms
            </p>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-cyan-800/50 bg-cyan-500/10 hover:border-cyan-600 transition-colors duration-300 text-sm text-cyan-200"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Additional Skills
            </p>
            <div className="flex flex-wrap gap-3">
              {additionalSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 border border-gray-800/50 bg-gray-500/10 hover:border-gray-600 transition-colors duration-300 text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Certifications
            </p>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCert(cert.link)}
                  className="group flex items-center gap-2 px-5 py-2 border border-amber-800/50 bg-amber-500/10 hover:border-amber-600 hover:bg-amber-500/20 transition-all duration-300 text-sm text-amber-200 cursor-pointer"
                >
                  <Award className="w-4 h-4 group-hover:text-amber-100 transition-colors" />
                  <span>{cert.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="min-h-0 md:min-h-screen px-6 md:px-8 py-8 md:py-16 bg-gradient-to-b from-black to-zinc-950 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">
            Professional Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-12">Experience</h2>

          {/* Visual Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

            <div className="space-y-12">
              {/* Sr. QA + BA – Open Finance */}
              <div className="relative pl-8 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 top-2 w-4 h-4 -ml-[7px] bg-white rounded-full border-4 border-black"></div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-zinc-700 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-xl font-light text-white mb-1">
                        Senior QA Engineer
                      </h3>
                      <p className="text-gray-400 text-sm font-medium">Open Finance – UAE</p>
                    </div>
                    <span className="text-sm text-gray-400 md:text-right whitespace-nowrap">
                      Aug 2024 – Present
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4">Paycorp.io · Bengaluru</p>

                  <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Designed and executed test plans for TPP, PFM, and CFM modules under the Open Finance platform, covering functional, API, and integration testing.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Validated API contracts and data flows using Postman and SQL, ensuring compliance with Open Banking standards.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Collaborated with engineering and product teams to identify edge cases and ensure high-quality delivery across SIT, UAT, and production environments.</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setActiveExpProject(1)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500 transition-all duration-300 text-sm text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Projects</span>
                  </button>
                </div>
              </div>

              {/* QA Automation Engineer / QA Lead – UPI Autopay (eNACH) */}
              <div className="relative pl-8 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 top-2 w-4 h-4 -ml-[7px] bg-white rounded-full border-4 border-black"></div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-zinc-700 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-xl font-light text-white mb-1">
                        QA Automation Engineer
                      </h3>
                      <p className="text-gray-400 text-sm font-medium">eNACH & UPI Autopay</p>
                    </div>
                    <span className="text-sm text-gray-400 md:text-right whitespace-nowrap">
                      Dec 2023 – Aug 2024
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4">Paycorp.io · Bengaluru</p>

                  <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Built and maintained 150+ Playwright test cases for UPI Autopay journeys, reducing manual regression time by 30–40% per release.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Led QA for integrations with 8+ NBFCs, banks, and PSPs, executing API testing, data validation, and end-to-end mandate lifecycle testing.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Validated end-to-end flows across LMS/core systems, APIs, reconciliation, and mandate lifecycle, catching 25+ critical production issues pre-release.</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setActiveExpProject(2)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 text-sm text-purple-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Projects</span>
                  </button>
                </div>
              </div>

              {/* QA Implementation & Support – NACH */}
              <div className="relative pl-8 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 top-2 w-4 h-4 -ml-[7px] bg-white rounded-full border-4 border-black"></div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-zinc-700 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-xl font-light text-white mb-1">
                        QA Implementation Engineer
                      </h3>
                      <p className="text-gray-400 text-sm font-medium">NACH Mandates</p>
                    </div>
                    <span className="text-sm text-gray-400 md:text-right whitespace-nowrap">
                      Mar 2022 – Dec 2023
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4">Paycorp.io · Bengaluru</p>

                  <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Executed NACH mandate and collection testing for 6+ banks, covering end-to-end mandate lifecycle and file processing across SIT/UAT/Production.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Performed UAT coordination and production validation testing, resolving 40+ critical defects for NBFCs and banking clients.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">▹</span>
                      <span>Validated mandate registration, presentation, and collection flows using SQL queries and API testing, ensuring data accuracy across environments.</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setActiveExpProject(3)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all duration-300 text-sm text-green-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Projects</span>
                  </button>
                </div>
              </div>
            </div>
          </div>



        </div>
      </section>



      <section id="contact" className="min-h-0 md:min-h-screen flex items-center justify-center px-6 md:px-8 py-12 md:py-24 relative z-10">
        <div className="max-w-4xl w-full text-center">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-8">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-12 leading-tight">
            Let&apos;s build reliable products together
          </h2>

          <a
            href="mailto:sugeethraj99@gmail.com?subject=Opportunity%20for%20Software%20Quality%20Engineer"
            className="group inline-flex items-center gap-4 px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500"
          >
            <span className="text-lg">Start a conversation</span>
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </a>

          <div className="mt-24 text-gray-600 text-sm flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPopup}
              className="hover:text-gray-400 transition-colors cursor-pointer"
            >
              © {new Date().getFullYear()} Sugeeth Raj V M. All rights reserved.
            </button>
          </div>
        </div>
      </section>

      {/* Credits Popup Modal - Pure Black Minimalist with Black Hole Exit */}
      {showCreditsPopup && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
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
                    } as React.CSSProperties}
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
            className={`relative bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-10 max-w-md mx-4 shadow-2xl overflow-hidden ${isClosing ? "animate-shake opacity-0 transition-opacity duration-0 delay-500" : "animate-scaleIn"}`}
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
      )}

      {/* Certificate Modal */}
      <CertificateModal
        link={activeCert}
        onClose={() => setActiveCert(null)}
      />

      {/* Experience Projects Modal */}
      {activeExpProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setActiveExpProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exp-modal-title"
        >
          <div
            className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 p-6 flex justify-between items-start z-10">
              <div>
                <h3 id="exp-modal-title" className="text-2xl font-light text-white mb-2">
                  {experienceProjects.find(exp => exp.id === activeExpProject)?.role}
                </h3>
                <p className="text-sm text-gray-400">
                  {experienceProjects.find(exp => exp.id === activeExpProject)?.period}
                </p>
              </div>
              <button
                onClick={() => setActiveExpProject(null)}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close projects modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {experienceProjects.find(exp => exp.id === activeExpProject)?.projects.map((project, idx) => (
                <div key={idx} className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                  {/* Project Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-medium text-white">{project.name}</h4>
                      <span className="text-xs text-gray-500 bg-zinc-900 px-3 py-1 rounded-full">
                        Project {idx + 1}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Key Responsibilities</p>
                    <ul className="space-y-2">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400">
                          <span className="text-blue-500 mr-2 mt-1">▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Used */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Tools & Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800 p-6">
              <button
                onClick={() => setActiveExpProject(null)}
                className="w-full px-6 py-3 border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300 text-sm text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
