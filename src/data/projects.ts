export interface Project {
  slug: string;
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  gradient: string;
  tags: string[];
  year: string;
  stat: string;
  statLabel: string;
  client: string;
  duration: string;
  techStack: string[];
  longDescription: string;
}

export const projects: Project[] = [
  {
    slug: "europecalling-crm",
    id: 1,
    category: "Web Platform",
    name: "Europecalling CRM",
    description:
      "A full-scale recruitment CRM built for European hiring pipelines — featuring AI-powered candidate matching, smart dashboards, and end-to-end workflow automation.",
    image: "/images/portfolio/europecalling-crm.png",
    gradient: "linear-gradient(135deg, #005a42 0%, #003366 55%, #001f3f 100%)",
    tags: ["Next.js", "AI Integration", "CRM"],
    year: "2024",
    stat: "3×",
    statLabel: "Faster Hiring",
    client: "Europecalling Ltd.",
    duration: "6 months",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS", "Prisma"],
    longDescription:
      "Europecalling needed a modern, intelligent recruitment platform to replace their fragmented hiring process across multiple European markets. We engineered a full-scale CRM with AI-powered candidate matching that analyses CVs against job descriptions in real time, smart dashboards providing pipeline visibility from sourcing to onboarding, and workflow automation eliminating 60% of manual recruiter tasks. The platform processes thousands of applications daily and has become the backbone of their hiring operations across 8 European offices.",
  },
  {
    slug: "evoka-learning",
    id: 2,
    category: "Mobile App",
    name: "Evoka Learning",
    description:
      "A cross-platform mobile learning app delivering personalized AI-driven study paths, live sessions, and progress tracking for students across skill levels.",
    image: "/images/portfolio/evoka-learning.png",
    gradient: "linear-gradient(135deg, #001f3f 0%, #1a3c5e 55%, #005a42 100%)",
    tags: ["React Native", "AI", "EdTech"],
    year: "2024",
    stat: "10K+",
    statLabel: "Active Learners",
    client: "Evoka Education",
    duration: "8 months",
    techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "Firebase", "Stripe"],
    longDescription:
      "Evoka Education approached us to build a next-generation mobile learning experience. We developed a cross-platform app with an adaptive AI engine that personalises study paths based on individual learning patterns, live interactive sessions with real-time collaboration tools, and comprehensive progress tracking with predictive analytics. The app serves over 10,000 active learners across multiple skill domains, from coding bootcamps to language learning, with a 4.8-star rating on both app stores.",
  },
  {
    slug: "albedo-erp",
    id: 3,
    category: "Enterprise Software",
    name: "Albedo ERP",
    description:
      "An enterprise resource planning system tailored for educational institutions — managing admissions, billing, staff, and student performance in one unified platform.",
    image: "/images/portfolio/albedo-erp.png",
    gradient: "linear-gradient(135deg, #1a3c5e 0%, #003366 55%, #005a42 100%)",
    tags: ["Enterprise", "ERP", "Education"],
    year: "2025",
    stat: "100%",
    statLabel: "Unified Ops",
    client: "Albedo Group",
    duration: "10 months",
    techStack: ["Next.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS"],
    longDescription:
      "Albedo Group needed to replace five disconnected legacy systems with a single, unified platform. We built a comprehensive ERP that centralises admissions pipeline management with automated follow-ups, billing and fee collection with multiple payment gateway integrations, human resources and payroll management, and student performance tracking with parent portals. The system has unified operations for 12 educational campuses, eliminating data silos and reducing administrative overhead by 40%.",
  },
  {
    slug: "codo-ai-assistant",
    id: 4,
    category: "AI Solution",
    name: "CODO AI Assistant",
    description:
      "An intelligent conversational AI assistant deployed across CODO's internal tools — automating repetitive workflows, surfacing insights, and accelerating team velocity.",
    image: "/images/portfolio/codo-ai-assistant.png",
    gradient: "linear-gradient(135deg, #005a42 0%, #001f3f 70%, #00a855 100%)",
    tags: ["LLM", "Automation", "AI"],
    year: "2025",
    stat: "60%",
    statLabel: "Less Manual Work",
    client: "CODO (Internal)",
    duration: "4 months",
    techStack: ["Python", "LangChain", "OpenAI GPT-4", "FastAPI", "React", "Supabase"],
    longDescription:
      "We built our own AI-powered assistant to supercharge internal workflows at CODO. The assistant handles automated code review summaries and PR descriptions, intelligent project status reporting from Jira and GitHub data, conversational database queries replacing manual SQL, and smart document search across company knowledge bases. Deployed across engineering, design, and operations teams, it has reduced manual repetitive work by 60% and dramatically improved cross-team visibility.",
  },
];
