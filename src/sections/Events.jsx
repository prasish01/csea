import { useRef, useEffect, useState, useLayoutEffect } from "react";
import ImageCarousel from "../components/Imagecarousel";
import { latestEvent, pastEvents } from "../constants/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/events.css";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
const SplitWords = ({ text, accent = false }) => (
  <span className={`ev-split-line${accent ? " ev-heading-accent" : ""}`}>
    {text.split(" ").map((word, i) => (
      <span key={i} className="word-clip">
        <span className="word-inner">{word}</span>
      </span>
    ))}
  </span>
);

const Tag = ({ children }) => <span className="ev-tag">{children}</span>;
const Pill = ({ children }) => <span className="ev-pill">{children}</span>;

const MetaRow = ({ icon, value }) => (
  <div className="ev-meta-row">
    <div className="ev-meta-icon">{icon}</div>
    <span>{value}</span>
  </div>
);

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
   Past Event Card
───────────────────────────────────────────────────────── */
const PastEventCard = ({ event, index, cardRef, onClick }) => (
  <article
    ref={cardRef}
    className="ev-past-card"
    onClick={onClick}
    onMouseMove={(e) => applyTilt(e.currentTarget, e)}
    onMouseLeave={(e) => resetTilt(e.currentTarget)}
  >
    <div className="ev-card-img-wrap" onClick={(e) => e.stopPropagation()}>
      <ImageCarousel images={event.images} alt={event.title} />
      <span className="ev-card-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className="ev-card-body">
      <div className="ev-card-meta">
        <span className="ev-card-date">{event.date}</span>
        <span className="ev-card-location">📍 {event.location}</span>
      </div>
      <h4 className="ev-card-title ev-serif">{event.title}</h4>
      <p className="ev-card-summary">{event.summary}</p>
      <div className="ev-pill-row">
        {event.highlights.map((h, i) => (
          <Pill key={i}>{h}</Pill>
        ))}
      </div>
    </div>
    <div className="ev-card-footer">
      <span className="ev-card-footer-label">View details</span>
      <span className="ev-card-footer-arrow" aria-hidden="true">
        →
      </span>
    </div>
  </article>
);

