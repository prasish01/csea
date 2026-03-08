import { useRef } from "react";
import { testimonials } from "../constants/index.jsx";
import {
  useTeamAnimations,
  onCardTiltMove,
  onCardTiltLeave,
} from "../hooks/useTeamAnimations";
import "../styles/testimonials.css";

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

/** Word-by-word clip reveal for GSAP */
const SplitWords = ({ text, accent = false }) => (
  <span className={`tm-split-line${accent ? " tm-heading-accent" : ""}`}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="tm-word-clip">
        <span className="tm-word-inner">{word}</span>
      </span>
    ))}
  </span>
);

/** LinkedIn SVG icon */
const LinkedInIcon = () => (
  <svg
    className="tm-linkedin-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/** Circuit board SVG decoration */
const CircuitSVG = () => (
  <svg viewBox="0 0 220 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className="tm-circuit-path"
      d="M180 20 L140 20 L140 60 L100 60 L100 100"
    />
    <path className="tm-circuit-path" d="M100 100 L60 100 L60 160 L20 160" />
    <path className="tm-circuit-path" d="M20 160 L20 220 L80 220 L80 280" />
    <path className="tm-circuit-path" d="M80 280 L80 340 L120 340 L120 380" />
    <path className="tm-circuit-path" d="M160 40 L160 80 L200 80" />
    <path className="tm-circuit-path" d="M40 200 L40 240 L10 240" />
    {/* Junction dots */}
    <circle className="tm-circuit-path" cx="140" cy="20" r="4" />
    <circle className="tm-circuit-path" cx="100" cy="100" r="4" />
    <circle className="tm-circuit-path" cx="60" cy="160" r="4" />
    <circle className="tm-circuit-path" cx="80" cy="280" r="4" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Member Card — 3D flip
───────────────────────────────────────────── */
const MemberCard = ({ member, cardRef }) => {
  // Derive initials for avatar fallback
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={cardRef}
      className="tm-card-scene"
      onMouseMove={(e) => onCardTiltMove(e.currentTarget, e)}
      onMouseLeave={(e) => onCardTiltLeave(e.currentTarget)}
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="tm-card-inner">
        {/* ── FRONT ── */}
        <div className="tm-card-front">
          {/* Spinning ring + avatar */}
          <div className="tm-avatar-ring">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="tm-avatar-img"
              />
            ) : (
              <div className="tm-avatar-initials">{initials}</div>
            )}
          </div>

          <h3 className="tm-card-name tm-serif">{member.name}</h3>
          <p className="tm-card-role">{member.role}</p>

          {/* Tech stack chips */}
          {member.techStack?.length > 0 && (
            <div className="tm-chip-row">
              {member.techStack.map((tech) => (
                <span key={tech} className="tm-chip">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Hover hint */}
          <span className="tm-flip-hint" aria-hidden="true">
            <span>Hover to read more</span>
            <span>↻</span>
          </span>
        </div>

        {/* ── BACK ── */}
        <div className="tm-card-back">
          <div>
            <span className="tm-back-quote-mark" aria-hidden="true">
              "
            </span>
            <p className="tm-back-quote">{member.quote}</p>
          </div>

          <div className="tm-back-footer">
            <div>
              <p className="tm-back-name">{member.name}</p>
              <p className="tm-back-role">{member.role}</p>
            </div>

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tm-linkedin-btn"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${member.name} on LinkedIn`}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Main Testimonials / Team Section
───────────────────────────────────────────────────────── */
const Testimonials = () => {
  // ── Refs ──────────────────────────────────────────────
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef([]);

  // ── Animations ────────────────────────────────────────
  useTeamAnimations({ sectionRef, headingRef, cardsRef, ctaRef });

  // ─────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} className="tm-section">
      {/* ── Background layers ── */}
      <div className="tm-bg-layer" aria-hidden="true" />
      <div className="tm-bg-fade" aria-hidden="true" />
      <div className="tm-bg-orb" aria-hidden="true" />

      {/* Circuit decorations */}
      <div className="tm-circuit-svg tm-circuit-svg-left" aria-hidden="true">
        <CircuitSVG />
      </div>
      <div className="tm-circuit-svg tm-circuit-svg-right" aria-hidden="true">
        <CircuitSVG />
      </div>

      <div className="tm-wrap">
        {/* ══ SECTION HEADER ══ */}
        <header ref={headingRef} className="tm-header">
          <p className="tm-label tm-label-anim">AUTCSEA</p>

          <h2 className="tm-heading tm-serif">
            <SplitWords text="Meet" />
            <SplitWords text="Our Team" accent />
          </h2>

          <span className="tm-heading-line" aria-hidden="true" />

          <p className="tm-sub tm-sub-anim">
            The people building AUTCSEA — from organising events and leading
            workshops to shipping real software used by the club.
          </p>
        </header>

        {/* ══ MEMBER CARDS ══ */}
        <div className="tm-grid">
          {testimonials.map((member, idx) => (
            <MemberCard
              key={member.id}
              member={member}
              cardRef={(el) => (cardsRef.current[idx] = el)}
            />
          ))}
        </div>

        {/* ══ JOIN CTA ══ */}
        <div ref={ctaRef} className="tm-cta">
          <div className="tm-cta-left">
            <p className="tm-cta-eyebrow">Open to all AUT students</p>
            <h3 className="tm-cta-title tm-serif">
              Want to be part of something real?
            </h3>
            <p className="tm-cta-note">
              Fill in the interest form and we'll be in touch.{" "}
              <strong>Joining the club is a great way to start out.</strong>
            </p>
          </div>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf8Zy5MsRAiP8cSS00yysoDXCHMiWwD-W553cxt6ZXBDqTrqQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="tm-cta-btn">Join the Club →</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
