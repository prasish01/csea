export const testimonials = [
  {
    id: "0",
    name: "Ali Mojdehi",
    role: "President",
    avatar: "/images/testimonials/ali.png",
    quote:
      "I enjoy building connections with other clubs and organizations, helping our members access more opportunities and experiences.",
    linkedin: "https://linkedin.com/in/ali-mojdehi",
    techStack: ["Go", "GraphQL", "Linux"],
  },
  {
    id: "1",
    name: "Humam Al-Taiff",
    role: "Vice President",
    avatar: "/images/testimonials/humam.webp",
    quote:
      "I am a Data-driven Computer Science student passionate about uncovering insights from complex datasets and delivering precise, reliable analysis that supports meaningful decisions.",
    linkedin: "https://www.linkedin.com/in/humam-al-taiff-bb3a87273/",
    techStack: ["Next.js", "Tailwind CSS", "Firebase"],
  },
  {
    id: "2",
    name: "Fateh Bhular",
    role: "General Executive",
    avatar: "/images/testimonials/fateh.webp",
    quote:
      "I love helping bridge the gap between students and the tech industry, and lending a hand anytime!",
    linkedin: "https://linkedin.com/in/param-patel",
    techStack: ["Python", "PostgreSQL", "Docker"],
  },
  {
    id: "3",
    name: "Irene Kim",
    role: "Social Media Manager",
    avatar: "/images/testimonials/irene.webp",
    quote:
      "Professional memory-collector and unofficial behind-the-scenes spy. At CSEA, I get to document the fun, the techy events, and the moments that make our club what it is.",
    linkedin: "https://linkedin.com",
    techStack: ["Vue.js", "Node.js", "Figma"],
  },
  {
    id: "4",
    name: "Lydia Cowan ",
    role: "Engineering Lead",
    avatar: "/images/testimonials/lydia.webp",
    quote:
      "Keeping the club organized and running smoothly is rewarding, and it's amazing to see ideas turn into real projects.",
    linkedin: "https://linkedin.com/",
    techStack: ["Go", "GraphQL", "Linux"],
  },
  {
    id: "5",
    name: "Sam Sajch",
    role: "General Executive",
    avatar: "/images/testimonials/sam.webp",
    quote:
      "Promoting our club and sharing our story is exciting, and seeing students get inspired by our events is the best part.",
    linkedin: "https://www.linkedin.com/in/samuel-sajch/",
    techStack: ["Figma", "Webflow", "Canva"],
  },
];

export const socials = [
  {
    id: "0",
    title: "x",
    icon: "/images/socials/x.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Threads",
    icon: "/images/socials/threads.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    icon: "/images/socials/instagram.svg",
    url: "https://www.instagram.com/autcsea",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/images/socials/discord.svg",
    url: "https://discord.com/invite/AUQFxgxd",
  },
];

export const latestEvent = {
  id: 1,
  title: "Internsip 101",
  date: "Tuesday, 10 March 2026",
  time: "6:00 PM – 8:00 PM",
  location: "AUT City Campus, WG Building – Room 416",
  images: [
    "/images/events/internship-1.jpg",
    "/images/events/internship-2.jpg",
    "/images/events/internship-3.jpg",
  ],
  description: `Join us for Internship 101, where a panel of multiple students will share their firsthand experiences from summer internships at tech companies!

Our panel features intern guest speakers in Software Engineering, Cybersecurity, and IT Infrastructure from top companies like Deloitte, Endace, Visa and more.

Hear their firsthand experiences, challenges, and career tips—this is your chance to get the inside scoop on landing and thriving in a tech internship! ✨`,
  spotsLeft: 12,
  totalSpots: 60,
  tags: ["Workshop", "Open to All", "Games"],
  registerLink: "https://forms.gle/B35sLWsog8cmdyKm9",
};

