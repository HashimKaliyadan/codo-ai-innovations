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
  client: string;
  duration: string;
  techStack: string[];
  longDescription: string;
  liveUrl?: string;
  gallery: string[];
  challenges: string;
  features: string[];
  developedBy: string[]; // Employee slugs
  outcomes?: { value: number; suffix: string; prefix: string; label: string; sublabel: string }[];
  testimonial?: { quote: string; author: string; role: string };
  palette?: { hex: string; name: string }[];
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
    client: "Europecalling Ltd.",
    duration: "6 months",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS", "Prisma"],
    longDescription:
      "Europecalling needed a modern, intelligent recruitment platform to replace their fragmented hiring process across multiple European markets. We engineered a full-scale CRM with AI-powered candidate matching that analyses CVs against job descriptions in real time, smart dashboards providing pipeline visibility from sourcing to onboarding, and workflow automation eliminating 60% of manual recruiter tasks. The platform processes thousands of applications daily and has become the backbone of their hiring operations across 8 European offices.",
    liveUrl: "https://europecalling.com",
    gallery: [
      "/images/portfolio/europecalling-crm.png",
      "/images/portfolio/europecalling-crm.png",
      "/images/portfolio/europecalling-crm.png",
    ],
    challenges: "The primary challenge was handling the high volume of unstructured CV data across multiple languages while maintaining sub-second matching accuracy. We had to build a custom processing layer for PDF/Docx extraction that could feed into our OpenAI-powered scoring engine without hitting rate limits.",
    features: ["AI-Powered Candidate Ranking", "Real-time Pipeline Analytics", "Automated Interview Scheduling", "Multi-Language Support (8+ Languages)"],
    developedBy: ["mohammed-rashid", "arjun-menon", "vishnu-dev"],
    outcomes: [
      { value: 98, suffix: "%", prefix: "", label: "Matching Accuracy", sublabel: "vs. Manual" },
      { value: 60, suffix: "%", prefix: "", label: "Time Saved", sublabel: "Per Hire" },
      { value: 12, suffix: "k", prefix: "", label: "Active CVs", sublabel: "Processed Daily" },
    ],
    testimonial: {
      quote: "CODO's CRM has transformed how we hire across Europe. The AI matching is terrifyingly accurate and has cut our screening time by more than half.",
      author: "Marcus Thorne",
      role: "Head of Talent"
    },
    palette: [
      { hex: "#005a42", name: "Deep Jungle" },
      { hex: "#003366", name: "Recruit Blue" },
      { hex: "#22c55e", name: "Success Green" },
    ]
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
    client: "Evoka Education",
    duration: "8 months",
    techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "Firebase", "Stripe"],
    longDescription:
      "Evoka Education approached us to build a next-generation mobile learning experience. We developed a cross-platform app with an adaptive AI engine that personalises study paths based on individual learning patterns, live interactive sessions with real-time collaboration tools, and comprehensive progress tracking with predictive analytics. The app serves over 10,000 active learners across multiple skill domains, from coding bootcamps to language learning, with a 4.8-star rating on both app stores.",
    gallery: [
      "/images/portfolio/evoka-learning.png",
      "/images/portfolio/evoka-learning.png",
      "/images/portfolio/evoka-learning.png",
    ],
    challenges: "Developing a real-time collaborative whiteboarding experience on mobile that felt as fluid as a desktop app was a massive hurdle. Synchronising state across thousands of concurrent users during live sessions required a highly optimized WebSocket architecture.",
    features: ["Adaptive Learning Engine", "Interactive Live Classrooms", "Predictive Performance Analytics", "Offline Learning Mode"],
    developedBy: ["sneha-pillai", "vishnu-dev", "arjun-menon"],
    outcomes: [
      { value: 85, suffix: "%", prefix: "", label: "Completion Rate", sublabel: "Course Average" },
      { value: 4.8, suffix: "", prefix: "", label: "App Store Rating", sublabel: "User Love" },
      { value: 10, suffix: "k+", prefix: "", label: "Active Learners", sublabel: "Monthly" },
    ],
    palette: [
      { hex: "#001f3f", name: "Midnight Navy" },
      { hex: "#1a3c5e", name: "Oceanic Blue" },
      { hex: "#22c55e", name: "Growth Green" },
    ]
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
    client: "Albedo Group",
    duration: "10 months",
    techStack: ["Next.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS"],
    longDescription:
      "Albedo Group needed to replace five disconnected legacy systems with a single, unified platform. We built a comprehensive ERP that centralises admissions pipeline management with automated follow-ups, billing and fee collection with multiple payment gateway integrations, human resources and payroll management, and student performance tracking with parent portals. The system has unified operations for 12 educational campuses, eliminating data silos and reducing administrative overhead by 40%.",
    gallery: [
      "/images/portfolio/albedo-erp.png",
      "/images/portfolio/albedo-erp.png",
      "/images/portfolio/albedo-erp.png",
    ],
    challenges: "Merging five legacy datasets with inconsistent schemas into a unified Postgres database without losing historical audit trails. We built a multi-stage migration pipeline that validated data integrity at every step of the process.",
    features: ["Unified Admissions Pipeline", "Multi-Campus Financial Tracking", "Automated Payroll Engine", "Parent Engagement Portal"],
    developedBy: ["arjun-menon", "rahul-krishnan", "priya-nair"],
    outcomes: [
      { value: 40, suffix: "%", prefix: "", label: "Reduced Overhead", sublabel: "Admin Tasks" },
      { value: 12, suffix: "", prefix: "", label: "Campuses Unified", sublabel: "One Source" },
      { value: 100, suffix: "%", prefix: "", label: "Fee Collection", sublabel: "Transparency" },
    ],
    palette: [
      { hex: "#1a3c5e", name: "Structure Blue" },
      { hex: "#003366", name: "Elite Blue" },
      { hex: "#22c55e", name: "Brand Green" },
    ]
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
    client: "CODO (Internal)",
    duration: "4 months",
    techStack: ["Python", "LangChain", "OpenAI GPT-4", "FastAPI", "React", "Supabase"],
    longDescription:
      "We built our own AI-powered assistant to supercharge internal workflows at CODO. The assistant handles automated code review summaries and PR descriptions, intelligent project status reporting from Jira and GitHub data, conversational database queries replacing manual SQL, and smart document search across company knowledge bases. Deployed across engineering, design, and operations teams, it has reduced manual repetitive work by 60% and dramatically improved cross-team visibility.",
    gallery: [
      "/images/portfolio/codo-ai-assistant.png",
      "/images/portfolio/codo-ai-assistant.png",
      "/images/portfolio/codo-ai-assistant.png",
    ],
    challenges: "Fine-tuning the LLM to understand CODO's specific internal terminology and codebase context without security leaks. We implemented a RAG (Retrieval Augmented Generation) architecture with strict vector store access controls.",
    features: ["Context-Aware Code Assistance", "Internal Knowledge Retrieval", "Automated Status Reporting", "Conversational DB Interface"],
    developedBy: ["faisal-rahman", "arjun-menon", "mohammed-rashid"],
    outcomes: [
      { value: 60, suffix: "%", prefix: "", label: "Workflow Boost", sublabel: "Time Saved" },
      { value: 500, suffix: "ms", prefix: "", label: "Response Time", sublabel: "Intelligent Search" },
      { value: 95, suffix: "%", prefix: "", label: "Team Adoption", sublabel: "Within 1 Month" },
    ],
    palette: [
      { hex: "#005a42", name: "AI Depth" },
      { hex: "#001f3f", name: "Logic Blue" },
      { hex: "#22c55e", name: "CODO Green" },
    ]
  },
];
