import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";

/* =======================
   Project Data (Demo)
   ======================= */

const projects = [
  {
    id: 1,
    title: "Chess Event Organiser",
    shortDesc:
      "A web platform to organise chess tournaments, manage players, and track match progress.",
    banner: "/images/project-3.png",
    overview:
      "Chess Event Organiser is a student-led project aimed at simplifying how chess tournaments are planned and managed within university clubs.",
    features: [
      "Create and manage tournaments",
      "Player registration and brackets",
      "Match tracking and results",
      "Clean, beginner-friendly interface",
    ],
    highlights: [
      "Student-led initiative",
      "Real-world club usage",
      "Scalable structure",
    ],
    techStack: ["React", "JavaScript", "Tailwind CSS", "Figma"],
  },
  {
    id: 2,
    title: "Campus Event Tracker",
    shortDesc:
      "A centralised platform to discover events, workshops, and activities across campus.",
    banner: "/images/project-2.png",
    overview:
      "Campus Event Tracker helps students stay updated with academic and social events happening across the university in one place.",
    features: [
      "Event listings with filters",
      "Club and society dashboards",
      "Responsive design for mobile users",
      "Simple admin event posting",
    ],
    highlights: [
      "Improves student engagement",
      "Mobile-first approach",
      "Easy to scale for multiple campuses",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Firebase"],
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    shortDesc:
      "A modern chat application supporting rooms, reactions, and real-time messaging.",
    banner: "/images/project-3.png",
    overview:
      "This project explores real-time communication using WebSockets, focusing on performance, usability, and clean UI design.",
    features: [
      "Real-time messaging with WebSockets",
      "Public and private chat rooms",
      "Emoji reactions and message status",
      "Optimised for low latency",
    ],
    highlights: [
      "Real-time architecture",
      "Production-style structure",
      "Scalable messaging system",
    ],
    techStack: ["React", "Node.js", "WebSocket"],
  },
];

/* =======================
   Component
   ======================= */

const ProjectsPage = () => {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);

  /* Page entrance animation */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Modal animation */
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );

      gsap.fromTo(
        modalRef.current,
        { y: 40, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeProject]);

  /* Close modal on ESC */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section ref={sectionRef} className="bg-p4 py-28 max-md:py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="relative mb-12">
          <div className="w-full h-64 bg-p1 rounded-2xl" />
          <h2 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
            Current Projects at AUTCSEA
          </h2>
        </div>

        {/* Intro */}
        <p className="fade-up text-center text-p2 max-w-3xl mx-auto mb-16">
          These projects are built by students to solve real problems,
          experiment with modern technologies, and gain hands-on experience.
        </p>

        {/* Projects Grid */}
        <div className="fade-up grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="cursor-pointer bg-[#fcc591] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={project.banner}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-p1 text-2xl font-semibold mb-3">
                  {project.title}
                </h3>
                <p className="text-p5 mb-4">{project.shortDesc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-p2 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6"
          onClick={() => setActiveProject(null)}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-p4 rounded-3xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-10 text-white text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div className="w-full h-[420px] bg-p3 flex items-center justify-center">
              <img
                src={activeProject.banner}
                alt={activeProject.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-10 max-md:p-6">
              <h3 className="text-3xl font-bold text-p1 mb-3">
                {activeProject.title}
              </h3>

              <p className="text-p2 mb-8 max-w-3xl">{activeProject.overview}</p>

              <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-p1 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-p2 list-disc pl-5">
                    {activeProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-lg font-semibold text-p1 mb-3">
                    Project Highlights
                  </h4>
                  <ul className="space-y-2 text-p2 list-disc pl-5">
                    {activeProject.highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-10">
                <h4 className="text-lg font-semibold text-p1 mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-p2 text-white px-4 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;
