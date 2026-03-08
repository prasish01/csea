import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Element } from "react-scroll";
import { links } from "../constants/index.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/roadmap.css";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Event Data
───────────────────────────────────────────────────────── */
const events = [
  {
    id: 0,
    title: "AUTSA Club Expo",
    week: "Week 1",
    type: "Social",
    desc: "Kick off the semester at the AUTSA Club Expo. Meet the team, discover what AUTCSEA is all about, and sign up for the year.",
    details: [
      "Come say hi at our stall",
      "Free merch & giveaways",
      "Learn about upcoming events",
    ],
    pos: { x: 13, y: 13 },
    tooltipBelow: false,
  },
  {
    id: 1,
    title: "Pub Quiz Night",
    week: "Week 2",
    type: "Social",
    desc: "Connect with students across STEM disciplines in a relaxed social setting. A great chance to meet new people and build friendships.",
    details: [
      "Meet students from different STEM majors",
      "Casual networking",
      "Games and social activities",
    ],
    pos: { x: 42, y: 13 },
    tooltipBelow: false,
  },
  {
    id: 2,
    title: "Internship 101",
    week: "Week 3",
    type: "Workshop",
    desc: "Learn how to secure internships in the tech industry. Get practical advice on applications, timing, and preparing for the process.",
    details: [
      "How internship applications work",
      "Tips for standing out",
      "Q&A with experienced interns",
    ],
    pos: { x: 73, y: 13 },
    tooltipBelow: false,
  },
  {
    id: 3,
    title: "CV Workshop with ELAB",
    week: "Week 4",
    type: "Workshop",
    desc: "Improve your CV with guidance from ELAB. Learn how to structure your resume and present your skills effectively..",
    details: [
      "CV structure and formatting",
      "Tips for tech resumes",
      "Live feedback opportunities",
    ],
    pos: { x: 85, y: 47 },
    tooltipBelow: true,
  },
  {
    id: 4,
    title: "Interview Preparation",
    week: "Week 5",
    type: "Workshop",
    desc: "Prepare for technical and behavioural interviews with practical tips and mock scenarios.",
    details: [
      "Common interview questions",
      "Technical interview tips",
      "How to present your projects",
    ],
    pos: { x: 52, y: 56 },
    tooltipBelow: true,
  },
  {
    id: 5,
    title: "Pub Quiz with MAPS",
    week: "Week 6",
    type: "Social",
    desc: "Join us for a fun pub quiz night hosted with MAPS. Test your knowledge and compete with friends.",
    details: [
      "Team-based quiz format",
      "General & tech trivia",
      "Prizes for winning teams",
    ],
    pos: { x: 17, y: 56 },
    tooltipBelow: true,
  },
  {
    id: 6,
    title: "ETL Pipeline Competition",
    week: "Week 7",
    type: "Competition",
    desc: "Build and optimise an ETL pipeline in this hands-on data engineering challenge.",
    details: [
      "Data engineering challenge",
      "Build an ETL pipeline",
      "Prizes for top performers",
    ],
    pos: { x: 25, y: 84 },
    tooltipBelow: true,
  },
  {
    id: 7,
    title: "Hackathon with CSI",
    week: "Week 8",
    type: "Competition",
    desc: "Collaborate with fellow students to build innovative projects during an exciting hackathon event with CSI.",
    details: [
      "Team-based hackathon",
      "Build a project in limited time",
      "Mentors and prizes",
    ],
    pos: { x: 52, y: 84 },
    tooltipBelow: true,
  },
  {
    id: 8,
    title: "API Development Workshop",
    week: "Week 9",
    type: "Workshop",
    desc: "Learn how to design and build APIs used in modern web applications.",
    details: [
      "API fundamentals",
      "Building REST APIs",
      "Best practices for backend integration",
    ],
    pos: { x: 72, y: 84 },
    tooltipBelow: true,
  },
];

const TYPE_COLORS = {
  Social: "#f59e0b",
  Competition: "#8b5cf6",
  Workshop: "#0ea5e9",
  Industry: "#10b981",
  Networking: "#ec4899",
};

/* SVG path — viewBox 1000×900 */
const PATH_D =
  "M 130 117 C 260 117 370 117 420 117 C 530 117 640 117 730 117 C 820 117 900 117 930 117 C 970 117 975 220 960 423 C 945 510 895 503 840 503 C 760 503 660 503 520 503 C 430 503 340 503 240 503 C 170 503 125 503 110 503 C 75 503 62 570 78 760 C 90 820 170 760 300 760 C 420 760 540 760 670 760";

/* Approximate 0–1 progress along the path for each event */
const EVENT_PROGRESS = [
  0.01, 0.165, 0.315, 0.42, 0.565, 0.675, 0.825, 0.971, 0.995,
];

