import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { defaultConfig, loadConfig } from "./siteConfig";
import type { SiteConfig } from "./siteConfig";

// Cursor trail config
const TRAIL_LIFETIME = 250; // ms – how fast particles fade
const MAX_TRAIL = 25; // max particles kept

const App: React.FC = () => {
  // Cursor / visual states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "native">("default");
  const [clickPulse, setClickPulse] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; time: number }[]>([]);

  // Content / UI states
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  // Refs for motion
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Smooth scroll helper for navbar
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Load config from localStorage
  useEffect(() => {
    try {
      const stored = loadConfig();
      setConfig(stored);
    } catch {
      setConfig(defaultConfig);
    }
  }, []);

  // Cursor position + trail tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { x: lastX, y: lastY } = lastPosRef.current;

      const dx = Math.abs(clientX - lastX);
      const dy = Math.abs(clientY - lastY);

      // Only add a trail point when there's real movement
      if (dx > 1 || dy > 1) {
        setTrail((prev) => {
          const now = Date.now();
          const next = [...prev, { x: clientX, y: clientY, time: now }];
          return next.slice(-MAX_TRAIL);
        });
        lastPosRef.current = { x: clientX, y: clientY };
      }

      const pos = { x: clientX, y: clientY };
      setMousePos(pos);
      mouseRef.current = pos;
    };

    const handleMouseDown = () => {
      setClickPulse(true);
      setTimeout(() => setClickPulse(false), 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Blob lag animation
  useEffect(() => {
    let bx = mouseRef.current.x;
    let by = mouseRef.current.y;

    const animate = () => {
      const lerpFactor = 0.12;
      bx += (mouseRef.current.x - bx) * lerpFactor;
      by += (mouseRef.current.y - by) * lerpFactor;
      setBlobPos({ x: bx, y: by });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current.current) {
        cancelAnimationFrame(animationRef.current.current);
      }
    };
  }, []);

  // Trail cleanup – fade out and vanish
  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.time < TRAIL_LIFETIME));
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "UPI & NACH Implementation Testing",
      category: "Fintech · Payments · QA Automation",
      year: "2024",
      description:
        "Led functional and regression testing for UPI & NACH implementations integrated with core banking solutions.",
      tags: ["Playwright", "API Testing", "UPI", "NACH"],
      image: "bg-gradient-to-br from-indigo-600 to-sky-500",
    },
    {
      id: 2,
      title: "Mobile Banking App QA",
      category: "Mobile QA · Flutter · SDK Testing",
      year: "2023",
      description:
        "End-to-end testing of mobile banking flows: onboarding, payments, statements, and notifications.",
      tags: ["Flutter", "Mobile QA", "Android", "iOS"],
      image: "bg-gradient-to-br from-purple-600 to-pink-500",
    },
    {
      id: 3,
      title: "API & Integration Testing Suite",
      category: "Backend QA · API Validation",
      year: "2023",
      description:
        "Designed API test suites for transaction processing, reconciliations, and error handling scenarios.",
      tags: ["Postman", "Cypress", "SQL"],
      image: "bg-gradient-to-br from-emerald-600 to-teal-500",
    },
    {
      id: 4,
      title: "Fintech Implementation Support",
      category: "QA + BA · Implementation",
      year: "2022",
      description:
        "Supported end-to-end fintech implementations, validating integrations between CBS and payment systems.",
      tags: ["Implementation", "Stakeholder Comms", "Defect Analysis"],
      image: "bg-gradient-to-br from-orange-600 to-amber-500",
    },
  ];

  const skills = config.skillsCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const certificates = [
    {
      title: "Postman API Fundamentals (Sample)",
      description:
        "Hands-on with collections, environments, and assertions for REST API testing. Real certificate uploads coming soon.",
      tags: ["API Testing", "Collections", "Assertions"],
    },
    {
      title: "Playwright Test Automation (Sample)",
      description:
        "Sample suites for UI flows, selectors, waits, and screenshots. Production case studies will be added here.",
      tags: ["Playwright", "JavaScript", "UI Automation"],
    },
  ];

  const caseStudies = [
    {
      title: "UPI Regression Suite (Sample)",
      description:
        "Designed UPI test scenarios including registration, payments, reversals, and negative cases (timeouts, invalid VPA).",
      tags: ["UPI", "Regression", "Test Design"],
    },
    {
      title: "Mobile Banking QA (Sample)",
      description:
        "Validated login, onboarding, account overview, and transaction flows on Android and iOS builds.",
      tags: ["Mobile QA", "Flutter", "UX Feedback"],
    },
  ];

  const isNativeCursor = cursorVariant === "native";
  const isHover = cursorVariant === "hover";

  // ---------- CURSOR RENDER ----------
  const renderHybridCursor = () => {
    if (isNativeCursor) return null;

    const blobSize = isHover ? 90 : 55;
    const lineSize = isHover ? 42 : 28;
    const dotScale = clickPulse ? 0.8 : 1;

    return (
      <>
        {/* TRAIL PARTICLES (neon, vanish fast, only when moving) */}
        {trail.map((p, i) => {
          const age = Date.now() - p.time;
          const t = age / TRAIL_LIFETIME;
          if (t >= 1) return null;

          const opacity = 1 - t;
          const size = 34 - t * 22; // big to smaller
          const spread = 80; // radius around the cursor

          const jitterX = (Math.random() - 0.5) * spread;
          const jitterY = (Math.random() - 0.5) * spread;

          return (
            <div
              key={i}
              style={{
                position: "fixed",
                left: p.x + jitterX,
                top: p.y + jitterY,
                width: size,
                height: size,
                borderRadius: "999px",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                opacity,
                background: "cyan",
                filter: "blur(14px)",
                boxShadow: "0 0 26px cyan, 0 0 60px rgba(0,255,255,1)",
                zIndex: 40,
              }}
            />
          );
        })}

        {/* LIQUID NEON BLOB */}
        <div
          style={{
            position: "fixed",
            left: blobPos.x,
            top: blobPos.y,
            width: blobSize,
            height: blobSize,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 45,
            filter: `blur(${isHover ? 42 : 32}px)`,
            opacity: isHover ? 1 : 0.75,
            transition: "width .15s ease, height .15s ease, filter .2s ease",
            mixBlendMode: "screen",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, cyan, transparent 65%), radial-gradient(circle at 70% 70%, #00faff, transparent 65%)",
              animation: "blob-morph 14s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* BOLD NEON CROSSHAIR */}
        <div
          style={{
            position: "fixed",
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 60,
          }}
        >
          {/* Horizontal line */}
          <div
            style={{
              position: "absolute",
              width: lineSize,
              height: 3,
              background: "white",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 24px cyan, 0 0 50px rgba(0,255,255,1), 0 0 90px rgba(0,255,255,1)",
              transition: "width .15s ease",
            }}
          />
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              width: 3,
              height: lineSize,
              background: "white",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 24px cyan, 0 0 50px rgba(0,255,255,1), 0 0 90px rgba(0,255,255,1)",
              transition: "height .15s ease",
            }}
          />
          {/* Center dot */}
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "999px",
              background: "white",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${dotScale})`,
              boxShadow: "0 0 22px cyan, 0 0 50px rgba(0,255,255,1)",
              transition: "transform .1s ease",
            }}
          />
        </div>
      </>
    );
  };

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ cursor: isNativeCursor ? "auto" : "none" }}
    >
      {/* Keyframes for blob animation */}
      <style>{`
        @keyframes blob-morph {
          0% {
            border-radius: 60% 40% 65% 35% / 40% 60% 35% 65%;
            transform: scale(1);
          }
          50% {
            border-radius: 40% 60% 35% 65% / 60% 40% 65% 35%;
            transform: scale(1.08);
          }
          100% {
            border-radius: 55% 45% 60% 40% / 45% 55% 40% 60%;
            transform: scale(1.03);
          }
        }
      `}</style>

      {renderHybridCursor()}

      {/* Top Navigation – Immersed */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[10px]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Name */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => scrollToSection("hero")}
          >
            <div className="flex flex-col leading-tight">
              <span className="text-xs tracking-[0.22em] uppercase text-gray-200">
                Sugeeth Raj V M
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-[0.24em]">
                QA · BA · Fintech · Automation
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "certificates", label: "Certificates" },
              { id: "work", label: "Work" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="nav-link text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-8 pt-24 relative"
      >
        <div className="max-w-5xl w-full">
          <p className="fade-up text-gray-400 text-[11px] tracking-[0.32em] uppercase mb-4">
            Software Quality Engineer · Fintech Automation
          </p>

          <h1
            className="
              fade-up-delay-1
              hero-font
              text-[9vw]
              md:text-[6.5vw]
              lg:text-[5.5rem]
              whitespace-nowrap
              leading-[1.05]
              tracking-[0.15em]
            "
          >
            SUGEETH RAJ V M
          </h1>

          <h2
            className="
              fade-up-delay-2
              hero-font 
              text-3xl 
              md:text-5xl 
              lg:text-[1.9rem]
              font-light 
              leading-[1.15]
              mt-6
              text-gray-200
            "
          >
            Reliable Test Journeys
            <br className="hidden md:block" />
            Built with Precision
          </h2>

          <p
            className="
              fade-up-delay-2 
              text-gray-400 
              text-lg 
              md:text-xl 
              max-w-2xl 
              font-light 
              mt-6
              leading-relaxed
            "
          >
            Ensuring stable UPI, NACH, and Mobile banking experiences with a balanced approach of
            real-world testing, Automation expertise, and Implementation awareness.
          </p>

          <div className="fade-up-delay-2 flex flex-wrap gap-6 pt-10">
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
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="
                  nav-link
                  flex items-center gap-2  
                  text-gray-400 
                  hover:text-white 
                  transition-colors 
                  duration-300 
                  text-xs
                "
              >
                {social.icon}
                <span className="tracking-[0.22em] uppercase text-[11px]">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-gray-500 tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center px-8 py-24">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">About</p>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              {config.aboutHeading}
            </h2>
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              Location · Experience
            </p>
            <p className="text-gray-400 text-sm">{config.aboutLocation}</p>
          </div>
          <div className="space-y-8">
            <p className="text-gray-400 text-lg leading-relaxed">{config.aboutP1}</p>
            <p className="text-gray-400 text-lg leading-relaxed">{config.aboutP2}</p>

            <div className="pt-8">
              <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    className="px-5 py-2 border border-gray-800 hover:border-gray-600 transition-colors duration-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE – native cursor zone */}
      <section
        id="experience"
        className="min-h-screen px-8 py-24 bg-gradient-to-b from-black to-zinc-950"
        onMouseEnter={() => setCursorVariant("native")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">
            Professional Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-12">Experience</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT COLUMN – ROLES / PROMOTIONS */}
            <div className="space-y-10">
              {/* BA & QA Lead – OpenFinance / PFM (UAE) */}
              <div className="border-t border-gray-900 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-light">
                    BA &amp; QA Lead – OpenFinance &amp; PFM (UAE)
                  </h3>
                  <span className="text-xs text-gray-500">2024 – Present</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">
                  Paycorp.io · Bengaluru / Remote – UAE
                </p>
                <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                  <li>
                    • Lead <span className="text-gray-200">Business Analysis and Quality</span> for an
                    OpenFinance product for UAE – B2C product, personal finance management (PFM),
                    P2P payments, and digital banking journeys.
                  </li>
                  <li>
                    • Own requirements, user journeys, and API contracts across onboarding,
                    account aggregation, spend analytics, budgeting, and P2P flows.
                  </li>
                  <li>
                    • Define and execute QA strategy across mobile apps, APIs, and backend
                    services – covering functional, regression, integration, and UAT.
                  </li>
                  <li>
                    • Use Playwright + API automation to protect core journeys and keep regression
                    cycles fast and stable.
                  </li>
                  <li>
                    • Work directly with UAE stakeholders, designers, and engineering teams to
                    align business goals with implementation reality.
                  </li>
                </ul>
              </div>

              {/* Software Quality Assurance Engineer */}
              <div className="border-t border-gray-900 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-light">Software Quality Assurance Engineer</h3>
                  <span className="text-xs text-gray-500">Dec 2023 – Present</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Paycorp.io · Bengaluru</p>
                <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                  <li>
                    • Lead manual &amp; automated testing for UPI and NACH solutions integrated
                    with core banking for multiple banks.
                  </li>
                  <li>
                    • Design test strategies, cases, and coverage for web, mobile, and backend
                    flows.
                  </li>
                  <li>
                    • Implement Playwright-based automation to reduce regression effort and catch
                    defects earlier in the cycle.
                  </li>
                  <li>
                    • Perform mobile app &amp; SDK testing across Android/iOS and hybrid stacks.
                  </li>
                  <li>
                    • Use AI-based tools to improve test design, defect clustering, and impact
                    analysis.
                  </li>
                </ul>
              </div>

              {/* QA Implementation Engineer */}
              <div className="border-t border-gray-900 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-light">QA Implementation Engineer</h3>
                  <span className="text-xs text-gray-500">Mar 2022 – Nov 2023</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Paycorp.io · Bengaluru</p>
                <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                  <li>
                    • Supported NACH and payment implementations tightly integrated with core
                    banking systems.
                  </li>
                  <li>
                    • Performed integration testing across services, ensuring smooth end-to-end
                    customer and back-office journeys.
                  </li>
                  <li>
                    • Coordinated deployments, environment changes, and configuration updates to
                    minimise downtime and production risk.
                  </li>
                  <li>
                    • Worked closely with client teams during UAT and go-live, acting as a key QA
                    contact.
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-10">
              <div className="border-t border-gray-900 pt-6">
                <h3 className="text-xl font-light mb-2">How I Work as BA &amp; QA</h3>
                <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                  <li>
                    • Grew from{" "}
                    <span className="text-gray-200">
                      QA Implementation → SQA Engineer → BA &amp; QA Lead
                    </span>
                    , taking more ownership at each stage.
                  </li>
                  <li>
                    • Start from real user and business outcomes, then translate them into flows,
                    requirements, and test design.
                  </li>
                  <li>
                    • Balance exploratory testing, structured test cases, and automation so speed
                    and quality stay in sync.
                  </li>
                  <li>
                    • Write clear, impact-focused defects with evidence (logs, videos, data) so
                    teams can act quickly.
                  </li>
                  <li>
                    • Pay special attention to edge cases in payments, PFM logic, data accuracy,
                    and reconciliation.
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-900 pt-6">
                <h3 className="text-xl font-light mb-2">Education</h3>
                <p className="text-gray-200 text-sm">
                  Bachelor of Computer Applications (Information Technology)
                </p>
                <p className="text-gray-500 text-sm">Bharathiar University · 2018 – 2021</p>

                <div className="mt-6">
                  <p className="text-gray-500 text-xs uppercase tracking-[0.25em] mb-2">
                    Soft Skills
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Bridge between business, product, and engineering teams.</li>
                    <li>
                      • Strong problem-solving and debugging mindset for complex fintech flows.
                    </li>
                    <li>• Ownership of quality from requirement stage to production sign-off.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen px-8 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-light">Featured QA Projects</h2>
          </div>

          <div className="space-y-1">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setCursorVariant("hover");
                  setActiveProject(project.id);
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setActiveProject(null);
                }}
                className="group border-t border-gray-900 hover:bg-white/5 transition-colors duration-500"
              >
                <div className="py-8 grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                    <span className="text-gray-600 text-sm">0{idx + 1}</span>
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{project.category}</p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors duration-300">
                      <span className="text-sm">View details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {activeProject === project.id && (
                  <div className="pb-8 overflow-hidden">
                    <div className="h-64 rounded-lg relative overflow-hidden">
                      <div className={`absolute inset-0 ${project.image} opacity-80`} />
                      <div className="absolute inset-0 flex flex-wrap gap-2 items-end p-6">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-black/50 backdrop-blur-sm text-xs border border-white/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="min-h-[70vh] px-8 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-10">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">
              Certificates
            </p>
            <h2 className="text-4xl md:text-5xl font-light">
              Certifications & Learning
            </h2>
            <p className="text-gray-500 text-sm mt-4">
              Real certificates and verifiable links will be added here soon. For now, these
              represent sample areas I’m actively strengthening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="border border-gray-900 hover:border-gray-700 bg-white/5 hover:bg-white/10 transition-colors duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-light mb-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-gray-700 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-xs mt-6">
            Coming soon: actual certificates with proof links and detailed notes on what was
            covered and how it’s applied in real projects.
          </p>
        </div>
      </section>

      {/* WORK / CASE STUDIES */}
      <section id="work" className="min-h-[70vh] px-8 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-10">
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6">Work</p>
            <h2 className="text-4xl md:text-5xl font-light">Sample Case Studies</h2>
            <p className="text-gray-500 text-sm mt-4">
              These are placeholders for future detailed write-ups. They reflect the kind of QA
              stories I’ll document here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="border border-gray-900 hover:border-gray-700 bg-gradient-to-br from-zinc-950 to-zinc-900 hover:from-zinc-900 hover:to-black transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-light mb-2">{cs.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {cs.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cs.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-gray-700 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-xs mt-6">
            Future updates: step-by-step breakdowns of problems, test strategy, execution, defects
            found, and outcomes.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-4xl w-full text-center">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-8">
            Get In Touch
          </p>
          <h2
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-12 leading-tight"
          >
            Let&apos;s build reliable fintech products together
          </h2>

          <a
            href={`mailto:${config.email}?subject=Opportunity%20for%20Software%20Quality%20Engineer`}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="group inline-flex items-center gap-4 px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500"
          >
            <span className="text-lg">Start a conversation</span>
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </a>

          <div className="mt-24 text-gray-600 text-sm flex flex-col items-center gap-2">
            <p>© {new Date().getFullYear()} Sugeeth Raj V M. All rights reserved.</p>

            {/* <button
              onClick={() => (window.location.href = "/admin-login")}
              className="text-xs text-gray-500 hover:text-white transition-colors duration-200 underline underline-offset-4"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Admin Login
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
