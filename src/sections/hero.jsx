import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { logos } from "../constants/index.jsx";

const Hero = () => {
  const heroRef = useRef(null);
  const autcseaRef = useRef(null);
  const createMoreRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const sponsorsRef = useRef(null);
  const logosContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for sequential animations
      const tl = gsap.timeline();

      // AUTCSEA Club - slide from left with opacity
      tl.from(autcseaRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Create More - word by word with letter stagger within each word
      const words = createMoreRef.current.querySelectorAll(".word");
      words.forEach((word, wordIndex) => {
        const letters = word.querySelectorAll(".letter");
        tl.from(
          letters,
          {
            y: 60,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "bottom",
            stagger: 0.08,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          wordIndex === 0 ? "-=0.3" : "-=0.5"
        ); // Adjust timing for subsequent words
      });

      // Description - fade in with slight delay
      tl.from(
        descriptionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Button - same slide animation as AUTCSEA Club
      tl.from(
        buttonRef.current,
        {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Sponsors section - fade in after everything else
      tl.from(
        sponsorsRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Infinite scroll animation for logos
      if (logosContainerRef.current) {
        const logosWidth = logosContainerRef.current.scrollWidth / 2;
        tl.to(
          logosContainerRef.current,
          {
            x: -logosWidth,
            duration: 20,
            ease: "none",
            repeat: -1,
          },
          "+=0.5"
        );
      }
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Split "Create More" into words, then letters within each word
  const createMoreText = "Create More";
  const words = createMoreText.split(" ");

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section
      ref={heroRef}
      className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32"
    >
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div ref={autcseaRef} className="caption small-2 uppercase text-p4">
              AUTCSEA Club
            </div>

            <h1
              ref={createMoreRef}
              className="mb-6 h1 text-white uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
            >
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className="word inline-block mr-3 last:mr-0"
                >
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={`${wordIndex}-${letterIndex}`}
                      className="letter inline-block"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              ref={descriptionRef}
              className="max-w-440 mb-14 body-1 max-md:mb-10"
            >
              A community focused on building impactful projects and developing
              real-world technical skills.
            </p>

            <div ref={buttonRef}>
              <LinkScroll to="features" offset={-100} spy smooth>
                <Button icon="/images/zap.svg">Join Us Now</Button>
              </LinkScroll>
            </div>
          </div>

          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            {/* <img
              src="/images/hero.png"
              className="size-min max-lg:h-auto"
              alt="hero"
            /> */}
          </div>

          {/* Sponsors Section */}
          <div ref={sponsorsRef} className="mt-24">
            <h3 className="text-center h3 text-white mb-12">Our Sponsors</h3>

            {/* Logos Container with Infinite Scroll */}
            <div className="relative overflow-hidden max-lg:hidden">
              <div
                ref={logosContainerRef}
                className="flex items-center"
                style={{ width: "fit-content" }}
              >
                {duplicatedLogos.map(
                  ({ id, url, width, height, title }, index) => (
                    <div key={`${id}-${index}`} className="mx-10 flex-shrink-0">
                      <img
                        src={url}
                        width={width}
                        height={height}
                        alt={title}
                        className="text-p4"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Fallback for mobile - static logos */}
            <ul className="flex justify-center lg:hidden">
              {logos.map(({ id, url, width, height, title }) => (
                <li key={id} className="mx-5">
                  <img
                    src={url}
                    width={width}
                    height={height}
                    alt={title}
                    className="text-p4"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