export const pastEvents = [
  {
    id: 2,
    title: "Internship 101",
    date: "10 March 2026",
    location: "WG Building – Room 416",
    images: [
      "/images/events/internship-1.jpg",
      "/images/events/internship-2.jpg",
      "/images/events/internship-3.jpg",
    ],
    summary:
      "A panel event where students shared their internship experiences in Software Engineering, Cybersecurity, and IT Infrastructure at companies like Deloitte, Visa, and Endace.",
    highlights: ["Industry insights", "Guest speakers", "Career tipss"],
  },
  {
    id: 3,
    title: "STEM Socializer",
    date: "3 March 2026",
    location: "WZ Level 3",
    images: [
      "/images/events/socializer-1.jpg",
      "/images/events/socializer-2.jpg",
      "/images/events/socializer-3.jpg",
    ],
    summary:
      "A casual networking event for STEM students to meet, connect, and build friendships within the AUT tech community.",
    highlights: [
      "Student networking",
      "Community building",
      "Games & conversations",
    ],
  },
  {
    id: 4,
    title: "Club Expo",
    date: "23 February 2024",
    location: "Hikuwai Plaza",
    images: [
      "/images/events/expo-1.jpg",
      "/images/events/expo-2.jpg",
      "/images/events/internship-3.jpg",
    ],
    summary:
      "AUTCSEA participated in the AUT Club Expo to introduce the club to new students and showcase upcoming events and opportunities.",
    highlights: ["Meet team", "Signups", "Merch & Giveaways"],
  },
];

export const logos = [
  {
    id: "0",
    title: "Afterpay",
    url: "/images/logos/afterpay.png ",
    width: 156,
    height: 48,
  },
  {
    id: "1",
    title: "Amplitude",
    url: "/images/logos/amplitude.png ",
    width: 194,
    height: 48,
  },
  {
    id: "2",
    title: "Sonos",
    url: "/images/logos/sonos.png ",
    width: 115,
    height: 48,
  },
  {
    id: "3",
    title: "Maze",
    url: "/images/logos/maze.png ",
    width: 142,
    height: 48,
  },
  {
    id: "4",
    title: "Drips",
    url: "/images/logos/drips.png ",
    width: 77,
    height: 48,
  },
];

export const Instagram = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      fill="#EAEDFF"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>
  );
};

export const Discord = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      fill="#EAEDFF"
      viewBox="0 0 16 16"
    >
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
    </svg>
  );
};

