import { Link as LinkScroll } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProjects = location.pathname === "/projects";

  /* =======================
     Scroll effect
     ======================= */
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =======================
     Close mobile menu on route change
     ======================= */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* =======================
     Nav Link Helper
     ======================= */
  const NavLink = ({ title, scrollTo, route, active }) => {
    const baseClasses =
      "base-bold uppercase transition-colors duration-300 cursor-pointer max-lg:my-4 max-lg:h5";

    const activeClasses = active ? "text-p5" : "text-white hover:text-p3";

    // Normal route navigation
    if (route) {
      return (
        <Link to={route} className={clsx(baseClasses, activeClasses)}>
          {title}
        </Link>
      );
    }

    // If NOT on home → go to home and scroll via hash
    if (!isHome) {
      return (
        <Link to={`/#${scrollTo}`} className={clsx(baseClasses, activeClasses)}>
          {title}
        </Link>
      );
    }

    // On home → smooth scroll
    return (
      <LinkScroll
        to={scrollTo}
        offset={-100}
        spy
        smooth
        activeClass="nav-active"
        className={clsx(baseClasses, activeClasses)}
      >
        {title}
      </LinkScroll>
    );
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 bg-p1 max-lg:py-4",
        hasScrolled && "py-2 backdrop-blur-[8px]",
      )}
    >
      <div className="container flex h-14 items-center max-lg:px-5">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden flex-1 z-2">
          <img src="/images/autcsea.png" width={115} height={55} alt="logo" />
        </Link>

        {/* Navigation */}
        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-p1 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none",
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 sidebar-before max-md:px-4">
            <nav className="max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                {/* Left */}
                <li className="nav-li">
                  <NavLink title="Home" route="/" active={isHome} />
                  <div className="dot" />
                  <NavLink title="Events" route="/events" />
                </li>

                {/* Center Logo */}
                <li className="nav-logo">
                  <Link
                    to="/"
                    className="max-lg:hidden transition-transform duration-500"
                  >
                    <img
                      src="/images/autcsea.png"
                      width={160}
                      height={55}
                      alt="logo"
                    />
                  </Link>
                </li>

                {/* Right */}
                <li className="nav-li">
                  <NavLink
                    title="Projects"
                    route="/projects"
                    active={isProjects}
                  />
                  <div className="dot" />
                  <NavLink title="Contact" route="/contact" />
                </li>
              </ul>
            </nav>

            {/* Mobile background */}
            <div className="lg:hidden absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
              <img
                src="/images/bg-outlines.png"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 mix-blend-soft-light opacity-5"
              />
            </div>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-2 size-10 border-2 border-white/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.png`}
            alt="menu"
            className="size-1/2 object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
