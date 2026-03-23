export type JobDepartment = "Engineering" | "Design" | "Product" | "Operations" | "Management";

export interface Job {
  id: string;
  title: string;
  department: JobDepartment;
  experience: string;
  type: "Full-time" | "Contract" | "Internship";
  location: string;
}

export const OPEN_POSITIONS: Job[] = [
  {
    id: "JOB-001",
    title: "Senior UI/UX Designer",
    department: "Design",
    experience: "5+ years Exp.",
    type: "Full-time",
    location: "Remote / Bangalore",
  },
  {
    id: "JOB-002",
    title: "UI/UX Designer",
    department: "Design",
    experience: "3+ years Exp.",
    type: "Full-time",
    location: "Remote / Bangalore",
  },
  {
    id: "JOB-003",
    title: "Lead Frontend Engineer",
    department: "Engineering",
    experience: "5+ years Exp.",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: "JOB-004",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    experience: "3+ years Exp.",
    type: "Full-time",
    location: "Bangalore",
  },
  {
    id: "JOB-005",
    title: "Product Manager - AI Platform",
    department: "Product",
    experience: "4+ years Exp.",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: "JOB-006",
    title: "DevOps Engineer",
    department: "Operations",
    experience: "3+ years Exp.",
    type: "Full-time",
    location: "Bangalore",
  },
];
