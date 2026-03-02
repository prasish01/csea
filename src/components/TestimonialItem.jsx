import clsx from "clsx";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TestimonialItem = ({ item, containerClassName }) => {
  const testimonialRef = useRef(null);
  const commentRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Comment - word by word stagger effect
      const words = commentRef.current.querySelectorAll(".word");
      tl.from(words, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });

      // Photo - slide from left
      tl.from(
        photoRef.current,
        {
          x: -80,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Name and Role - fade in with slight stagger
      tl.from(
        [nameRef.current, roleRef.current],
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, testimonialRef);

    return () => ctx.revert();
  }, []);

  // Split comment into words for staggering
  const words = item.comment.split(" ");

  return (
    <div
      ref={testimonialRef}
      className={clsx(
        "relative px-14 pb-14 pt-11 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-screen after:bg-p3 after:content-[''] max-md:px-0 max-md:pt-11 after:max-md:-right-4",
        containerClassName
      )}
    >
      <blockquote ref={commentRef} className="h6 mb-8 text-p2">
        {words.map((word, index) => (
          <span key={index} className="word inline-block mr-1 last:mr-0">
            {word}
          </span>
        ))}
      </blockquote>

      <div className="flex items-center max-xl:-mr-8">
        <div
          ref={photoRef}
          className="mr-4 size-20 shrink-0 rounded-half border-2 border-p3 p-1.5"
        >
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="size-full object-cover rounded-full"
          />
        </div>
        <div>
          <h4 ref={nameRef} className="body-2 mb-0.5 text-p2">
            {item.name}
          </h4>
          <p ref={roleRef} className="small-compact uppercase text-s3">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
