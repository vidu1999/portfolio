/*
Websites:

- https://github.com/pmndrs/gltfjsx (GLTF JSX for 3D Models)
- https://lucide.dev/icons/ (Lucide Icons)
- https://github.com/anuraghazra/github-readme-stats (Github Readme Stats)
- https://skillicons.dev (Skill Icons to show skills)
- https://github-readme-streak-stats.herokuapp.com (Github Readme Streak Stats)

:root {
  --background: 27 27 27;
  --foreground: 225 225 225;
  --muted: 115 115 115;
  --accent: 254 254 91; #FEFE5B
}

*/

export const projectsData = [
  {
    id: 1,
    title: "Arduino Car",
    subtitle: "Arduino UNO Board Project",
    description: "make arduino car use uno board",
    tech: "Arduino / C++",
    badge: "IOT",
    badgeColor: "from-yellow-400 to-orange-500",
    borderColor: "from-purple-600 via-blue-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.6)",
    techIcon: "▶",
    date: "2022-08-15",
    image: "/projects/arduino.PNG",
    link: "https://github.com/vidu1999/atduinocar",
  },
  {
    id: 2,
    title: "Cricket Game",
    subtitle: "2D Python Game",
    description: "make 2D cricket game using python",
    tech: "Python / Pygame",
    badge: "GAME",
    badgeColor: "from-red-500 to-pink-600",
    borderColor: "from-pink-600 via-purple-500 to-pink-600",
    glowColor: "rgba(236,72,153,0.6)",
    techIcon: "▶",
    date: "2023-07-10",
    image: "/projects/cricket.png",
    link: "https://github.com/vidu1999/cricketgame",
  },
  {
    id: 3,
    title: "Advance Calculator",
    subtitle: "Text Capture Calculator",
    description: "make text capture calculater using python",
    tech: "Python / OpenCV",
    badge: "AI",
    badgeColor: "from-blue-500 to-indigo-600",
    borderColor: "from-indigo-600 via-purple-500 to-indigo-600",
    glowColor: "rgba(99,102,241,0.6)",
    techIcon: "✦",
    date: "2022-09-10",
    image: "/projects/smartcal.png",
    link: "https://github.com/vidu1999/smartcalvulater",
  },
  {
    id: 4,
    title: "Portfolio",
    subtitle: "Portfolio Website",
    description: "Make Portfolio using Html Css and JavaScript",
    tech: "HTML / CSS / JS",
    badge: null,
    badgeColor: "",
    borderColor: "from-cyan-500 via-blue-400 to-cyan-500",
    glowColor: "rgba(6,182,212,0.6)",
    techIcon: "+",
    date: "2022-05-30",
    image: "/projects/port.png",
    link: "https://github.com/vidu1999/portfolio",
  },
  {
    id: 5,
    title: "Student Attendance System",
    subtitle: "Attendance Tracking System",
    description: "make attendence system using python php and Sql",
    tech: "Python / PHP / SQL",
    badge: "BACKEND",
    badgeColor: "from-green-500 to-emerald-600",
    borderColor: "from-emerald-600 via-green-500 to-emerald-600",
    glowColor: "rgba(16,185,129,0.6)",
    techIcon: "✦",
    date: "2022-07-12",
    image: "/projects/attendence.png",
    link: "https://github.com/vidu1999/sstudent_attendence_system",
  },
  {
    id: 6,
    title: "Multiplayer Game",
    subtitle: "Python Multiplayer Game",
    description: "make multiplayer game using python",
    tech: "Python / Pygame",
    badge: "GAME",
    badgeColor: "from-red-500 to-pink-600",
    borderColor: "from-pink-600 via-purple-500 to-pink-600",
    glowColor: "rgba(236,72,153,0.6)",
    techIcon: "▶",
    date: "2022-10-01",
    image: "/projects/multi.png",
    link: "https://github.com/vidu1999/muliplayergame",
  },
  {
    id: 7,
    title: "Education App",
    subtitle: "Python Learning App",
    description: "make python learn App using flutter",
    tech: "Flutter / Dart",
    badge: "MOBILE",
    badgeColor: "from-blue-500 to-cyan-500",
    borderColor: "from-cyan-500 via-blue-400 to-cyan-500",
    glowColor: "rgba(6,182,212,0.6)",
    techIcon: "✦",
    date: "2022-04-18",
    image: "/projects/learnapp.png",
    link: "#",
  },
  {
    id: 8,
    title: "Advance Portfolio",
    subtitle: "3D Interactive Portfolio",
    description: "make portfolio using next.js three.js and talwincss",
    tech: "Next.js / Three.js / Tailwind",
    badge: "3D",
    badgeColor: "from-yellow-400 to-orange-500",
    borderColor: "from-purple-600 via-blue-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.6)",
    techIcon: "▶",
    date: "2024-04-06",
    image: "/projects/3dportfolio.png",
    link: "#",
    featured: true,
  },
  {
    id: 9,
    title: "Language Identification System",
    subtitle: "ML-Based Language Detection",
    description: "make Dumb language Identyfication System using python ML",
    tech: "Python / ML / TensorFlow",
    badge: "ML",
    badgeColor: "from-purple-500 to-pink-600",
    borderColor: "from-purple-600 via-pink-500 to-purple-600",
    glowColor: "rgba(168,85,247,0.6)",
    techIcon: "✦",
    date: "2024-11-22",
    image: "/projects/sign.png",
    link: "https://github.com/vidu1999/dumb_language_identification_system",
  },
  {
    id: 10,
    title: "E-Commerce Site",
    subtitle: "House Rental Platform",
    description: "For find rental house using react.js and talwincss",
    tech: "React.js / Tailwind",
    badge: "WEB",
    badgeColor: "from-blue-500 to-indigo-600",
    borderColor: "from-indigo-600 via-purple-500 to-indigo-600",
    glowColor: "rgba(99,102,241,0.6)",
    techIcon: "✦",
    date: "2024-08-14",
    image: "/projects/rental.png",
    link: "#",
  },
  {
    id: 11,
    title: "Maintenance App",
    subtitle: "Company Maintenance System",
    description: "Create a Maintanance App for Company in my Intern period",
    tech: "React / Node.js",
    badge: "INTERN",
    badgeColor: "from-teal-500 to-cyan-600",
    borderColor: "from-cyan-500 via-teal-400 to-cyan-500",
    glowColor: "rgba(20,184,166,0.6)",
    techIcon: "✦",
    date: "2025-05-04",
    image: "/projects/maintaince.png",
    link: "#",
  },
];
export const testimonials = [
  {
    name: "Rashmi Bhagya",
    role: "Manager, Samadhi Sweet House",
    img: "rash.jpg",  // Replacing avatar with img
    rating: 5,
    text: "Delivers exceptional solutions in software development, specializing in front-end and full-stack development. His expertise in Python, JavaScript, React, and database management ensures efficient, high-quality results.",
    gradient: "from-indigo-500 to-purple-500",
    glow: "rgba(75,85,99,.4)",
  },
  {
    name: "Warsha Yohani",
    role: "Manager, Kavin Sweet House",
    img: "wassi.jpg",  // Replacing avatar with img
    rating: 5,
    text: "From intuitive web applications to AI-driven solutions like sign language recognition, Warsha's technical skills, problem-solving ability, and attention to detail make her a valuable asset in any project.",
    gradient: "from-teal-500 to-blue-500",
    glow: "rgba(34,211,238,.4)",
  },
];
export const BtnList = [
  { label: "Home", link: "/", icon: "home", newTab: false },
  { label: "About", link: "/about", icon: "about", newTab: false },
  { label: "Projects", link: "/projects", icon: "projects", newTab: false },
  { label: "Contact", link: "/contact", icon: "contact", newTab: false },
  {
    label: "Github",
    link: "https://www.github.com/Vidu1999",
    icon: "github",
    newTab: true,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/vidura-kavinda-a76b34204/",
    icon: "linkedin",
    newTab: true,
  },
  {
    label: "X",
    link: "https://www.x.com/Vidura1999",
    icon: "twitter",
    newTab: true,
  },
  {
    label: "Resume",
    link: "/resume",
    icon: "resume",
    newTab: false,
  },
];

export const ImgList=[
  {id: 1,
    name: "one.png",
  },
  {
    id: 2,
    name: "two.png",
  },
  {
    id: 3,
    name: "three.png",
  },
  {
    id: 4,
    name: "four.png",
  }
]


