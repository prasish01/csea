import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";

const latestEvent = {
  id: 1,
  title: "AUT Chess Open 2025",
  date: "Saturday, 15 March 2025",
  time: "10:00 AM – 5:00 PM",
  location: "AUT City Campus, WG Building – Room 402",
  banner: "/images/project-3.png",
  description:
    "Join us for our biggest tournament of the year! The AUT Chess Open 2025 is open to all students — from complete beginners to seasoned players. Compete for prizes, meet fellow chess enthusiasts, and enjoy a full day of competitive play.",
  spotsLeft: 12,
  totalSpots: 60,
  tags: ["Tournament", "Open to All", "Prizes"],
  registerLink: "#",
};

const pastEvents = [
  {
    id: 2,
    title: "End-of-Year Chess Blitz",
    date: "8 November 2024",
    location: "WG Building – Room 301",
    banner: "/images/project-2.png",
    summary:
      "A fast-paced blitz tournament wrapping up Semester 2. 38 players competed across 7 rapid rounds.",
    highlights: ["38 participants", "7 rounds", "3 prizes awarded"],
  },
  {
    id: 3,
    title: "Beginners Workshop Series",
    date: "April – May 2024",
    location: "Online (Zoom)",
    banner: "/images/project-3.png",
    summary:
      "A four-session online workshop introducing chess fundamentals to new students. Over 50 people attended at least one session.",
    highlights: ["4 sessions", "50+ attendees", "Free to join"],
  },
  {
    id: 4,
    title: "Inter-Club Friendly Match",
    date: "20 August 2024",
    location: "AUT South Campus",
    banner: "/images/project-2.png",
    summary:
      "AUTCSEA faced off against the UoA Chess Club in a friendly inter-university match. A great day of chess and camaraderie.",
    highlights: ["2 clubs", "20 boards", "Friendly format"],
  },
];

/* =======================
   Component
   ======================= */

const EventsPage = () => {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [activeEvent, setActiveEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

  /* Page entrance animation */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Modal animation */
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );
      gsap.fromTo(
        modalRef.current,
        { y: 40, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeEvent]);

  /* ESC to close modal */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveEvent(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const spotsPercent = Math.round(
    ((latestEvent.totalSpots - latestEvent.spotsLeft) /
      latestEvent.totalSpots) *
      100,
  );

  return (
    <section ref={sectionRef} className="bg-p4 py-28 max-md:py-20">
      <div className="container mx-auto px-6">
        {/* ── Header Banner ── */}
        <div className="relative mb-12">
          <div className="w-full h-64 bg-p1 rounded-2xl" />
          <h2 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
            Events at AUTCSEA
          </h2>
        </div>

        {/* ── Intro ── */}
        <p className="fade-up text-center text-p2 max-w-3xl mx-auto mb-16">
          From beginner workshops to competitive tournaments — stay in the loop
          with everything happening at the AUT Computer Science & Engineering
          Association.
        </p>

        {/* ══════════════════════════════
            LATEST EVENT
        ══════════════════════════════ */}
        <div className="fade-up mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <h3 className="text-p1 text-xl font-semibold uppercase tracking-widest text-sm">
              Upcoming Event
            </h3>
          </div>

          <div className="bg-[#fcc591] rounded-3xl overflow-hidden shadow-lg grid grid-cols-2 max-lg:grid-cols-1">
            {/* Image */}
            <div className="relative h-full min-h-[320px] max-lg:min-h-[240px]">
              <img
                src={latestEvent.banner}
                alt={latestEvent.title}
                className="w-full h-full object-cover"
              />
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {latestEvent.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-p1 text-white text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-10 max-md:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-p1 text-3xl font-bold mb-4">
                  {latestEvent.title}
                </h3>
                <p className="text-p5 mb-6 leading-relaxed">
                  {latestEvent.description}
                </p>

                {/* Meta */}
                <div className="space-y-2 mb-8 text-p2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{latestEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕙</span>
                    <span>{latestEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{latestEvent.location}</span>
                  </div>
                </div>

                {/* Spots progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-p2 mb-1">
                    <span>
                      {latestEvent.totalSpots - latestEvent.spotsLeft}{" "}
                      registered
                    </span>
                    <span>{latestEvent.spotsLeft} spots left</span>
                  </div>
                  <div className="w-full h-2 bg-p4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-p1 rounded-full transition-all duration-700"
                      style={{ width: `${spotsPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Register Button */}
              {registered ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-2xl text-center font-semibold">
                  ✓ You're registered! See you there.
                </div>
              ) : (
                <button
                  onClick={() => setRegistered(true)}
                  className="bg-p1 text-white px-8 py-3 rounded-2xl font-semibold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 w-full"
                >
                  Register Now →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            PAST EVENTS
        ══════════════════════════════ */}
        <div className="fade-up">
          <h3 className="text-p1 text-xl font-semibold uppercase tracking-widest text-sm mb-6">
            Past Events
          </h3>

          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setActiveEvent(event)}
                className="cursor-pointer bg-[#fcc591] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white font-semibold text-sm">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-p2 mb-1 font-medium">
                    {event.date}
                  </p>
                  <h4 className="text-p1 text-xl font-semibold mb-2">
                    {event.title}
                  </h4>
                  <p className="text-p5 text-sm mb-4 line-clamp-2">
                    {event.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="bg-p2 text-white px-3 py-1 rounded-full text-xs"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          PAST EVENT MODAL
      ══════════════════════════════ */}
      {activeEvent && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6"
          onClick={() => setActiveEvent(null)}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-p4 rounded-3xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 z-10 text-white text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div className="w-full h-64 bg-p3 flex items-center justify-center">
              <img
                src={activeEvent.banner}
                alt={activeEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-10 max-md:p-6">
              <p className="text-xs text-p2 mb-1 font-medium uppercase tracking-wide">
                {activeEvent.date} · {activeEvent.location}
              </p>
              <h3 className="text-3xl font-bold text-p1 mb-4">
                {activeEvent.title}
              </h3>
              <p className="text-p2 mb-8">{activeEvent.summary}</p>

              <h4 className="text-lg font-semibold text-p1 mb-3">
                Event Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeEvent.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="bg-p2 text-white px-4 py-1 rounded-full text-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsPage;
