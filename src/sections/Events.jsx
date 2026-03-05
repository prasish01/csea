// import { useRef, useEffect, useState } from "react";
// import ImageCarousel from "../components/Imagecarousel";
// import { latestEvent, pastEvents } from "../constants/index";
// import {
//   useEventsAnimations,
//   animateModalOpen,
//   onCardEnter,
//   onCardLeave,
// } from "../hooks/useEventsAnimations";
// import "../styles/events.css";

// /* ─────────────────────────────────────────────────────────
//    Sub-components
// ───────────────────────────────────────────────────────── */

// /** Splits text into word spans for GSAP clip-mask reveal */
// const SplitWords = ({ text, accent = false }) => (
//   <span className={`ev-split-line${accent ? " ev-heading-accent" : ""}`}>
//     {text.split(" ").map((word, i) => (
//       <span key={i} className="word-clip">
//         <span className="word-inner">{word}</span>
//       </span>
//     ))}
//   </span>
// );

// /** Semi-transparent tag pill overlaid on images */
// const Tag = ({ children }) => <span className="ev-tag">{children}</span>;

// /** Single meta row (date / time / location) */
// const MetaRow = ({ icon, value }) => (
//   <div className="ev-meta-row">
//     <div className="ev-meta-icon">{icon}</div>
//     <span>{value}</span>
//   </div>
// );

// /** Orange highlight pill used in past event cards and modal */
// const Pill = ({ children }) => <span className="ev-pill">{children}</span>;

// /* ─────────────────────────────────────────────────────────
//    Past Event Card
// ───────────────────────────────────────────────────────── */
// const PastEventCard = ({ event, index, cardRef, onClick }) => (
//   <article
//     ref={cardRef}
//     className="ev-past-card"
//     onClick={onClick}
//     onMouseEnter={(e) => onCardEnter(e.currentTarget)}
//     onMouseLeave={(e) => onCardLeave(e.currentTarget)}
//   >
//     {/* Image */}
//     <div className="ev-card-img-wrap" onClick={(e) => e.stopPropagation()}>
//       <ImageCarousel images={event.images} alt={event.title} />
//       <span className="ev-card-index" aria-hidden="true">
//         {String(index + 1).padStart(2, "0")}
//       </span>
//     </div>

//     {/* Body */}
//     <div className="ev-card-body">
//       <div className="ev-card-meta">
//         <span className="ev-card-date">{event.date}</span>
//         <span className="ev-card-location">📍 {event.location}</span>
//       </div>
//       <h4 className="ev-card-title ev-serif">{event.title}</h4>
//       <p className="ev-card-summary">{event.summary}</p>
//       <div className="ev-pill-row">
//         {event.highlights.map((h, i) => (
//           <Pill key={i}>{h}</Pill>
//         ))}
//       </div>
//     </div>

//     {/* Footer */}
//     <div className="ev-card-footer">
//       <span className="ev-card-footer-label">View details</span>
//       <span className="ev-card-footer-arrow" aria-hidden="true">
//         →
//       </span>
//     </div>
//   </article>
// );

// /* ─────────────────────────────────────────────────────────
//    Past Event Modal
// ───────────────────────────────────────────────────────── */
// const EventModal = ({ event, overlayRef, modalRef, onClose }) => (
//   <div
//     ref={overlayRef}
//     className="ev-modal-overlay"
//     onClick={onClose}
//     role="dialog"
//     aria-modal="true"
//     aria-label={event.title}
//   >
//     <div
//       ref={modalRef}
//       className="ev-modal"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Carousel */}
//       <div className="ev-modal-img-wrap">
//         <ImageCarousel images={event.images} alt={event.title} />
//         <button
//           onClick={onClose}
//           className="ev-modal-close"
//           aria-label="Close modal"
//         >
//           ×
//         </button>
//       </div>

