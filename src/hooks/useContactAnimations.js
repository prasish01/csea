import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useContactAnimations
 * All GSAP animations for the Contact section.
 *
 * @param {{ sectionRef, formRef, infoRef, submitRef }} refs
 */
export const useContactAnimations = ({
  sectionRef,
  formRef,
  infoRef,
  submitRef,
}) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Label slides up on load
      gsap.from(".ct-label-anim", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });

      // 2. Heading word-by-word clip reveal
      gsap.from(".ct-word-inner", {
        y: "110%",
        duration: 0.85,
        stagger: 0.055,
        ease: "power4.out",
        delay: 0.25,
      });

      // 3. Subtext fade + drift
      gsap.from(".ct-sub-anim", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      });

      // 4. Divider line draws left → right
      gsap.from(".ct-line-anim", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.45,
      });

      // 5. Info cards stagger in from left
      gsap.from(".ct-info-card", {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });

      // 6. Form slides up from right
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.1,
      });

      // 7. Form field labels reveal on scroll
      gsap.from(".ct-field-anim", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
        y: 16,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.25,
      });

      // 8. Big decorative text scrolls horizontally (marquee-like parallax)
      gsap.to(".ct-marquee-inner", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: "-18%",
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 9. Magnetic submit button
  useEffect(() => {
    const btn = submitRef.current;
    if (!btn) return;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);
};

/**
 * Animate a form field focus — call on onFocus of each input/textarea.
 */
export const onFieldFocus = (labelEl) => {
  if (!labelEl) return;
  gsap.to(labelEl, {
    y: -2,
    color: "#c85a00",
    duration: 0.2,
    ease: "power2.out",
  });
};

/**
 * Animate a form field blur — call on onBlur of each input/textarea.
 */
export const onFieldBlur = (labelEl) => {
  if (!labelEl) return;
  gsap.to(labelEl, {
    y: 0,
    color: "rgba(60,30,10,0.45)",
    duration: 0.2,
    ease: "power2.out",
  });
};

/**
 * Animate success state after form submit.
 */
export const animateSuccess = (formEl, successEl) => {
  gsap.to(formEl, {
    y: -12,
    opacity: 0,
    duration: 0.35,
    ease: "power2.in",
    onComplete: () => {
      formEl.style.display = "none";
      gsap.fromTo(
        successEl,
        { y: 20, opacity: 0, display: "flex" },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    },
  });
};
