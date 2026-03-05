import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useTeamAnimations
 * All GSAP animations for the Team / Testimonials section.
 *
 * @param {{ sectionRef, headingRef, cardsRef, ctaRef }} refs
 */
export const useTeamAnimations = ({
  sectionRef,
  headingRef,
  cardsRef,
  ctaRef,
}) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Label slides up
      gsap.from(".tm-label-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 2. Heading word-by-word clip reveal
      gsap.from(".tm-word-inner", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: "110%",
        duration: 0.82,
        stagger: 0.06,
        ease: "power4.out",
        delay: 0.1,
      });

      // 3. Underline draws left → right
      gsap.from(".tm-heading-line", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.0,
        ease: "expo.out",
        delay: 0.55,
      });

      // 4. Sub-text fades in
      gsap.from(".tm-sub-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 22,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.75,
        ease: "power3.out",
        delay: 0.25,
      });

      // 5. Cards stagger in with a slight Y + rotationY tilt
      if (cardsRef.current?.length) {
        gsap.set(cardsRef.current, { transformPerspective: 900 });
        gsap.from(cardsRef.current, {
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 64,
          opacity: 0,
          rotationY: 10,
          transformOrigin: "left center",
          stagger: { amount: 0.55, ease: "power1.inOut" },
          duration: 0.78,
          ease: "power3.out",
        });
      }

      // 6. CTA block slides up
      if (ctaRef?.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // 7. Circuit SVG lines draw in via strokeDashoffset
      document.querySelectorAll(".tm-circuit-path").forEach((path) => {
        const len = path.getTotalLength?.() ?? 300;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          strokeDashoffset: 0,
          duration: 2.4,
          ease: "power2.out",
          stagger: 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
};

/**
 * Per-card GSAP mouse-tilt.
 * Call with the scene element + the mouse event.
 * The CSS flip is handled by adding/removing `.is-flipped` class.
 */
export const onCardTiltMove = (el, e) => {
  const rect = el.getBoundingClientRect();
  const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
  const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
  gsap.to(el, {
    rotationX: rx,
    rotationY: ry,
    transformPerspective: 900,
    duration: 0.3,
    ease: "power2.out",
    transformOrigin: "center center",
    overwrite: "auto",
  });
};

export const onCardTiltLeave = (el) => {
  gsap.to(el, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.65,
    ease: "elastic.out(1, 0.55)",
    overwrite: "auto",
  });
};
