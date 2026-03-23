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
  linkedin?: string;
  github?: string;
  qrUrl: string;
}

export const DEPARTMENT_COLORS: Record<Employee["department"], string> = {
  Engineering: "#22c55e",
  Design: "#3b82f6",
  Product: "#a855f7",
  Operations: "#f59e0b",
};

export const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Operations"] as const;

export const employees: Employee[] = [
  {
    id: "CODO-2022-001",
    slug: "mohammed-rashid",
    name: "Mohammed Rashid",
    role: "Founder & CEO",
    department: "Product",
    email: "rashid@codoai.in",
    bio: "Serial entrepreneur with 12+ years building AI-powered digital products. Passionate about scaling technology that serves every language and every culture.",
    joinedYear: 2022,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    skills: ["AI Strategy", "Leadership", "Product Vision"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/mohammed-rashid",
  },
  {
    id: "CODO-2022-002",
    slug: "sneha-pillai",
    name: "Sneha Pillai",
    role: "UI/UX Design Director",
    department: "Design",
    email: "sneha@codoai.in",
    bio: "Award-winning designer who bridges aesthetics and usability. Formerly at Razorpay and Swiggy, now crafting premium digital experiences for CODO clients.",
    joinedYear: 2022,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    skills: ["UI/UX", "Design Systems", "Prototyping"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/sneha-pillai",
  },
  {
    id: "CODO-2022-003",
    slug: "arjun-menon",
    name: "Arjun Menon",
    role: "Lead Engineer",
    department: "Engineering",
    email: "arjun@codoai.in",
    bio: "Full-stack architect who lives and breathes scalable systems. Specializes in React, Node.js, and cloud-native architectures. Open source contributor.",
    joinedYear: 2022,
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop",
    skills: ["React", "Node.js", "Cloud Architecture"],
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/arjun-menon",
  },
  {
    id: "CODO-2023-004",
    slug: "faisal-rahman",
    name: "Faisal Rahman",
    role: "AI Engineer",
    department: "Engineering",
    email: "faisal@codoai.in",
    bio: "Machine learning researcher turned engineer. Builds production ML pipelines and NLP systems that power CODO's AI-first product suite.",
    joinedYear: 2023,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    skills: ["Python", "ML/AI", "NLP"],
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/faisal-rahman",
  },
  {
    id: "CODO-2023-005",
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Product Manager",
    department: "Product",
    email: "priya@codoai.in",
    bio: "Data-driven PM who translates complex business requirements into delightful product experiences. Previously at Freshworks managing enterprise SaaS products.",
    joinedYear: 2023,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    skills: ["Product Strategy", "Analytics", "Agile"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/priya-nair",
  },
  {
    id: "CODO-2023-006",
    slug: "rahul-krishnan",
    name: "Rahul Krishnan",
    role: "DevOps Lead",
    department: "Operations",
    email: "rahul@codoai.in",
    bio: "Infrastructure wizard who keeps everything running at scale. Expert in Kubernetes, Terraform, and CI/CD pipelines. Automates everything possible.",
    joinedYear: 2023,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    skills: ["DevOps", "Kubernetes", "AWS"],
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/rahul-krishnan",
  },
  {
    id: "CODO-2024-007",
    slug: "ananya-sharma",
    name: "Ananya Sharma",
    role: "Visual Designer",
    department: "Design",
    email: "ananya@codoai.in",
    bio: "Creative force behind CODO's brand identity and marketing visuals. Blends motion design with illustration to create memorable digital narratives.",
    joinedYear: 2024,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    skills: ["Brand Design", "Motion Graphics", "Illustration"],
    linkedin: "https://linkedin.com",
    qrUrl: "https://codoai.in/team/ananya-sharma",
  },
  {
    id: "CODO-2024-008",
    slug: "vishnu-dev",
    name: "Vishnu Dev",
    role: "Frontend Engineer",
    department: "Engineering",
    email: "vishnu@codoai.in",
    bio: "Pixel-perfect engineer obsessed with performance and accessibility. Turns complex designs into buttery-smooth, responsive interfaces.",
    joinedYear: 2024,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    skills: ["Next.js", "TypeScript", "Animation"],
    github: "https://github.com",
    qrUrl: "https://codoai.in/team/vishnu-dev",
  },
];
