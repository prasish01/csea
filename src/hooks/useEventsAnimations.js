import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useEventsAnimations
 * Encapsulates all GSAP animations for the Events section.
 *
 * @param {object} refs - DOM refs from Events.jsx
 * @param {boolean} registered - whether user has registered (re-attaches magnetic btn)
 */
export const useEventsAnimations = (refs, registered) => {
  const {
    sectionRef,
    heroRef,
    heroImgRef,
    spotsBarRef,
    registerRef,
    cardsRef,
  } = refs;

  // ── Page-load + scroll animations ──────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section label slides up
      gsap.from(".ev-label-anim", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });

      // 2. Heading word-by-word reveal (clip-mask style)
      gsap.from(".word-inner", {
        y: "110%",
        duration: 0.85,
        stagger: 0.055,
        ease: "power4.out",
        delay: 0.25,
      });

      // 3. Description fade + drift up
      gsap.from(".ev-desc-anim", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      });

      // 4. Divider line draws left → right
      gsap.from(".ev-line-anim", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.5,
      });

      // 5. Hero card fades up on scroll
      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // 6. Hero image parallax scrub
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          yPercent: 12,
          ease: "none",
        });
      }

      // 7. Spots bar animates to its width on scroll
      if (spotsBarRef.current) {
        gsap.from(spotsBarRef.current, {
          scrollTrigger: {
            trigger: spotsBarRef.current,
            start: "top 90%",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // 8. "Upcoming Event" label slides in from left
      gsap.from(".ev-upcoming-label", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 9. Past cards staggered entrance
      if (cardsRef.current?.length) {
        gsap.from(cardsRef.current, {
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 64,
          opacity: 0,
          stagger: { amount: 0.45, ease: "power1.inOut" },
          duration: 0.75,
          ease: "power3.out",
        });
      }

      // 10. Past section label slides in
      gsap.from(".ev-past-label-anim", {
        scrollTrigger: {
          trigger: ".ev-past-label-anim",
          start: "top 88%",
        },
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // 11. Count badge pops in
      gsap.from(".ev-count-badge", {
        scrollTrigger: {
          trigger: ".ev-count-badge",
          start: "top 88%",
        },
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover on Register button ──────────────────
  useEffect(() => {
    const btn = registerRef.current;
    if (!btn) return;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [registered]);
};

/**
 * Animate modal open — called imperatively when activeEvent changes.
 */
export const animateModalOpen = (overlayEl, modalEl) => {
  gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  gsap.fromTo(
    modalEl,
    { y: 40, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out" },
  );
};

/**
 * GSAP card hover handlers — attach via onMouseEnter / onMouseLeave.
 */
export const onCardEnter = (el) => {
  gsap.to(el, {
    scale: 1.02,
    y: -6,
    duration: 0.35,
    ease: "power2.out",
    boxShadow: "0 28px 56px rgba(150,70,10,0.18)",
  });
};

export const onCardLeave = (el) => {
  gsap.to(el, {
    scale: 1,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.6)",
    boxShadow: "0 2px 12px rgba(150,70,10,0.07)",
  });
};
