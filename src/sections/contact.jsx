import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/contact.css";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────────────────── */
const Icons = {
  Mail: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Discord: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  MapPin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Send: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ArrowDown: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────
   Starfield canvas
───────────────────────────────────────────────────────── */
const StarField = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.2 + 0.04,
      alpha: Math.random() * 0.7 + 0.2,
      flicker: Math.random() * 0.01 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const a = s.alpha + Math.sin(t * s.flicker * 60 + s.phase) * 0.25;
        const dx = s.x - mouse.x,
          dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = dist < 140 ? (1 - dist / 140) * 1.8 : 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + boost * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${(160 + boost * 40) | 0},${(100 + boost * 30) | 0},${Math.min(1, a + boost * 0.5)})`;
        ctx.fill();

        s.y -= s.speed;
        if (s.y < -5) {
          s.y = canvas.height + 5;
          s.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
  return null;
};

/* ─────────────────────────────────────────────────────────
   Confetti
───────────────────────────────────────────────────────── */
const triggerConfetti = () => {
  const colors = [
    "#ff4d00",
    "#ff8c42",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
  ];
  Array.from({ length: 80 }).forEach((_, i) => {
    const el = document.createElement("div");
    el.className = "ct-confetti-piece";
    el.style.cssText = `background:${colors[i % colors.length]};left:${Math.random() * 100}vw;top:-10px`;
    document.body.appendChild(el);
    gsap.to(el, {
      y: `${80 + Math.random() * 60}vh`,
      x: `${(Math.random() - 0.5) * 280}px`,
      rotation: Math.random() * 720,
      opacity: 0,
      duration: 2 + Math.random() * 1.5,
      ease: "power1.out",
      delay: Math.random() * 0.4,
      onComplete: () => el.remove(),
    });
  });
};

/* Konami code */
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const useKonami = (cb) => {
  const seq = useRef([]);
  useEffect(() => {
    const h = (e) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(",") === KONAMI.join(",")) {
        cb();
        seq.current = [];
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [cb]);
};

/* ─────────────────────────────────────────────────────────
   Main Contact
───────────────────────────────────────────────────────── */
const Contact = () => {
  const pageRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const bgTextRef = useRef(null);
  const infoColRef = useRef(null);
  const formColRef = useRef(null);
  const formInnerRef = useRef(null);
  const successRef = useRef(null);
  const planeRef = useRef(null);
  const hintRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ── Cursor glow ──────────────────────────────────────
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e) =>
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: "power2.out",
      });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── BG text parallax ─────────────────────────────────
  useEffect(() => {
    const el = bgTextRef.current;
    if (!el) return;
    const move = (e) => {
      gsap.to(el, {
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
        duration: 1.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Entrance animations ───────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.to(".ct-eyebrow", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.to(".ct-title-word", {
        y: "0%",
        duration: 0.9,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.45,
      });
      gsap.to(".ct-subtitle", {
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.65,
      });
      gsap.to(".ct-hero-cta", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.to(".ct-scroll-cue", { opacity: 1, duration: 0.6, delay: 1.0 });

      // Body columns on scroll
      gsap.to(infoColRef.current, {
        scrollTrigger: { trigger: infoColRef.current, start: "top 85%" },
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.to(formColRef.current, {
        scrollTrigger: { trigger: formColRef.current, start: "top 85%" },
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.1,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Submit → paper plane overlay ─────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverlay(true);
    requestAnimationFrame(() => {
      if (!planeRef.current) return;
      gsap.fromTo(
        planeRef.current,
        { x: "-130vw", y: 20, rotation: -15, opacity: 1 },
        {
          x: "0vw",
          y: 0,
          rotation: 0,
          duration: 1.0,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(planeRef.current, {
              x: "130vw",
              y: -60,
              rotation: 15,
              duration: 0.7,
              ease: "power2.in",
              delay: 0.7,
            });
            gsap.to(".ct-success-overlay-title", {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
            });
            gsap.to(".ct-success-overlay-msg", {
              opacity: 1,
              duration: 0.6,
              delay: 0.5,
            });
            gsap.to(".ct-success-back", {
              opacity: 1,
              duration: 0.5,
              delay: 0.7,
            });
          },
        },
      );
    });
  };

  // ── Easter egg: konami ────────────────────────────────
  const onKonami = useCallback(() => {
    triggerConfetti();
    if (hintRef.current) {
      hintRef.current.textContent = "you found it! nice moves 🎉";
      hintRef.current.classList.add("peek");
      setTimeout(() => hintRef.current?.classList.remove("peek"), 4000);
    }
  }, []);

  useKonami(onKonami);

  // Idle hint
  useEffect(() => {
    const t = setTimeout(() => {
      if (hintRef.current) {
        hintRef.current.classList.add("peek");
        setTimeout(() => hintRef.current?.classList.remove("peek"), 3500);
      }
    }, 14000);
    return () => clearTimeout(t);
  }, []);

  // Footer click x7
  const clickCount = useRef(0);
  const handleFooterClick = () => {
    if (++clickCount.current >= 7) {
      triggerConfetti();
      clickCount.current = 0;
    }
  };

  const infoItems = [
    { Icon: Icons.Mail, label: "Email", val: "hello@autcsea.co.nz" },
    { Icon: Icons.Discord, label: "Discord", val: "discord.gg/autcsea" },
    { Icon: Icons.MapPin, label: "Location", val: "AUT City Campus, Auckland" },
    { Icon: Icons.Clock, label: "Club Hours", val: "Wed & Fri · 12–2 PM" },
  ];

  const socialLinks = [
    { Icon: Icons.Twitter, href: "#", label: "Twitter" },
    { Icon: Icons.Instagram, href: "#", label: "Instagram" },
    { Icon: Icons.LinkedIn, href: "#", label: "LinkedIn" },
  ];

  return (
    <div ref={pageRef} className="ct-page mt-12">
      <canvas ref={canvasRef} className="ct-canvas" />
      <StarField canvasRef={canvasRef} />
      <div ref={cursorRef} className="ct-cursor-glow" aria-hidden="true" />

      {/* ══ HERO ══ */}
      <section className="ct-hero">
        <div ref={bgTextRef} className="ct-hero-bg-text" aria-hidden="true">
          CONNECT
        </div>

        <p className="ct-eyebrow ct-mono">
          <span className="ct-eyebrow-dot" />
          AUTCSEA · Auckland, NZ
        </p>

        <h1 className="ct-title ct-serif">
          <span className="ct-title-line">
            <span className="ct-title-word">Let's</span>
          </span>
          <span className="ct-title-line">
            <span className="ct-title-word ct-title-accent">Connect.</span>
          </span>
        </h1>

        <p className="ct-subtitle">
          Got a project idea, want to collaborate, or just want to say hi? We're
          builders — drop us a message.
        </p>

        <a href="#ct-body" className="ct-hero-cta ct-serif">
          Get in touch
          <Icons.ArrowDown />
        </a>

        <div className="ct-scroll-cue" aria-hidden="true">
          <div className="ct-scroll-line" />
          <span className="ct-scroll-label ct-mono">Scroll</span>
        </div>
      </section>

      {/* ══ BODY ══ */}
      <div className="ct-body" id="ct-body">
        {/* ── Info column ── */}
        <div ref={infoColRef} className="ct-info-col">
          <h2 className="ct-info-heading ct-serif">Say hello</h2>
          <p className="ct-info-sub">
            We'd love to hear from you. Here's where you can find us.
          </p>

          <div className="ct-info-list">
            {infoItems.map(({ Icon, label, val }) => (
              <div key={label} className="ct-info-item">
                <div className="ct-info-icon">
                  <Icon />
                </div>
                <div>
                  <p className="ct-info-label ct-mono">{label}</p>
                  <p className="ct-info-val">{val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ct-social-row">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="ct-social-btn"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ── Form column ── */}
        <div ref={formColRef} className="ct-form-col">
          <div className="ct-form-card">
            {/* Form */}
            <div ref={formInnerRef}>
              <h3 className="ct-form-title ct-serif">Send a message</h3>
              <p className="ct-form-sub">
                We'll get back to you within 1–2 business days.
              </p>

              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-field-label ct-mono">Name</label>
                    <input
                      className="ct-input"
                      type="text"
                      name="name"
                      placeholder="Alex Johnson"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="ct-field">
                    <label className="ct-field-label ct-mono">Email</label>
                    <input
                      className="ct-input"
                      type="email"
                      name="email"
                      placeholder="alex@aut.ac.nz"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-field-label ct-mono">Type</label>
                  <div className="ct-select-wrap">
                    <select
                      className="ct-select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a reason...
                      </option>
                      <option value="project">Project Idea</option>
                      <option value="collab">Collaboration</option>
                      <option value="join">Join the Club</option>
                      <option value="sponsor">Sponsorship</option>
                      <option value="general">General Enquiry</option>
                    </select>
                    <Icons.ChevronDown />
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-field-label ct-mono">Message</label>
                  <textarea
                    className="ct-textarea"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="ct-submit-btn">
                  <Icons.Send />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SUCCESS OVERLAY ══ */}
      {showOverlay && (
        <div ref={overlayRef} className="ct-success-overlay visible">
          <span ref={planeRef} className="ct-plane" aria-hidden="true">
            ✈️
          </span>
          <h2 className="ct-success-overlay-title ct-serif">Message Sent!</h2>
          <p className="ct-success-overlay-msg">
            Thanks for reaching out, {formData.name || "friend"}! We'll get back
            to you shortly.
          </p>
          <button
            className="ct-success-back"
            onClick={() => {
              setShowOverlay(false);
              setFormData({ name: "", email: "", type: "", message: "" });
            }}
          >
            ← Send another
          </button>
        </div>
      )}

      {/* ══ FOOTER ══ */}
      <div className="ct-footer-strip">
        <span
          className="ct-footer-label ct-mono"
          onClick={handleFooterClick}
          style={{ cursor: "default" }}
        >
          AUT Computer Science &amp; Engineering Association
        </span>
        <a
          href="mailto:hello@autcsea.co.nz"
          className="ct-footer-email ct-serif"
        >
          hello@autcsea.co.nz →
        </a>
      </div>

      {/* Easter egg hint */}
      <div ref={hintRef} className="ct-easter-hint ct-mono">
        ↑↑↓↓←→←→ b a — try it
      </div>
    </div>
  );
};

export default Contact;
