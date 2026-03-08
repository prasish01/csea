import { useRef, useEffect, useState, useLayoutEffect } from "react";
import ImageCarousel from "../components/Imagecarousel";
import { projects as projectsData } from "../constants/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/project.css";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Coming Soon placeholder pool
───────────────────────────────────────────────────────── */
const COMING_SOON_POOL = [
  {
    id: "cs-1",
    title: "Project Incoming",
    shortDesc:
      "Something exciting is being built by the team. Check back soon.",
  },
  {
    id: "cs-2",
    title: "Under Construction",
    shortDesc: "Our next project is in early planning. Watch this space.",
  },
  {
    id: "cs-3",
    title: "Coming Soon",
    shortDesc:
      "Got an idea? Pitch it to the club — it could be our next build.",
  },
];

// Always append a full row of coming soon cards after real projects
const filledProjects = [
  // ...projectsData, --- THIS IS INTENTIONAL, ADD IT AFTER MAKING PROJECTS ---
  ...COMING_SOON_POOL.map((p) => ({ ...p, isComingSoon: true })),
];

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
const SplitWords = ({ text, accent = false }) => (
  <span className={`pr-split-line${accent ? " pr-heading-accent" : ""}`}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="pr-word-clip">
        <span className="pr-word-inner">{word}</span>
      </span>
    ))}
  </span>
);

const TechChip = ({ label }) => <span className="pr-tech-chip">{label}</span>;
const Pill = ({ children }) => <span className="pr-pill">{children}</span>;

/* ─────────────────────────────────────────────────────────
   3D Tilt helpers
───────────────────────────────────────────────────────── */
const applyTilt = (el, e) => {
  const rect = el.getBoundingClientRect();
  const rotateX =
    ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
  const rotateY =
    ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
  gsap.to(el, {
    rotateX,
    rotateY,
    transformPerspective: 1000,
    ease: "power2.out",
    duration: 0.4,
  });
};

const resetTilt = (el) =>
  gsap.to(el, {
    rotateX: 0,
    rotateY: 0,
    ease: "elastic.out(1, 0.4)",
    duration: 0.8,
  });

/* ─────────────────────────────────────────────────────────
   Coming Soon Card
───────────────────────────────────────────────────────── */
const ComingSoonCard = ({ project, index, cardRef }) => (
  <article
    ref={cardRef}
    className="pr-card pr-card-soon"
    onMouseMove={(e) => applyTilt(e.currentTarget, e)}
    onMouseLeave={(e) => resetTilt(e.currentTarget)}
  >
    {/* Placeholder image area */}
    <div className="pr-card-img-wrap pr-soon-img">
      <div className="pr-soon-grid" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="pr-soon-grid-line"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
      <div className="pr-soon-orb" aria-hidden="true" />
      <span className="pr-card-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="pr-soon-badge">
        <span className="pr-soon-badge-dot" />
        Coming Soon
      </span>
    </div>

    <div className="pr-card-body">
      <h3 className="pr-card-title pr-serif">{project.title}</h3>
      <p className="pr-card-desc">{project.shortDesc}</p>
      <div className="pr-tech-row">
        <span className="pr-tech-chip pr-tech-chip-soon">TBD</span>
      </div>
    </div>

    <div className="pr-card-footer">
      <span className="pr-card-footer-label" style={{ opacity: 0.35 }}>
        In development
      </span>
      <span
        className="pr-card-footer-arrow"
        style={{ opacity: 0.25 }}
        aria-hidden="true"
      >
        ···
      </span>
    </div>
  </article>
);

