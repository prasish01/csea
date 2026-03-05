import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useProjectsAnimations
 * All GSAP animations for the Projects section.
 *
 * @param {{ sectionRef, cardsRef }} refs
 */
export const useProjectsAnimations = ({ sectionRef, cardsRef }) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section label slides up
      gsap.from(".pr-label-anim", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });

      // 2. Heading word-by-word clip reveal
      gsap.from(".pr-word-inner", {
        y: "110%",
        duration: 0.85,
        stagger: 0.055,
        ease: "power4.out",
        delay: 0.25,
      });

      // 3. Description fade + drift up
      gsap.from(".pr-desc-anim", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.55,
      });

      // 4. Divider line draws left → right
      gsap.from(".pr-line-anim", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.45,
      });

      // 5. Grid header slides in on scroll
      gsap.from(".pr-grid-header", {
        scrollTrigger: { trigger: ".pr-grid-header", start: "top 88%" },
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // 6. Count badge pops in
      gsap.from(".pr-count-badge", {
        scrollTrigger: { trigger: ".pr-count-badge", start: "top 90%" },
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.15,
      });

      // 7. Cards staggered entrance on scroll
      if (cardsRef.current?.length) {
        gsap.from(cardsRef.current, {
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 70,
          opacity: 0,
          stagger: { amount: 0.5, ease: "power1.inOut" },
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
};

/**
 * Animate modal open — called imperatively when activeProject changes.
 */
export const animateProjectModalOpen = (overlayEl, modalEl) => {
  gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  gsap.fromTo(
    modalEl,
    { y: 44, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
  );
};

/**
 * Card hover handlers — attach via onMouseEnter / onMouseLeave.
 */
export const onProjectCardEnter = (el) => {
  gsap.to(el, {
    y: -8,
    duration: 0.35,
    ease: "power2.out",
    boxShadow: "0 32px 64px rgba(120, 55, 0, 0.2)",
  });
};

export const onProjectCardLeave = (el) => {
  gsap.to(el, {
    y: 0,
    duration: 0.55,
    ease: "elastic.out(1, 0.55)",
    boxShadow: "0 4px 16px rgba(120, 55, 0, 0.08)",
  });
};