export const Web = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5484 0.847986C11.8284 2.95995 11.3164 5.15192 10.9164 7.34388C14.6285 6.92789 18.3727 6.92789 22.0848 7.34388C21.6848 5.15192 21.1728 2.97595 20.4528 0.847986C20.4307 0.759613 20.4238 0.686493 20.4164 0.607564C20.4131 0.572174 20.4097 0.535616 20.4048 0.495992C19.1567 0.191997 17.8447 0 16.5006 0C15.1405 0 13.8445 0.191997 12.5804 0.495992C12.5741 0.546895 12.5728 0.592737 12.5715 0.637543C12.5696 0.7054 12.5677 0.770896 12.5484 0.847986Z"
        fill="#EAEDFF"
      />
      <path
        d="M24.8211 7.67982C26.8852 8.03181 28.9172 8.52781 30.9333 9.1358C29.3493 5.82385 26.6771 3.15189 23.365 1.56792C23.989 3.56789 24.485 5.61585 24.8211 7.67982Z"
        fill="#EAEDFF"
      />
      <path
        d="M9.54034 30.2556C9.51633 30.2556 9.48833 30.2636 9.46033 30.2716C9.43233 30.2796 9.40433 30.2876 9.38033 30.2876C6.27619 28.7517 3.74809 26.2077 2.19602 23.1037C2.19602 23.0797 2.20402 23.0517 2.21202 23.0237C2.22002 22.9957 2.22802 22.9677 2.22802 22.9437C4.1801 23.5197 6.19619 23.9517 8.19628 24.2877C8.54829 26.3037 8.96431 28.3037 9.54034 30.2556Z"
        fill="#EAEDFF"
      />
      <path
        d="M30.8053 23.1197C29.2213 26.3037 26.5811 28.8797 23.365 30.4316C23.973 28.3997 24.485 26.3517 24.8211 24.2877C26.8372 23.9517 28.8212 23.5197 30.7733 22.9437C30.7637 22.9823 30.7772 23.0208 30.7896 23.0558C30.7977 23.079 30.8053 23.1006 30.8053 23.1197Z"
        fill="#EAEDFF"
      />
      <path
        d="M9.54041 1.74401C8.96438 3.69598 8.54836 5.67994 8.21235 7.69591C6.14826 8.01591 4.10017 8.5279 2.06808 9.13589C3.62015 5.91994 6.19626 3.27998 9.3804 1.69601C9.4044 1.69601 9.4324 1.70801 9.4604 1.72001C9.4884 1.73201 9.51641 1.74401 9.54041 1.74401Z"
        fill="#EAEDFF"
      />
      <path
        d="M7.84432 21.5836C5.63622 21.1836 3.46013 20.6716 1.34804 19.9516C1.27094 19.9324 1.20545 19.9305 1.13759 19.9286C1.09278 19.9273 1.04693 19.926 0.996021 19.9196C0.692008 18.6557 0.5 17.3597 0.5 15.9997C0.5 14.6557 0.692008 13.3437 0.996021 12.0958C1.03565 12.0908 1.07221 12.0874 1.1076 12.0841C1.18653 12.0767 1.25966 12.0699 1.34804 12.0478C3.47613 11.3438 5.63622 10.8158 7.84432 10.4158C7.4443 14.1277 7.4443 17.8717 7.84432 21.5836Z"
        fill="#EAEDFF"
      />
      <path
        d="M32.005 19.9196C32.309 18.6557 32.501 17.3597 32.501 15.9997C32.501 14.6557 32.309 13.3597 32.005 12.0958C31.877 12.0958 31.781 12.0798 31.653 12.0478C29.5409 11.3278 27.3488 10.8158 25.1567 10.4158C25.5727 14.1277 25.5727 17.8717 25.1567 21.5836C27.3488 21.1836 29.5249 20.6556 31.653 19.9516C31.7301 19.9324 31.7956 19.9305 31.8635 19.9286C31.9083 19.9273 31.9541 19.926 32.005 19.9196Z"
        fill="#EAEDFF"
      />
      <path
        d="M22.0848 24.6554C21.6848 26.8633 21.1728 29.0393 20.4528 31.1513C20.4307 31.2396 20.4238 31.3128 20.4164 31.3917C20.4131 31.4271 20.4097 31.4636 20.4048 31.5033C19.1567 31.8073 17.8447 31.9993 16.5006 31.9993C15.1405 31.9993 13.8445 31.8073 12.5804 31.5033C12.5741 31.4524 12.5728 31.4065 12.5715 31.3617C12.5696 31.2939 12.5677 31.2284 12.5484 31.1513C11.8444 29.0233 11.3164 26.8633 10.9164 24.6554C12.7724 24.8634 14.6285 25.0074 16.5006 25.0074C18.3727 25.0074 20.2448 24.8634 22.0848 24.6554Z"
        fill="#EAEDFF"
      />
      <path
        d="M10.4793 22.0209C14.4812 22.5258 18.5205 22.5258 22.5224 22.0209C23.0274 18.0192 23.0274 13.9802 22.5224 9.97847C18.5205 9.47358 14.4812 9.47358 10.4793 9.97847C9.97434 13.9802 9.97434 18.0192 10.4793 22.0209Z"
        fill="#EAEDFF"
      />
    </svg>
  );
};

export const Linkedin = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="32"
      fill="#EAEDFF"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
};
export const links = [
  {
    id: "0",
    title: "Discord",
    icon: <Discord />,
    url: "https://discord.com/invite/AUQFxgxd",
  },
  {
    id: "1",
    title: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/autcsea",
  },
  {
    id: "2",
    title: "LinkedIn",
    icon: <Linkedin />,
    url: "https://www.linkedin.com/company/autcsea/",
  },
  {
    id: "3",
    title: "Web",
    icon: <Web />,
    url: "#",
  },
];

export const projects = [
  {
    id: 1,
    title: "Chess Event Organiser",
    shortDesc:
      "A web platform to organise chess tournaments, manage players, and track match progress.",
    images: [
      "/images/project-1.png",
      "/images/project-2.png",
      "/images/project-3.png",
    ],
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
    images: [
      "/images/project-2.png",
      "/images/project-3.png",
      "/images/project-1.png",
    ],
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
      "Easy to scale",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Firebase"],
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    shortDesc:
      "A modern chat application supporting rooms, reactions, and real-time messaging.",
    images: [
      "/images/project-3.png",
      "/images/project-1.png",
      "/images/project-2.png",
    ],
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
      "Scalable messaging",
    ],
    techStack: ["React", "Node.js", "WebSocket"],
  },
];
