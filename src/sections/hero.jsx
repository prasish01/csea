import { useRef } from "react";
import { Element, Link as LinkScroll } from "react-scroll";
import { logos } from "../constants/index.jsx";
import { useHeroAnimations } from "../hooks/useHeroAnimations";
import "../styles/hero.css";

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */

/**
 * Splits a string into individual <span class="hr-letter"> elements.
 * Spaces become .hr-letter-space so they still take up width.
 */
const SplitLetters = ({ text, className = "" }) => (
  <span className={className}>
    {text.split("").map((char, i) =>
      char === " " ? (
        <span key={i} className="hr-letter-space" aria-hidden="true" />
      ) : (
        <span key={i} className="hr-letter" aria-hidden="true">
          {char}
        </span>
      ),
    )}
  </span>
);

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

const StatItem = ({ value, suffix = "", label }) => (
  <div className="hr-stat">
    <span className="hr-stat-num" data-val={value} data-suffix={suffix}>
      0{suffix}
    </span>
    <span className="hr-stat-label">{label}</span>
  </div>
);

/* Chess piece SVGs — pure CSS shapes, no external assets needed */
const QueenSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="12" r="8" stroke="white" strokeWidth="2" />
    <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="2" />
    <circle cx="80" cy="20" r="6" stroke="white" strokeWidth="2" />
    <circle cx="50" cy="8" r="4" stroke="white" strokeWidth="1.5" />
    <path
      d="M14 28 L20 70 L80 70 L86 28 L80 38 L65 22 L50 40 L35 22 L20 38 Z"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect
      x="16"
      y="70"
      width="68"
      height="10"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="10"
      y="80"
      width="80"
      height="10"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="90"
      width="72"
      height="8"
      rx="1"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

const RookSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 80 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="8"
      width="14"
      height="20"
      rx="1"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="33"
      y="8"
      width="14"
      height="20"
      rx="1"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="58"
      y="8"
      width="14"
      height="20"
      rx="1"
      stroke="white"
      strokeWidth="2"
    />
    <path d="M8 28 H72 V70 H8 Z" stroke="white" strokeWidth="2" />
    <rect
      x="4"
      y="70"
      width="72"
      height="10"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="0"
      y="80"
      width="80"
      height="10"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);

const PawnSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 60 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="30" cy="14" r="10" stroke="white" strokeWidth="2" />
    <path
      d="M22 24 C16 32 18 48 20 56 L40 56 C42 48 44 32 38 24 Z"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect
      x="10"
      y="56"
      width="40"
      height="8"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
    <rect
      x="4"
      y="64"
      width="52"
      height="8"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Main Hero Section
───────────────────────────────────────────────────────── */
const Hero = () => {
  // ── Refs ──────────────────────────────────────────────
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const sponsorsRef = useRef(null);
  const logosRef = useRef(null);
  const scrollCueRef = useRef(null);

  // ── Animations ────────────────────────────────────────
  useHeroAnimations({
    heroRef,
    badgeRef,
    subRef,
    statsRef,
    sponsorsRef,
    logosRef,
    scrollCueRef,
  });

  // ── Data ──────────────────────────────────────────────
  const stats = [
    { value: 500, suffix: "+", label: "Active Members" },
    { value: 0, suffix: "", label: "Projects Built" },
    { value: 100, suffix: "", label: "Events Run" },
    { value: 5, suffix: "", label: "Years Running" },
  ];

  const duplicatedLogos = [...logos, ...logos];

  // ─────────────────────────────────────────────────────
  return (
    <Element name="hero ">
      <section ref={heroRef} className="hr-section">
        {/* ── Background layers ── */}
        <div className="hr-grid-lines" aria-hidden="true" />
        <div className="hr-mesh" aria-hidden="true" />
        <div className="hr-noise" aria-hidden="true" />
        <div className="hr-orb hr-orb-1" aria-hidden="true" />
        <div className="hr-orb hr-orb-2" aria-hidden="true" />

        {/* ── Floating chess piece decorations ── */}
        <div className="hr-decos" aria-hidden="true">
          <QueenSVG className="hr-deco-a" />
          <RookSVG className="hr-deco-b" />
          <PawnSVG className="hr-deco-c" />
        </div>

        {/* ── Main content ── */}
        <div className="hr-inner hr-main-content ">
          {/* Badge */}
          <div ref={badgeRef} className="hr-badge">
            <span className="hr-badge-dot" aria-hidden="true" />
            <span className="hr-badge-text ">
              AUT Computer Science &amp; Engineering Association
            </span>
          </div>

          {/* Heading — 3D letter flip */}
          {/* aria-label gives screen readers the full text */}
          <div className="hr-heading-3d" aria-label="Create More">
            <h1 className="hr-heading">
              <span className="hr-word-gap">
                <SplitLetters text="Get" />
              </span>
              <span className="hr-word-gap hr-word-accent">
                <SplitLetters text="Involved." />
              </span>
            </h1>
          </div>

          {/* Animated underline beneath heading */}
          <div className="hr-heading-line-wrap">
            <span className="hr-underline" aria-hidden="true" />
          </div>

          {/* Sub-text */}
          <p ref={subRef} className="hr-sub">
            Come and be apart of something big on campus, whether you want to
            learn, network or compete we’ve got something for you.
          </p>

          {/* CTA buttons */}
          <div className="hr-cta">
            <LinkScroll to="features" offset={-100} spy smooth>
              <button className="hr-cta-btn hr-cta-primary hr-cta-btn">
                Join Us Now →
              </button>
            </LinkScroll>
            <LinkScroll to="projects" offset={-80} spy smooth>
              <button className="hr-cta-btn hr-cta-secondary hr-cta-btn">
                See Our Projects
              </button>
            </LinkScroll>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="hr-stats">
            {stats.map(({ value, suffix, label }, i) => (
              <>
                <StatItem
                  key={label}
                  value={value}
                  suffix={suffix}
                  label={label}
                />
                {i < stats.length - 1 && (
                  <div
                    key={`div-${i}`}
                    className="hr-stat-divider"
                    aria-hidden="true"
                  />
                )}
              </>
            ))}
          </div>

          {/* Sponsors */}
          <div ref={sponsorsRef} className="hr-sponsors">
            <span className="hr-sponsors-label">Our Sponsors</span>

            {/* Desktop infinite marquee */}
            <div className="hr-logos-track">
              <div ref={logosRef} className="hr-logos-inner">
                {duplicatedLogos.map(({ id, url, width, height, title }, i) => (
                  <div key={`${id}-${i}`} className="hr-logo-item">
                    <img src={url} width={width} height={height} alt={title} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile static fallback */}
            <div className="hr-logos-mobile">
              {logos.map(({ id, url, width, height, title }) => (
                <div key={id} className="hr-logo-item">
                  <img src={url} width={width} height={height} alt={title} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div ref={scrollCueRef} className="hr-scroll-cue" aria-hidden="true">
          <div className="hr-scroll-line" />
          <span className="hr-scroll-label">Scroll</span>
        </div>
      </section>
    </Element>
  );
};

export default Hero;