//       {/* Content */}
//       <div className="ev-modal-body">
//         <div className="ev-pill-row">
//           <Pill>📅 {event.date}</Pill>
//           <Pill>📍 {event.location}</Pill>
//         </div>
//         <h3 className="ev-modal-title ev-serif">{event.title}</h3>
//         <p className="ev-modal-summary">{event.summary}</p>
//         <hr className="ev-modal-divider" />
//         <p className="ev-section-label">Highlights</p>
//         <div className="ev-pill-row" style={{ marginTop: "10px" }}>
//           {event.highlights.map((h, i) => (
//             <Pill key={i}>{h}</Pill>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────
//    Main Events Section
// ───────────────────────────────────────────────────────── */
// const Events = () => {
//   // ── Refs ──────────────────────────────────────────────
//   const sectionRef = useRef(null);
//   const heroRef = useRef(null);
//   const heroImgRef = useRef(null);
//   const spotsBarRef = useRef(null);
//   const registerRef = useRef(null);
//   const cardsRef = useRef([]);
//   const modalRef = useRef(null);
//   const overlayRef = useRef(null);

//   // ── State ─────────────────────────────────────────────
//   const [activeEvent, setActiveEvent] = useState(null);
//   const [registered, setRegistered] = useState(false);

//   // ── Animations ────────────────────────────────────────
//   useEventsAnimations(
//     { sectionRef, heroRef, heroImgRef, spotsBarRef, registerRef, cardsRef },
//     registered,
//   );

//   // ── Modal side-effects ────────────────────────────────
//   useEffect(() => {
//     if (!activeEvent) {
//       document.body.style.overflow = "";
//       return;
//     }
//     document.body.style.overflow = "hidden";
//     animateModalOpen(overlayRef.current, modalRef.current);
//   }, [activeEvent]);

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") setActiveEvent(null);
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);

//   // ── Derived values ────────────────────────────────────
//   const spotsPercent = Math.round(
//     ((latestEvent.totalSpots - latestEvent.spotsLeft) /
//       latestEvent.totalSpots) *
//       100,
//   );

//   const metaItems = [
//     { icon: "📅", value: latestEvent.date },
//     { icon: "🕙", value: latestEvent.time },
//     { icon: "📍", value: latestEvent.location },
//   ];

//   // ─────────────────────────────────────────────────────
//   return (
//     <section ref={sectionRef} className="ev-page mt-12">
//       {/* ══ PAGE HEADER ══ */}
//       <header className="ev-header ">
//         <div className="ev-header-inner ">
//           <div>
//             <p className="ev-section-label ev-label-anim">AUTCSEA</p>
//             <h1 className="ev-heading ev-serif">
//               <SplitWords text="Events &" />
//               <SplitWords text="Happenings" accent />
//             </h1>
//           </div>

//           <p className="ev-desc ev-desc-anim">
//             From beginner workshops to competitive tournaments — everything
//             happening at AUT's Computer Science &amp; Engineering Association.
//           </p>
//         </div>

//         <div className="ev-header-divider ev-line-anim" />
//       </header>

//       <div className="ev-wrap">
//         {/* ══ UPCOMING EVENT ══ */}
//         <section className="ev-upcoming-section" aria-label="Upcoming event">
//           <div className="ev-upcoming-label">
//             <span className="ev-pulse-dot" aria-hidden="true" />
//             <span className="ev-section-label">Upcoming Event</span>
//           </div>

//           <div ref={heroRef} className="ev-hero-card">
//             {/* Image side with parallax wrapper */}
//             <div className="ev-hero-img-side">
//               <div ref={heroImgRef} className="ev-hero-parallax-wrap">
//                 <ImageCarousel
//                   images={latestEvent.images}
//                   alt={latestEvent.title}
//                 />
//               </div>
//               <div className="ev-hero-tags">
//                 {latestEvent.tags.map((tag, i) => (
//                   <Tag key={i}>{tag}</Tag>
//                 ))}
//               </div>
//             </div>

