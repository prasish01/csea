import { Link as LinkScroll } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import "../styles/navbar.css";

/* ─────────────────────────────────────────────────────────
   NavLink — smart: scroll on home, route elsewhere
───────────────────────────────────────────────────────── */
const NavLink = ({ title, route, scrollTo, isHome, active, className }) => {
  const cls = clsx("nav-link", active && "is-active", className);

  if (scrollTo && isHome) {
    return (
      <LinkScroll to={scrollTo} offset={-80} spy smooth className={cls}>
        {title}
      </LinkScroll>
    );
  }

  if (scrollTo && !isHome) {
    return (
      <Link to={`/#${scrollTo}`} className={cls}>
        {title}
      </Link>
    );
  }

  return (
    <Link to={route} className={cls}>
      {title}
    </Link>
  );
};

/* ─────────────────────────────────────────────────────────
   Header
───────────────────────────────────────────────────────── */
const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProjects = location.pathname === "/projects";

  /* ── Scroll detection ── */
  useEffect(() => {
    const fn = () => setHasScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* ── Lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── GSAP: stagger drawer items in ── */
  useEffect(() => {
    if (!drawerRef.current || !isOpen) return;
    gsap.fromTo(
      drawerRef.current.querySelectorAll(".nav-drawer-item, .nav-drawer-foot"),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.065,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, [isOpen]);

  return (
    <>
      {/* ════════════════════════
           TOP BAR
         ════════════════════════ */}
      <header className={clsx("nav-bar", hasScrolled ? "scrolled" : "at-top")}>
        <div className="nav-inner mb-4">
          {/* ── Mobile logo (left) ── */}
          <Link to="/" className="nav-logo-link lg:hidden" aria-label="AUTCSEA">
            <img src="/images/autcsea.png" alt="AUTCSEA" className="nav-logo" />
          </Link>

          {/* ── Desktop: left links ── */}
          <div className="nav-group nav-desktop">
            <NavLink title="Home" route="/" isHome={isHome} active={isHome} />
            <span className="nav-dot" aria-hidden="true" />
            <NavLink title="Events" route="/events" isHome={isHome} />
          </div>

          {/* ── Desktop: center logo ── */}
          <Link
            to="/"
            className="nav-logo-link nav-desktop"
            aria-label="AUTCSEA"
          >
            <img src="/images/autcsea.png" alt="AUTCSEA" className="nav-logo" />
          </Link>

          {/* ── Desktop: right links ── */}
          <div className="nav-group nav-group-right nav-desktop">
            <NavLink
              title="Projects"
              route="/projects"
              isHome={isHome}
              active={isProjects}
            />
            <span className="nav-dot" aria-hidden="true" />
            <NavLink title="Contact" route="/contact" isHome={isHome} />
          </div>

          {/* ── Mobile burger ── */}
          <button
            className={clsx("nav-burger", isOpen && "is-open")}
            onClick={() => setIsOpen((p) => !p)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
          </button>
        </div>
      </header>

      {/* ════════════════════════
           MOBILE DRAWER
         ════════════════════════ */}
      <nav
        ref={drawerRef}
        className={clsx("nav-drawer", isOpen && "is-open")}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <ul className="nav-drawer-list">
          {[
            { title: "Home", route: "/", active: isHome },
            { title: "Events", route: "/events", active: false },
            { title: "Projects", route: "/projects", active: isProjects },
            { title: "Contact", route: "/contact", active: false },
          ].map(({ title, route, active }) => (
            <li key={title} className="nav-drawer-item">
              <Link
                to={route}
                className={clsx("nav-drawer-link", active && "is-active")}
                onClick={() => setIsOpen(false)}
              >
                {title}
                <span className="nav-drawer-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-drawer-foot">
          <span className="nav-drawer-foot-label">
            AUT City Campus · Auckland, NZ
          </span>
          <Link
            to="/contact"
            className="nav-drawer-cta"
            onClick={() => setIsOpen(false)}
          >
            Join the Club →
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
