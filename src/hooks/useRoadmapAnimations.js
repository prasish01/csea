import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useRoadmapAnimations — entrance & ambient only.
 * Node interaction (fill path, hover scale) is handled inline in Roadmap.jsx
 * because it needs access to React state.
 */
export const useRoadmapAnimations = ({
  sectionRef,
  headingRef,
  bgPathRef,
  nodesRef,
  linksRef,
}) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Label
      gsap.from(".rd-label-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 2. Heading word clip
      gsap.from(".rd-word-inner", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        y: "110%",
        duration: 0.82,
        stagger: 0.06,
        ease: "power4.out",
        delay: 0.1,
      });

      // 3. Heading underline
      gsap.from(".rd-heading-line", {
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.0,
        ease: "expo.out",
        delay: 0.55,
      });

      // 4. Subtext
      gsap.from(".rd-sub-anim", {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 22,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.75,
        ease: "power3.out",
        delay: 0.25,
      });

      // 5. Dashed background path draws in on scroll
      if (bgPathRef?.current) {
        const len = bgPathRef.current.getTotalLength?.() ?? 1600;
        gsap.set(bgPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(bgPathRef.current, {
          scrollTrigger: {
            trigger: ".rd-path-area",
            start: "top 78%",
            end: "bottom 25%",
            scrub: 1.6,
          },
          strokeDashoffset: 0,
          ease: "none",
        });
      }

      // 6. Nodes pop in
      nodesRef?.current?.filter(Boolean).forEach((node, i) => {
        gsap.from(node, {
          scrollTrigger: {
            trigger: ".rd-path-area",
            start: `top ${84 - i * 3}%`,
            toggleActions: "play none none none",
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2.2)",
          delay: i * 0.05,
        });
      });

      // 7. Detail panel slides in from right
      gsap.from(".rd-detail-panel", {
        scrollTrigger: { trigger: ".rd-path-area", start: "top 78%" },
        x: 30,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.3,
      });

      // 8. Stat bar items stagger
      gsap.from(".rd-stat-item", {
        scrollTrigger: { trigger: ".rd-stat-bar", start: "top 92%" },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });

      // 9. Legend items
      gsap.from(".rd-legend-item", {
        scrollTrigger: { trigger: ".rd-stat-bar", start: "top 92%" },
        y: 12,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power2.out",
        delay: 0.2,
      });

      // 10. Social links
      linksRef?.current?.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          scale: 0.5,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
          delay: 0.5 + i * 0.08,
        });
      });

      // 11. Ambient orb pulse
      gsap.to(".rd-orb-pulse", {
        scale: 1.2,
        opacity: 0.7,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 12. Background grid parallax
      gsap.to(".rd-bg-grid", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        yPercent: -10,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
};