//             {/* Info side */}
//             <div className="ev-hero-info">
//               <div>
//                 <h2 className="ev-hero-title ev-serif">{latestEvent.title}</h2>
//                 <p className="ev-hero-desc">{latestEvent.description}</p>

//                 <div className="ev-meta-list">
//                   {metaItems.map(({ icon, value }) => (
//                     <MetaRow key={value} icon={icon} value={value} />
//                   ))}
//                 </div>

//                 {/* Capacity bar */}
//                 <div className="ev-spots-wrap">
//                   <div className="ev-spots-labels">
//                     <span className="ev-spots-count">
//                       {latestEvent.totalSpots - latestEvent.spotsLeft} /{" "}
//                       {latestEvent.totalSpots} registered
//                     </span>
//                     <span className="ev-spots-left">
//                       {latestEvent.spotsLeft} spots left
//                     </span>
//                   </div>
//                   <div className="ev-bar-track">
//                     <div
//                       ref={spotsBarRef}
//                       className="ev-bar-fill"
//                       style={{ width: `${spotsPercent}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* CTA */}
//               {registered ? (
//                 <div className="ev-registered-msg">
//                   ✓ You're registered! See you there.
//                 </div>
//               ) : (
//                 <button
//                   ref={registerRef}
//                   className="ev-register-btn"
//                   onClick={() => setRegistered(true)}
//                 >
//                   Reserve Your Spot →
//                 </button>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* ══ PAST EVENTS ══ */}
//         <section aria-label="Past events">
//           <div className="ev-past-header">
//             <div className="ev-past-header-left">
//               <span className="ev-section-label ev-past-label-anim">
//                 Past Events
//               </span>
//               <div className="ev-accent-line ev-line-anim" aria-hidden="true" />
//             </div>
//             <span className="ev-count-badge">{pastEvents.length} events</span>
//           </div>

//           <div className="ev-past-grid">
//             {pastEvents.map((event, idx) => (
//               <PastEventCard
//                 key={event.id}
//                 event={event}
//                 index={idx}
//                 cardRef={(el) => (cardsRef.current[idx] = el)}
//                 onClick={() => setActiveEvent(event)}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* ══ MODAL ══ */}
//       {activeEvent && (
//         <EventModal
//           event={activeEvent}
//           overlayRef={overlayRef}
//           modalRef={modalRef}
//           onClose={() => setActiveEvent(null)}
//         />
//       )}
//     </section>
//   );
// };

// export default Events;

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

const MetaRow = ({ icon, value }) => (
  <div className="ev-meta-row">
    <div className="ev-meta-icon">{icon}</div>
    <span>{value}</span>
  </div>
);

const Pill = ({ children }) => <span className="ev-pill">{children}</span>;

/* ─────────────────────────────────────────────────────────
   3D Tilt helpers
───────────────────────────────────────────────────────── */
const applyTilt = (el, e) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -6;
  const rotateY = ((x - cx) / cx) * 6;
  gsap.to(el, {
    rotateX,
    rotateY,
    transformPerspective: 1000,
    ease: "power2.out",
    duration: 0.4,
  });
};

