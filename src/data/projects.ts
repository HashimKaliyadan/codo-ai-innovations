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
      "A specialist travel consultancy offering custom tour packages, visa guidance, and expert support across Europe and Eurasia.",
    image: "/images/portfolio/Europecalling-project.png",
    gradient: "linear-gradient(135deg, #FFD700 0%, #000000 100%)",
    tags: ["Next.js", "AI Integration", "CRM"],
    year: "2024",
    client: "Europecalling Ltd.",
    duration: "6 months",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS", "Prisma"],
    longDescription:
      "Europe Calling is a Malayalee-led, Azerbaijan-based travel consultancy specializing in curated Eurasian and European travel. They provide expert local knowledge, 24/7 dedicated support, and hassle-free documentation for journeys through Azerbaijan, Kazakhstan, Georgia, Uzbekistan, and beyond. Their mission is to help travelers experience the finest European landscapes and cultures with ease.",
    liveUrl: "https://europecalling.com",
    gallery: [
      "/images/portfolio/Europecalling-one.png",
      "/images/portfolio/Europecalling-two.png",
      "/images/portfolio/Europecalling-three.png",
    ],
    challenges: "The primary challenge was handling the high volume of unstructured CV data across multiple languages while maintaining sub-second matching accuracy. We had to build a custom processing layer for PDF/Docx extraction that could feed into our OpenAI-powered scoring engine without hitting rate limits.",
    features: ["Tailored European Tour Packages", "Expert Visa & Documentation Guidance", "24/7 On-Trip Support", "Eurasian Destination Specialists"],
    developedBy: ["mohammed-ajmal", "arjun-menon", "vishnu-dev"],
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
      { hex: "#FFD700", name: "Europe Gold" },
      { hex: "#FF7700", name: "Accent Orange" }
    ]
  },
  {
    slug: "thazqu-islamic-study",
    id: 2,
    category: "EdTech Platform",
    name: "Thazqu Islamic Study",
    description:
      "A modern digital platform providing structured and accessible Islamic education, specializing in Quranic studies, Arabic language, and Islamic values for a global audience.",
    image: "/images/portfolio/thazquedu-project.png",
    gradient: "linear-gradient(135deg, #004D40 0%, #FFC107 100%)",
    tags: ["Online Learning", "EdTech", "Islamic Studies"],
    year: "2024",
    client: "Thazqu Education",
    duration: "6 months",
    techStack: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    longDescription:
      "Thazqu Islamic Study was developed to bridge the gap between traditional Islamic education and modern digital accessibility. The platform offers a comprehensive curriculum including Tajweed, Hifz, and Tafseer, delivered through a personalized one-to-one learning model. With a focus on quality and structure, it serves students of all ages across the globe, providing a seamless and engaging learning experience through its innovative digital interface.",
    liveUrl: "https://thazquedu.com/",
    gallery: [
      "/images/portfolio/thazquedu-one.png",
      "/images/portfolio/thazquedu-two.png",
      "/images/portfolio/thazquedu-three.png",
    ],
    challenges: "The main challenge was creating a real-time interactive classroom environment that supports complex Arabic typography and Tajweed notation while maintaining low latency for global users.",
    features: ["Personalized One-to-One Tutoring", "Structured Quranic Curriculum", "Interactive Digital Classroom", "Global Progress Tracking"],
    developedBy: ["mohammed-ajmal", "vishnu-dev"],
    outcomes: [
      { value: 5000, suffix: "+", prefix: "", label: "Active Students", sublabel: "Worldwide" },
      { value: 50, suffix: "+", prefix: "", label: "Certified Tutors", sublabel: "Expert Scholars" },
      { value: 95, suffix: "%", prefix: "", label: "Satisfaction Rate", sublabel: "Student Feedback" },
    ],
    palette: [
      { hex: "#004D40", name: "Deep Teal" },
      { hex: "#FFC107", name: "Amber Gold" },
      { hex: "#FFFFFF", name: "Pure White" }
    ]
  },
  {
    slug: "albedo-erp",
    id: 3,
    category: "Enterprise Software",
    name: "Albedo ERP",
    description:
      "A high-quality online tuition platform for Classes 4 to 10, delivering personalized one-to-one learning for Kerala syllabus, CBSE, and ICSE students.",
    image: "/images/portfolio/albedo-project.png",
    gradient: "linear-gradient(135deg, #6366f1 0%, #000000 100%)",
    tags: ["Enterprise", "ERP", "Education"],
    year: "2025",
    client: "Albedo Group",
    duration: "10 months",
    techStack: ["Next.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS"],
    liveUrl: "https://albedoedu.com/",
    longDescription:
      "Albedo Educator provides the best online tuition in Kerala with a focus on personalized one-to-one learning. Designed for students in Classes 4 to 10, the platform offers expert subject tutors for Kerala State, CBSE, and ICSE boards. With flexible scheduling and regular feedback for parents, Albedo ensures a fundamental understanding of subjects through tailored instruction that meets each student's unique needs.",
    gallery: [
      "/images/portfolio/albedo-one.png",
      "/images/portfolio/albedo-two.png",
      "/images/portfolio/albedo-three.png",
    ],
    challenges: "Merging five legacy datasets with inconsistent schemas into a unified Postgres database without losing historical audit trails. We built a multi-stage migration pipeline that validated data integrity at every step of the process.",
    features: ["Personalised One-to-One Learning", "Syllabus Expertise (Kerala/CBSE/ICSE)", "Experienced Subject Tutors", "Flexible Scheduling & Progress Tracking"],
    developedBy: ["arjun-menon", "rahul-krishnan", "priya-nair"],
    outcomes: [
      { value: 40, suffix: "%", prefix: "", label: "Reduced Overhead", sublabel: "Admin Tasks" },
      { value: 12, suffix: "", prefix: "", label: "Campuses Unified", sublabel: "One Source" },
      { value: 100, suffix: "%", prefix: "", label: "Fee Collection", sublabel: "Transparency" },
    ],
    palette: [
      { hex: "#6366f1", name: "Albedo Purple" }
    ]
  },
  {
    slug: "kug-oriental-academy",
    id: 4,
    category: "Health Tech / Education",
    name: "KUG Oriental Academy",
    description:
      "A government-recognized holistic health institute in Kerala offering professional diploma courses in Acupuncture, Ayurveda, and Yoga.",
    image: "/images/portfolio/Kug-project.png",
    gradient: "linear-gradient(135deg, #FFC107 0%, #004D40 100%)",
    tags: ["Health Tech", "Education", "Acupuncture"],
    year: "2025",
    client: "KUG Oriental",
    duration: "4 months",
    techStack: ["React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS"],
    longDescription:
      "KUG Oriental Academy is an ISO-certified institution dedicated to bridging the gap between traditional healing and modern science. Offering comprehensive training in Acupuncture, Ayurveda Panchakarma, and Yoga, the academy provides students with expert-led theory and hands-on clinical exposure at affiliated centers. With a 98% placement rate and valid government-recognized certifications, it empowers the next generation of holistic health professionals.",
    liveUrl: "https://kugoriental.com/",
    gallery: [
      "/images/portfolio/Kug-one.png",
      "/images/portfolio/Kug-two.png",
      "/images/portfolio/Kug-three.png",
    ],
    challenges: "The primary challenge was designing a digital curriculum delivery system that effectively integrates complex physiological diagrams and traditional medical concepts into an accessible online-first framework.",
    features: ["ISO-Certified & Govt Recognized", "Expert Clinical Training", "Comprehensive Wellness Curriculum", "High Placement Success"],
    developedBy: ["faisal-rahman", "arjun-menon", "mohammed-ajmal"],
    outcomes: [
      { value: 300, suffix: "+", prefix: "", label: "Successful Grads", sublabel: "Wellness Careers" },
      { value: 98, suffix: "%", prefix: "", label: "Placement Rate", sublabel: "Career Support" },
      { value: 100, suffix: "%", prefix: "", label: "Valid Certs", sublabel: "Govt Recognized" },
    ],
    palette: [
      { hex: "#FFC107", name: "Oriental Gold" },
      { hex: "#004D40", name: "Deep Teal" },
      { hex: "#FFFFFF", name: "Pure White" }
    ]
  },
];
