import { Link, useLocation } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { socials } from "../constants/index.jsx";
import "../styles/footer.css";

/* ─────────────────────────────────────────────────────────
   Marquee strip content
───────────────────────────────────────────────────────── */
const MARQUEE_WORDS = [
  "AUTCSEA",
  "Computer Science",
  "Engineering Association",
  "AUT City Campus",
  "Auckland NZ",
  "Est. 2021",
  "Build · Connect · Grow",
  "Semester 1 · 2026",
];

/* Renders twice so the loop is seamless */
const MarqueeContent = () => (
  <>
    {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
      <span key={i} className="ft-marquee-item">
        {word}
        <span className="ft-marquee-sep" aria-hidden="true" />
      </span>
    ))}
  </>
);

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
const Footer = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  /* Smart link — scrolls on home, routes elsewhere */
  const FootLink = ({ to, scroll, badge, children }) => {
    const inner = (
      <>
        {children}
        {badge && <span className="ft-badge">{badge}</span>}
      </>
    );

    if (isHome && scroll) {
      return (
        <li>
          <LinkScroll
            to={scroll}
            offset={-80}
            spy
            smooth
            className="ft-col-link"
          >
            {inner}
          </LinkScroll>
        </li>
      );
    }
    return (
      <li>
        <Link to={to} className="ft-col-link">
          {inner}
        </Link>
      </li>
    );
  };

  return (
    <footer className="ft">
      {/* ── Scrolling marquee ── */}
      <div className="ft-marquee" aria-hidden="true">
        <div className="ft-marquee-track">
          <MarqueeContent />
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="ft-body">
        <div className="ft-grid">
          {/* Col 1 — Brand */}
          <div className="ft-brand">
            <Link to="/" aria-label="AUTCSEA home">
              <img
                src="/images/autcsea.png"
                alt="AUTCSEA"
                className="ft-logo"
              />
            </Link>
            <p className="ft-tagline">
              AUT's Computer Science &amp; Engineering Association — building
              projects, running events, and connecting students with industry
              since 2021.
            </p>
            <div className="ft-socials">
              {socials.map(({ id, url, icon, title }) => (
                <a
                  key={id}
                  href={url}
                  className="ft-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                >
                  <img src={icon} alt={title} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <span className="ft-col-head">Navigate</span>
            <ul className="ft-col-list">
              <FootLink to="/">Home</FootLink>
              <FootLink to="/events">Events</FootLink>
              <FootLink to="/projects">Projects</FootLink>
              <FootLink to="/contact">Contact</FootLink>
            </ul>
          </div>

          {/* Col 3 — Community */}
          <div>
            <span className="ft-col-head">Community</span>
            <ul className="ft-col-list">
              <li>
                <a
                  href="https://discord.com/invite/AUQFxgxd"
                  className="ft-col-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord <span className="ft-badge">Active</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/autcsea"
                  className="ft-col-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/autcsea/"
                  className="ft-col-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link to="/contact" className="ft-col-link">
                  Interest Form <span className="ft-badge">Join</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-copy">
            © {new Date().getFullYear()} <strong>AUTCSEA</strong>
            &nbsp;· AUT Computer Science &amp; Engineering Association
          </p>
          <div className="ft-legal">
            <a href="#" className="ft-legal-link">
              Privacy Policy
            </a>
            <span className="ft-legal-sep">·</span>
            <a href="#" className="ft-legal-link">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
