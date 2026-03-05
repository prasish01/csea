import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useHeroAnimations
 *
 * @param {{
 *   heroRef, badgeRef, subRef, ctaRef,
 *   statsRef, sponsorsRef, logosRef, scrollCueRef
 * }} refs
 */
export const useHeroAnimations = (refs) => {
  const {
    heroRef,
    badgeRef,
    subRef,
    statsRef,
    sponsorsRef,
    logosRef,
    scrollCueRef,
  } = refs;

  // ── Master entrance timeline ──────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set perspective on heading container for real 3-D flips
      gsap.set(".hr-heading-3d", {
        perspective: 900,
        perspectiveOrigin: "50% 50%",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Badge drops from above with blur
      tl.from(
        badgeRef.current,
        {
          y: -28,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.7,
        },
        0.2,
      );

      // 2. Letters 3-D flip in (rotationX on each .hr-letter)
      tl.from(
        ".hr-letter",
        {
          rotationX: -90,
          y: 40,
          opacity: 0,
          transformOrigin: "50% 100%",
          stagger: { amount: 0.75, ease: "power1.inOut" },
          duration: 0.75,
          ease: "back.out(1.6)",
        },
        0.45,
      );

      // 3. Accent underline draws L → R
      tl.from(
        ".hr-underline",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.0,
          ease: "expo.out",
        },
        1.05,
      );

      // 4. Sub-text blurs in
      tl.from(
        subRef.current,
        {
          y: 30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.75,
        },
        1.2,
      );

      // 5. CTA buttons stagger up
      tl.from(
        ".hr-cta-btn",
        {
          y: 26,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
        },
        1.4,
      );

      // 6. Stats slide up
      tl.from(
        ".hr-stat",
        {
          y: 32,
          opacity: 0,
          stagger: 0.1,
          duration: 0.55,
        },
        1.6,
      );

      // Count each stat number from 0 to target
      document.querySelectorAll(".hr-stat-num").forEach((el) => {
        const end = parseInt(el.dataset.val, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: end,
            duration: 1.8,
            ease: "power1.inOut",
            onUpdate() {
              el.textContent = Math.round(obj.val) + suffix;
            },
          },
          1.65,
        );
      });

      // 7. Sponsors row
      tl.from(
        sponsorsRef.current,
        {
          y: 28,
          opacity: 0,
          duration: 0.65,
        },
        1.85,
      );

      // 8. Scroll cue draws down
      if (scrollCueRef?.current) {
        tl.from(
          scrollCueRef.current,
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.9,
            ease: "power2.out",
          },
          2.2,
        );
      }

      // 9. Infinite logo marquee (starts after entrance completes)
      if (logosRef?.current) {
        const w = logosRef.current.scrollWidth / 2;
        gsap.to(logosRef.current, {
          x: -w,
          duration: 24,
          ease: "none",
          repeat: -1,
          delay: 2.3,
        });
      }

      // 10. Content parallax out on scroll
      gsap.to(".hr-main-content", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1.2,
        },
        y: -90,
        opacity: 0.15,
        ease: "none",
      });

      // 11. Background mesh drifts up on scroll
      gsap.to(".hr-mesh", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        yPercent: -14,
        ease: "none",
      });

      // 12. Grid lines subtle drift on scroll
      gsap.to(".hr-grid-lines", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        yPercent: -10,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Cursor-tracked radial spotlight ───────────────────
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      gsap.to(hero, {
        "--sx": `${x}%`,
        "--sy": `${y}%`,
        duration: 0.65,
        ease: "power2.out",
      });
    };

    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  // ── Floating decorative elements ──────────────────────
  useEffect(() => {
    gsap.to(".hr-deco-a", {
      y: -20,
      rotation: 4,
      duration: 3.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(".hr-deco-b", {
      y: 16,
      rotation: -5,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.1,
    });
    gsap.to(".hr-deco-c", {
      y: -12,
      rotation: 2,
      duration: 4.0,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });
  }, []);
};