const resetTilt = (el) => {
  gsap.to(el, {
    rotateX: 0,
    rotateY: 0,
    ease: "elastic.out(1, 0.4)",
    duration: 0.8,
  });
};

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
          <Pill>📅 {event.date}</Pill>
          <Pill>📍 {event.location}</Pill>
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
   Ticker strip data
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
  // ── Refs ──────────────────────────────────────────────
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const heroCardRef = useRef(null);
  const heroImgRef = useRef(null);
  const spotsBarRef = useRef(null);
  const registerRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const cursorGlowRef = useRef(null);

  // ── State ─────────────────────────────────────────────
  const [activeEvent, setActiveEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

  // ── Cursor glow tracker ─────────────────────────────
  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;
    const move = (e) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Entrance + scroll animations ────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading word clip reveal ──
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

      // ── Counter bar count-up ──
      const counters = document.querySelectorAll(
        ".ev-counter-val [data-count]",
      );
      counters.forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        gsap.from(
          { val: 0 },
          {
            scrollTrigger: { trigger: ".ev-counter-bar", start: "top 90%" },
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              el.textContent = Math.round(this.targets()[0].val);
            },
          },
        );
      });

      // ── Hero card float in ──
      gsap.to(heroCardRef.current, {
        scrollTrigger: { trigger: heroCardRef.current, start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      // ── Hero parallax on scroll ──
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

      // ── Spots bar width animate ──
      const spotsPercent = Math.round(
        ((latestEvent.totalSpots - latestEvent.spotsLeft) /
          latestEvent.totalSpots) *
          100,
      );
      if (spotsBarRef.current) {
        gsap.to(spotsBarRef.current, {
          scrollTrigger: { trigger: spotsBarRef.current, start: "top 90%" },
          width: `${spotsPercent}%`,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      // ── Register button float in ──
      gsap.from(registerRef.current, {
        scrollTrigger: { trigger: registerRef.current, start: "top 92%" },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        delay: 0.5,
      });

      // ── Past section label ──
      gsap.to(".ev-past-label-anim", {
        scrollTrigger: { trigger: ".ev-past-header", start: "top 88%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // ── Past event cards cascade in ──
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

  // ── Modal effects ────────────────────────────────────
  useEffect(() => {
    if (!activeEvent) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    // Animate overlay + modal
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
    const handleEsc = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeEvent]);

  // ── Magnetic register button ─────────────────────────
  const handleRegisterMove = (e) => {
    const btn = registerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleRegisterLeave = () => {
    gsap.to(registerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const metaItems = [
    { icon: "📅", value: latestEvent.date },
    { icon: "🕙", value: latestEvent.time },
    { icon: "📍", value: latestEvent.location },
  ];

  const doubledTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section ref={sectionRef} className="ev-page mt-12">
      {/* Cursor glow */}
      <div ref={cursorGlowRef} className="ev-cursor-glow" aria-hidden="true" />

      {/* ══ TICKER STRIP ══ */}
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

      {/* ══ PAGE HEADER ══ */}
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

      {/* ══ COUNTER BAR ══ */}
      <div className="ev-counter-bar">
        {[
          { count: pastEvents.length, suffix: "", label: "Past Events" },
          {
            count: latestEvent.totalSpots - latestEvent.spotsLeft,
            suffix: "+",
            label: "Registered",
          },
          { count: latestEvent.spotsLeft, suffix: "", label: "Spots Left" },
          { count: 2025, suffix: "", label: "Season" },
        ].map(({ count, suffix, label }) => (
          <div key={label} className="ev-counter-item">
            <span className="ev-counter-val">
              <span data-count={count}>{count}</span>
              <span>{suffix}</span>
            </span>
            <span className="ev-counter-label">{label}</span>
          </div>
        ))}
      </div>

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
                <p className="ev-hero-desc">{latestEvent.description}</p>

                <div className="ev-meta-list">
                  {metaItems.map(({ icon, value }) => (
                    <MetaRow key={value} icon={icon} value={value} />
                  ))}
                </div>

                <div className="ev-spots-wrap">
                  <div className="ev-spots-labels">
                    <span className="ev-spots-count">
                      {latestEvent.totalSpots - latestEvent.spotsLeft} /{" "}
                      {latestEvent.totalSpots} registered
                    </span>
                    <span className="ev-spots-left">
                      {latestEvent.spotsLeft} spots left
                    </span>
                  </div>
                  <div className="ev-bar-track">
                    <div
                      ref={spotsBarRef}
                      className="ev-bar-fill"
                      style={{ width: "0%" }}
                    />
                  </div>
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
                  onClick={() => setRegistered(true)}
                  onMouseMove={handleRegisterMove}
                  onMouseLeave={handleRegisterLeave}
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