/* ─────────────────────────────────────────────────────────
   Project Card
───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, cardRef, onClick, isLive }) => (
  <article
    ref={cardRef}
    className="pr-card"
    onClick={onClick}
    onMouseMove={(e) => applyTilt(e.currentTarget, e)}
    onMouseLeave={(e) => resetTilt(e.currentTarget)}
  >
    <div className="pr-card-img-wrap" onClick={(e) => e.stopPropagation()}>
      <ImageCarousel images={project.images} alt={project.title} />
      {isLive && (
        <span className="pr-card-live">
          <span className="pr-live-dot" />
          live
        </span>
      )}
      <span className="pr-card-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <div className="pr-card-body">
      <h3 className="pr-card-title pr-serif">{project.title}</h3>
      <p className="pr-card-desc">{project.shortDesc}</p>
      <div className="pr-tech-row">
        {project.techStack.slice(0, 3).map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
        {project.techStack.length > 3 && (
          <TechChip label={`+${project.techStack.length - 3}`} />
        )}
      </div>
    </div>

    <div className="pr-card-footer">
      <span className="pr-card-footer-label">View project</span>
      <span className="pr-card-footer-arrow" aria-hidden="true">
        →
      </span>
    </div>
  </article>
);

/* ─────────────────────────────────────────────────────────
   Project Modal
───────────────────────────────────────────────────────── */
const ProjectModal = ({ project, index, overlayRef, modalRef, onClose }) => (
  <div
    ref={overlayRef}
    className="pr-modal-overlay"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={project.title}
  >
    <div
      ref={modalRef}
      className="pr-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pr-modal-img-col">
        <ImageCarousel images={project.images} alt={project.title} />
        <button
          onClick={onClose}
          className="pr-modal-close"
          aria-label="Close project modal"
        >
          ×
        </button>
      </div>
      <div className="pr-modal-content">
        <p className="pr-modal-number pr-mono">
          Project {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="pr-modal-title pr-serif">{project.title}</h3>
        <p className="pr-modal-overview">{project.overview}</p>
        <hr className="pr-modal-divider" />
        <p className="pr-modal-sub-label">Key Features</p>
        <ul className="pr-modal-features">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="pr-modal-sub-label">Highlights</p>
        <div className="pr-pill-row">
          {project.highlights.map((h) => (
            <Pill key={h}>{h}</Pill>
          ))}
        </div>
        <p className="pr-modal-sub-label">Tech Stack</p>
        <div className="pr-tech-row" style={{ marginBottom: 0 }}>
          {project.techStack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   Ticker
───────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Open Source",
  "Student Built",
  "Real Projects",
  "React",
  "Node.js",
  "TypeScript",
  "Full Stack",
  "Club Projects",
  "AUT CSEA",
];

/* ─────────────────────────────────────────────────────────
   Main Projects Section
───────────────────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const featuredParallaxRef = useRef(null);
  const viewBtnRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);
  const activeIndex = projectsData.findIndex((p) => p.id === activeProject?.id);
  const featured = projectsData[0];

  // ── Cursor glow ──────────────────────────────────────
  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;
    const move = (e) =>
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── GSAP animations ──────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".pr-word-inner", {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        y: "0%",
        duration: 0.9,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.to(".pr-label-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".pr-desc-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.to(".pr-line-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        scaleX: 1,
        duration: 1.0,
        ease: "expo.out",
        delay: 0.4,
      });
      gsap.to(".pr-code-deco", {
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.6,
      });
      document.querySelectorAll(".pr-stat-item").forEach((el, i) => {
        gsap.to(el, {
          scrollTrigger: { trigger: ".pr-stats-bar", start: "top 90%" },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.07,
        });
      });
      gsap.to(featuredRef.current, {
        scrollTrigger: { trigger: featuredRef.current, start: "top 82%" },
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.to(featuredParallaxRef.current, {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
        y: -40,
        ease: "none",
      });
      gsap.from(viewBtnRef.current, {
        scrollTrigger: { trigger: viewBtnRef.current, start: "top 92%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        delay: 0.4,
      });
      gsap.to(".pr-grid-label-anim", {
        scrollTrigger: { trigger: ".pr-grid-header", start: "top 90%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Modal ────────────────────────────────────────────
  useEffect(() => {
    if (!activeProject) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(modalRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "back.out(1.4)",
    });
  }, [activeProject]);

  const handleModalClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setActiveProject(null),
    });
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeProject]);

  // ── Magnetic button ───────────────────────────────────
  const handleBtnMove = (e) => {
    const btn = viewBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleBtnLeave = () =>
    gsap.to(viewBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

  const doubledTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const codeSnippet = `const project = {\n  team: "AUTCSEA",\n  stack: ["React", "Node"],\n  year: 2025,\n  status: "building"\n};`;

  return (
    <section ref={sectionRef} className="pr-page mt-12">
      <div ref={cursorGlowRef} className="pr-cursor-glow" aria-hidden="true" />

      {/* ══ TICKER ══ */}
      <div className="pr-ticker" aria-hidden="true">
        <div className="pr-ticker-track">
          {doubledTicker.map((item, i) => (
            <span key={i} className="pr-ticker-item">
              <span className="pr-ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ HEADER ══ */}
      <header ref={headerRef} className="pr-header">
        <pre className="pr-code-deco" aria-hidden="true">
          {codeSnippet}
        </pre>
        <div className="pr-header-inner">
          <div>
            <p className="pr-section-label pr-label-anim">AUTCSEA</p>
            <h1 className="pr-heading pr-serif">
              <SplitWords text="Our" />
              <SplitWords text="Projects" accent />
            </h1>
          </div>
          <p className="pr-desc pr-desc-anim">
            Built by students to solve real problems, experiment with modern
            technologies, and gain hands-on experience.
          </p>
        </div>
        <div className="pr-header-divider pr-line-anim" />
      </header>

      {/* ══ STATS BAR ══ */}
      <div className="pr-stats-bar">
        {[
          { val: 1, suffix: "", label: "Projects" },
          {
            val: projectsData.reduce((acc, p) => acc + p.techStack.length, 0),
            suffix: "+",
            label: "Technologies",
          },
          { val: 2026, suffix: "", label: "Season" },
          { val: 100, suffix: "%", label: "Open Source" },
        ].map(({ val, suffix, label }) => (
          <div key={label} className="pr-stat-item">
            <span className="pr-stat-val">
              {val}
              <span className="accent">{suffix}</span>
            </span>
            <span className="pr-stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="pr-wrap">
        {/* ══ FEATURED PROJECT ══ */}
        {featured && (
          <section
            className="pr-featured-section"
            aria-label="Featured project"
          >
            <div className="pr-featured-label">
              <span className="pr-featured-dot" aria-hidden="true" />
              <span className="pr-section-label">Featured Project</span>
            </div>

            <div
              ref={featuredRef}
              className="pr-featured-card"
              onMouseMove={(e) => applyTilt(e.currentTarget, e)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
              onClick={() => setActiveProject(featured)}
            >
              <div className="pr-featured-img-side">
                <div ref={featuredParallaxRef} className="pr-featured-parallax">
                  <ImageCarousel
                    images={featured.images}
                    alt={featured.title}
                  />
                </div>
                <div className="pr-featured-badge">
                  <span className="pr-badge-pill">Featured</span>
                  <span className="pr-badge-pill blue">
                    {featured.techStack[0]}
                  </span>
                </div>
              </div>

              <div className="pr-featured-info">
                <div>
                  <h2 className="pr-featured-title pr-serif">
                    {featured.title}
                  </h2>
                  <p className="pr-featured-overview">{featured.overview}</p>
                  <div className="pr-featured-meta">
                    <div className="pr-featured-meta-row">
                      <div className="pr-meta-icon">🛠</div>
                      <span>
                        {featured.techStack.slice(0, 3).join(", ")}
                        {featured.techStack.length > 3 && "…"}
                      </span>
                    </div>
                    <div className="pr-featured-meta-row">
                      <div className="pr-meta-icon">⭐</div>
                      <span>{featured.highlights[0]}</span>
                    </div>
                  </div>
                  <div className="pr-tech-row">
                    {featured.techStack.map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </div>
                </div>
                <button
                  ref={viewBtnRef}
                  className="pr-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(featured);
                  }}
                  onMouseMove={handleBtnMove}
                  onMouseLeave={handleBtnLeave}
                >
                  Explore Project →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ══ PROJECTS GRID ══ */}
        <div className="pr-grid-header">
          <div className="pr-grid-header-left">
            <span
              className="pr-section-label pr-grid-label-anim"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              All Projects
            </span>
            <div className="pr-accent-line pr-line-anim" aria-hidden="true" />
          </div>
          <span className="pr-count-badge">{projectsData.length} projects</span>
        </div>

        <div className="pr-grid">
          {filledProjects.map((project, idx) =>
            project.isComingSoon ? (
              <ComingSoonCard
                key={project.id}
                project={project}
                index={idx}
                cardRef={(el) => (cardsRef.current[idx] = el)}
              />
            ) : (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isLive={idx === 0}
                cardRef={(el) => (cardsRef.current[idx] = el)}
                onClick={() => setActiveProject(project)}
              />
            ),
          )}
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          index={activeIndex}
          overlayRef={overlayRef}
          modalRef={modalRef}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default Projects;
