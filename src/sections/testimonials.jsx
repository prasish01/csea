import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../constants/index.jsx";
import TestimonialItem from "../components/TestimonialItem.jsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const halfLength = Math.floor(testimonials.length / 2);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // "Hear from Our Team" - simple word by word stagger
      tl.from(headingRef.current.querySelectorAll(".word"), {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split heading into words for clean stagger
  const headingWords = "Meet Our Team".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative z-2 py-24 md:py-28 lg:py-40 bg-p4"
    >
      <div className="container block lg:flex">
        <div className="testimonials_head-res relative z-2 mr-20 flex-300">
          <p className="caption mb-5 max-md:mb-2.5">Inside the Club</p>
          <h3 ref={headingRef} className="h3 max-md:h5 text-p2">
            {headingWords.map((word, index) => (
              <span key={index} className="word inline-block mr-2 last:mr-0">
                {word}
              </span>
            ))}
          </h3>
        </div>

        <div className="testimonials_inner-after testimonials_inner-before relative -my-12 -mr-3 flex items-start max-lg:static max-md:block">
          <div className="testimonials_group-after flex-50">
            {testimonials.slice(0, halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden last:after:max-md:block"
              />
            ))}
          </div>

          <div className="flex-50">
            {testimonials.slice(halfLength).map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                item={testimonial}
                containerClassName="last:after:hidden after:right-auto after:left-0 after:max-md:-left-4 md:px-12"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