/* ─────────────────────────────────────────────────────────
   Event Modal
───────────────────────────────────────────────────────── */
const EventModal = ({ event, overlayRef, modalRef, onClose }) => (
  <div
    ref={overlayRef}
    className="ev-modal-overlay"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={event.title}
  >
    <div
      ref={modalRef}
      className="ev-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ev-modal-img-wrap">
        <ImageCarousel images={event.images} alt={event.title} />
        <button
          onClick={onClose}
          className="ev-modal-close"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      <div className="ev-modal-body">
        <div className="ev-pill-row">
          <Pill>{event.date}</Pill>
          <Pill>{event.location}</Pill>
        </div>
        <h3 className="ev-modal-title ev-serif">{event.title}</h3>
        <p className="ev-modal-summary">{event.summary}</p>
        <hr className="ev-modal-divider" />
        <p className="ev-section-label">Highlights</p>
        <div className="ev-pill-row" style={{ marginTop: "10px" }}>
          {event.highlights.map((h, i) => (
            <Pill key={i}>{h}</Pill>
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
  "Upcoming Events",
  "Hackathons",
  "Industry Tours",
  "Workshops",
  "Networking",
  "Competitions",
  "Coding Challenges",
  "Club Updates",
];

/* ─────────────────────────────────────────────────────────
   Main Events Section
───────────────────────────────────────────────────────── */
const Events = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const heroCardRef = useRef(null);
  const heroImgRef = useRef(null);
  const registerRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const [activeEvent, setActiveEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

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

  // ── Entrance + scroll animations ─────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".word-inner", {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        y: "0%",
        duration: 0.9,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.to(".ev-label-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".ev-desc-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.to(".ev-line-anim", {
        scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        scaleX: 1,
        duration: 1.0,
        ease: "expo.out",
        delay: 0.4,
      });

      // Hero card float in
      gsap.to(heroCardRef.current, {
        scrollTrigger: { trigger: heroCardRef.current, start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      // Hero image parallax
      gsap.to(heroImgRef.current, {
        scrollTrigger: {
          trigger: heroCardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
        y: -40,
        ease: "none",
      });

      // Register button float in
      gsap.from(registerRef.current, {
        scrollTrigger: { trigger: registerRef.current, start: "top 92%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        delay: 0.5,
      });

      // Past section label
      gsap.to(".ev-past-label-anim", {
        scrollTrigger: { trigger: ".ev-past-header", start: "top 88%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Past event cards cascade
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

  // ── Modal ─────────────────────────────────────────────
  useEffect(() => {
    if (!activeEvent) {
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
  }, [activeEvent]);

  const handleModalClose = () => {
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
      onComplete: () => setActiveEvent(null),
    });
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activeEvent]);

  // ── Magnetic register button ──────────────────────────
  const handleRegisterMove = (e) => {
    const btn = registerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleRegisterLeave = () =>
    gsap.to(registerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

  const metaItems = [
    { icon: "📅", value: latestEvent.date },
    { icon: "🕙", value: latestEvent.time },
    { icon: "📍", value: latestEvent.location },
  ];

  const doubledTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section ref={sectionRef} className="ev-page mt-12">
      <div ref={cursorGlowRef} className="ev-cursor-glow" aria-hidden="true" />

      {/* ══ TICKER ══ */}
      <div className="ev-ticker" aria-hidden="true">
        <div className="ev-ticker-track">
          {doubledTicker.map((item, i) => (
            <span key={i} className="ev-ticker-item">
              <span className="ev-ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ HEADER ══ */}
      <header ref={headerRef} className="ev-header">
        <div className="ev-header-inner">
          <div>
            <p className="ev-section-label ev-label-anim">AUTCSEA</p>
            <h1 className="ev-heading ev-serif">
              <SplitWords text="Events &" />
              <SplitWords text="Happenings" accent />
            </h1>
          </div>
          <p className="ev-desc ev-desc-anim">
            From beginner workshops to competitive tournaments — everything
            happening at AUT's Computer Science &amp; Engineering Association.
          </p>
        </div>
        <div className="ev-header-divider ev-line-anim" />
      </header>

      <div className="ev-wrap">
        {/* ══ UPCOMING EVENT ══ */}
        <section className="ev-upcoming-section" aria-label="Upcoming event">
          <div className="ev-upcoming-label">
            <span className="ev-pulse-dot" aria-hidden="true" />
            <span className="ev-section-label">Upcoming Event</span>
          </div>

          <div
            ref={heroCardRef}
            className="ev-hero-card"
            onMouseMove={(e) => applyTilt(e.currentTarget, e)}
            onMouseLeave={(e) => resetTilt(e.currentTarget)}
          >
            {/* Image side */}
            <div className="ev-hero-img-side">
              <div ref={heroImgRef} className="ev-hero-parallax-wrap">
                <ImageCarousel
                  images={latestEvent.images}
                  alt={latestEvent.title}
                />
              </div>
              <div className="ev-hero-tags">
                {latestEvent.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </div>
            </div>

            {/* Info side */}
            <div className="ev-hero-info">
              <div>
                <h2 className="ev-hero-title ev-serif">{latestEvent.title}</h2>
                <p className="ev-hero-desc whitespace-pre-line">
                  {latestEvent.description}
                </p>
                <div className="ev-meta-list">
                  {metaItems.map(({ icon, value }) => (
                    <MetaRow key={value} icon={icon} value={value} />
                  ))}
                </div>
              </div>

              {registered ? (
                <div className="ev-registered-msg">
                  ✓ You're registered! See you there.
                </div>
              ) : (
                <button
                  ref={registerRef}
                  className="ev-register-btn"
                  onMouseMove={handleRegisterMove}
                  onMouseLeave={handleRegisterLeave}
                  onClick={() => {
                    setRegistered(true);
                    window.open(
                      latestEvent.registerLink,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  Reserve Your Spot →
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ══ PAST EVENTS ══ */}
        <section aria-label="Past events">
          <div className="ev-past-header">
            <div className="ev-past-header-left">
              <span className="ev-section-label ev-past-label-anim">
                Past Events
              </span>
              <div className="ev-accent-line ev-line-anim" aria-hidden="true" />
            </div>
            <span className="ev-count-badge">{pastEvents.length} events</span>
          </div>

          <div className="ev-past-grid">
            {pastEvents.map((event, idx) => (
              <PastEventCard
                key={event.id}
                event={event}
                index={idx}
                cardRef={(el) => (cardsRef.current[idx] = el)}
                onClick={() => setActiveEvent(event)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ══ MODAL ══ */}
      {activeEvent && (
        <EventModal
          event={activeEvent}
          overlayRef={overlayRef}
          modalRef={modalRef}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default Events;
