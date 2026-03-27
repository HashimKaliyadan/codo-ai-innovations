// ─── Employee Type & Data ─────────────────────────────────────────────────────

export interface Employee {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: "Engineering" | "Design" | "Product" | "Operations";
  email: string;
  bio: string;
  joinedYear: number;
  photo: string;
  skills: string[];
  projects?: { title: string; description: string; link?: string }[];
  linkedin?: string;
  github?: string;
  qrUrl: string;
}

export const DEPARTMENT_COLORS: Record<Employee["department"], string> = {
  Engineering: "#22c55e",
  Design: "#22c55e",
  Product: "#22c55e",
  Operations: "#22c55e",
};

export const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Operations"] as const;

export const employees: Employee[] = [
  {
    id: "CODO-2022-001",
    slug: "mohammed-ajmal",
    name: "Mohammed Ajmal NK",
    role: "Founder & CEO",
    department: "Product",
    email: "moajmalnk@codoai.in",
    bio: "Visionary leader with a passion for building AI-powered digital products. Dedicated to scaling technology that serves global communities and cultures.",
    joinedYear: 2022,
    photo: "/team/mohammed-ajmal.jpg",
    skills: ["AI Strategy", "Leadership", "Product Vision"],
    projects: [
      { title: "CODO AI Platform", description: "Led the development of our flagship AI innovation hub." },
      { title: "Enterprise AI Suite", description: "Designed scalable AI solutions for 500+ corporate clients." }
    ],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/mohammed-ajmal",
  },
  {
    id: "CODO-2025-010",
    slug: "aboobacker-fahise",
    name: "Aboobacker Fahise",
    role: "Application Developer",
    department: "Engineering",
    email: "fahis@codoai.in",
    bio: "Skilled application developer focused on building scalable and efficient mobile and web solutions.",
    joinedYear: 2025,
    photo: "/team/aboobacker-fahise.jpg",
    skills: ["Flutter", "React Native", "Firebase"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/aboobacker-fahise",
  },
  {
    id: "CODO-2025-011",
    slug: "mohammed-ajmal-p",
    name: "Mohammed Ajmal P",
    role: "Project Coordinator & Tester",
    department: "Operations",
    email: "moajmalp@codoai.in",
    bio: "Detail-oriented project coordinator and tester ensuring the highest quality standards across all CODO projects.",
    joinedYear: 2025,
    photo: "/team/mohammed-ajmal-p.jpg",
    skills: ["Project Management", "QA Testing", "Agile"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/mohammed-ajmal-p",
  },
  {
    id: "CODO-2025-012",
    slug: "jubairiya",
    name: "Jubairiya",
    role: "Digital Marketing Executive",
    department: "Operations",
    email: "jubairiya@codoai.in",
    bio: "Creative marketing strategist specializing in digital growth and brand positioning for high-tech innovations.",
    joinedYear: 2025,
    photo: "/team/jubairiya.jpg",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/jubairiya",
  },
  {
    id: "CODO-2025-013",
    slug: "ayshath-lubaba",
    name: "Ayshath Lubaba K A",
    role: "Fullstack Developer",
    department: "Engineering",
    email: "lubaba@codoai.in",
    bio: "Versatile fullstack developer with a passion for building seamless, high-performance web applications and robust architectures.",
    joinedYear: 2025,
    photo: "/team/ayshath-lubaba.jpg",
    skills: ["Next.js", "Node.js", "PostgreSQL"],
    projects: [
      { title: "Nexus E-commerce", description: "A high-performance headless commerce engine built with Next.js." },
      { title: "Analytics Dashboard", description: "Real-time data visualization platform for SaaS metrics." }
    ],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/ayshath-lubaba",
  },
  {
    id: "CODO-2025-014",
    slug: "sinan-paravath",
    name: "Sinan Paravath",
    role: "Full-Stack Python Developer",
    department: "Engineering",
    email: "sinan@codoai.in",
    bio: "Python expert with a strong background in full-stack development, specializing in building high-performance backends and interactive frontends.",
    joinedYear: 2025,
    photo: "/team/sinan-paravath.jpg",
    skills: ["Python", "Django", "FastAPI"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/sinan-paravath",
  },
  {
    id: "CODO-2025-015",
    slug: "muhammed-irshad",
    name: "Muhammed Irshad K",
    role: "Full Stack Developer",
    department: "Engineering",
    email: "irshad@codoai.in",
    bio: "Versatile developer experienced in both frontend and backend technologies, focused on creating seamless user experiences and robust web architectures.",
    joinedYear: 2025,
    photo: "/team/muhammed-irshad.jpg",
    skills: ["JavaScript", "React", "Node.js"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/muhammed-irshad",
  },
  {
    id: "CODO-2025-017",
    slug: "sareefa-tp",
    name: "Sareefa TP",
    role: "Full Stack Developer",
    department: "Engineering",
    email: "sareefa@codoai.in",
    bio: "Passionate full stack developer with expertise in building responsive and dynamic web applications. Dedicated to creating seamless user experiences and efficient backends.",
    joinedYear: 2025,
    photo: "/team/sareefa-tp.jpg",
    skills: ["React", "Node.js", "Express"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/sareefa-tp",
  },
  {
    id: "CODO-2025-016",
    slug: "jidhin-t",
    name: "Jidhin T",
    role: "Full Stack Developer",
    department: "Engineering",
    email: "jithin@codoai.in",
    bio: "Expert full stack developer with a passion for clean code and efficient project execution across modern technology stacks.",
    joinedYear: 2025,
    photo: "/team/jidhin-t.jpg",
    skills: ["TypeScript", "Next.js", "SQL"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/jidhin-t",
  },
  {
    id: "CODO-2025-018",
    slug: "abdul-basith",
    name: "Abdul Basith",
    role: "Frontend Developer",
    department: "Engineering",
    email: "basith@codoai.in",
    bio: "Skillful frontend developer specializing in building pixel-perfect, accessible, and high-performance user interfaces using modern web technologies.",
    joinedYear: 2025,
    photo: "/team/abdul-basith.jpg",
    skills: ["Next.js", "Tailwind CSS", "TypeScript"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/abdul-basith",
  },
  {
    id: "CODO-2025-019",
    slug: "mohammed-hashim",
    name: "Mohammed Hashim",
    role: "Python Full-stack Developer",
    department: "Engineering",
    email: "hashim@codoai.in",
    bio: "Versatile developer with a focus on Python-driven architectures and full-stack solutions. Experienced in building scalable APIs and interactive frontends.",
    joinedYear: 2025,
    photo: "/team/mohammed-hashim.jpg",
    skills: ["Python", "Flask", "React"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/mohammed-hashim",
  },
];