/* ── SVG Icon set ── */
const Icon = ({ type, size = 20 }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (type === "Social")
    return (
      <svg {...p}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (type === "Competition")
    return (
      <svg {...p}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  if (type === "Workshop")
    return (
      <svg {...p}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  if (type === "Industry")
    return (
      <svg {...p}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    );
  if (type === "Networking")
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-7.5-2.1 2.1M7.6 16.4l-2.1 2.1m0-12.1 2.1 2.1m9-2.1-2.1 2.1" />
      </svg>
    );
  return null;
};

const SplitWords = ({ text, accent = false }) => (
  <span className={`rd-split-line${accent ? " rd-heading-accent" : ""}`}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="rd-word-clip">
        <span className="rd-word-inner">{word}</span>
      </span>
    ))}
  </span>
);

/* ─────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────── */
const Roadmap = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bgPathRef = useRef(null);
  const fillPathRef = useRef(null);
  const glowPathRef = useRef(null);
  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const panelRef = useRef(null);
  const totalLen = useRef(0);

  const [activeId, setActiveId] = useState(0);
  const active = events[activeId] ?? events[0];

  /* ── Entrance GSAP ─────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rd-label-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(".rd-word-inner", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: "110%",
        duration: 0.82,
        stagger: 0.06,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".rd-heading-line", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.0,
        ease: "expo.out",
        delay: 0.55,
      });
      gsap.from(".rd-sub-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 22,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.75,
        ease: "power3.out",
        delay: 0.25,
      });

      // Background dashed path draws in on scroll
      if (bgPathRef.current) {
        const len = bgPathRef.current.getTotalLength?.() ?? 1600;
        gsap.set(bgPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(bgPathRef.current, {
          scrollTrigger: {
            trigger: ".rd-path-area",
            start: "top 78%",
            end: "bottom 25%",
            scrub: 1.6,
          },
          strokeDashoffset: 0,
          ease: "none",
        });
      }

      // Nodes pop in
      nodesRef.current.filter(Boolean).forEach((node, i) => {
        gsap.from(node, {
          scrollTrigger: {
            trigger: ".rd-path-area",
            start: `top ${84 - i * 3}%`,
            toggleActions: "play none none none",
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2.2)",
          delay: i * 0.05,
        });
      });

      gsap.from(".rd-detail-panel", {
        scrollTrigger: { trigger: ".rd-path-area", start: "top 78%" },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.35,
      });
      gsap.from(".rd-stat-item", {
        scrollTrigger: { trigger: ".rd-stat-bar", start: "top 92%" },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
      linksRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          scale: 0.5,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
          delay: 0.5 + i * 0.08,
        });
      });
      gsap.to(".rd-orb-pulse", {
        scale: 1.2,
        opacity: 0.7,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Store total path length + init fill to event 0 */
  useEffect(() => {
    if (fillPathRef.current) {
      totalLen.current = fillPathRef.current.getTotalLength?.() ?? 1600;
      const len = totalLen.current;
      const offset = len * (1 - EVENT_PROGRESS[0]);
      gsap.set(fillPathRef.current, {
        strokeDasharray: len,
        strokeDashoffset: offset,
      });
      if (glowPathRef.current)
        gsap.set(glowPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: offset,
        });
    }
  }, []);

  /* Node interaction */
  useEffect(() => {
    nodesRef.current.filter(Boolean).forEach((node, i) => {
      const ring = node.querySelector(".rd-node-ring");
      const activate = () => {
        setActiveId(i);
        const len = totalLen.current;
        const offset = len * (1 - EVENT_PROGRESS[i]);
        // Fill path + glow path both animate to same offset
        gsap.to([fillPathRef.current, glowPathRef.current], {
          strokeDashoffset: offset,
          duration: 0.55,
          ease: "power2.inOut",
        });
        gsap.to(node, { scale: 1.12, duration: 0.25, ease: "power2.out" });
        if (ring)
          gsap.to(ring, {
            opacity: 1,
            scale: 1.3,
            duration: 0.3,
            ease: "power2.out",
          });
        if (panelRef.current)
          gsap.fromTo(
            panelRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          );
      };
      const deactivate = () => {
        gsap.to(node, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.5)" });
        if (ring)
          gsap.to(ring, {
            opacity: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          });
      };
      node.addEventListener("mouseenter", activate);
      node.addEventListener("mouseleave", deactivate);
    });
  }, []);

  return (
    <Element name="download">
      <section ref={sectionRef} className="rd-section">
        <div className="rd-bg-grid" aria-hidden="true" />
        <div className="rd-bg-fade" aria-hidden="true" />
        <div className="rd-orb rd-orb-1" aria-hidden="true" />
        <div className="rd-orb rd-orb-pulse" aria-hidden="true" />

        <div className="rd-wrap">
          {/* HEADER */}
          <header ref={headingRef} className="rd-header">
            <div className="rd-header-left">
              <p className="rd-label rd-label-anim">
                AUTCSEA · Semester 1, 2026
              </p>
              <h2 className="rd-heading rd-serif">
                <SplitWords text="Event" />
                <SplitWords text="Roadmap" accent />
              </h2>
              <span className="rd-heading-line" aria-hidden="true" />
              <p className="rd-sub rd-sub-anim">
                A semester packed with networking nights, hackathons, industry
                tours, and competitions. Hover any event to explore it.
              </p>
              <div className="rd-links">
                {links.map(({ id, title, icon, url }, idx) => (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rd-link-btn"
                    ref={(el) => (linksRef.current[idx] = el)}
                    aria-label={title}
                  >
                    {icon}
                    <span className="rd-link-label">{title}</span>
                  </a>
                ))}
              </div>
            </div>
          </header>

          {/* STAT BAR */}
          <div className="rd-stat-bar">
            {[
              { val: "9", label: "Events" },
              { val: "4", label: "Event Types" },
              { val: "S1", label: "Semester" },
              { val: "2026", label: "Year" },
            ].map(({ val, label }) => (
              <div key={label} className="rd-stat-item">
                <span className="rd-stat-val rd-serif">{val}</span>
                <span className="rd-stat-label">{label}</span>
              </div>
            ))}
            <div className="rd-type-legend">
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <span key={type} className="rd-legend-item">
                  <span
                    className="rd-legend-dot"
                    style={{ background: color }}
                  />
                  <span className="rd-legend-label">{type}</span>
                </span>
              ))}
            </div>
          </div>

          {/* DESKTOP LAYOUT: PATH + PANEL */}
          <div className="rd-main-layout">
            {/* Winding path */}
            <div className="rd-path-area">
              <svg
                className="rd-path-svg"
                viewBox="0 0 1000 900"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Faint full route */}
                <path ref={bgPathRef} className="rd-path-base" d={PATH_D} />
                {/* Glow behind fill */}
                <path ref={glowPathRef} className="rd-path-glow" d={PATH_D} />
                {/* Progress fill */}
                <path ref={fillPathRef} className="rd-path-fill" d={PATH_D} />
              </svg>

              {events.map((ev, idx) => {
                const color = TYPE_COLORS[ev.type];
                const isActive = activeId === idx;
                return (
                  <div
                    key={ev.id}
                    ref={(el) => (nodesRef.current[idx] = el)}
                    className={`rd-node${ev.tooltipBelow ? " tooltip-below" : ""}${isActive ? " is-active" : ""}`}
                    style={{
                      left: `${ev.pos.x}%`,
                      top: `${ev.pos.y}%`,
                      "--node-color": color,
                    }}
                  >
                    <div className="rd-node-ring" aria-hidden="true" />
                    <div className="rd-node-circle">
                      <span className="rd-node-icon-wrap">
                        <Icon type={ev.type} size={17} />
                      </span>
                      <span className="rd-node-num">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="rd-node-week">{ev.week}</span>
                    </div>
                    <span className="rd-node-name">{ev.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Detail panel */}
            <aside className="rd-detail-panel">
              <div ref={panelRef} className="rd-panel-inner">
                <span
                  className="rd-panel-type"
                  style={{ "--tc": TYPE_COLORS[active.type] }}
                >
                  <span className="rd-panel-type-dot" />
                  {active.type}
                </span>
                <p className="rd-panel-week">{active.week}</p>
                <h3 className="rd-panel-title rd-serif">{active.title}</h3>
                <div className="rd-panel-divider" />
                <p className="rd-panel-desc">{active.desc}</p>
                <p className="rd-panel-sub-label">What to expect</p>
                <ul className="rd-panel-list">
                  {active.details.map((d) => (
                    <li key={d} className="rd-panel-list-item">
                      <span className="rd-panel-arrow">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="rd-panel-progress">
                  <p className="rd-panel-progress-label">
                    Event {active.id + 1} of {events.length}
                  </p>
                  <div className="rd-panel-dots">
                    {events.map((e, i) => (
                      <span
                        key={e.id}
                        className={`rd-panel-dot${i <= activeId ? " filled" : ""}`}
                        style={{ "--tc": TYPE_COLORS[e.type] }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* MOBILE TIMELINE */}
          <div className="rd-mobile-timeline">
            {events.map((ev) => (
              <div key={ev.id} className="rd-mobile-event">
                <div
                  className="rd-mobile-icon-wrap"
                  style={{ "--node-color": TYPE_COLORS[ev.type] }}
                >
                  <Icon type={ev.type} size={17} />
                </div>
                <div className="rd-mobile-body">
                  <p className="rd-mobile-week">
                    {ev.week}
                    <span
                      className="rd-mobile-type"
                      style={{ color: TYPE_COLORS[ev.type] }}
                    >
                      {" "}
                      · {ev.type}
                    </span>
                  </p>
                  <h3 className="rd-mobile-title">{ev.title}</h3>
                  <p className="rd-mobile-desc">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Roadmap;
