import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Brain, Globe, TrendingUp, Layers, Shield, Server,
  Code2, Database, Cpu, GitBranch, ChevronRight, Clock,
  BarChart2, Users, BookOpen, Star
} from 'lucide-react';

const categories = ['All', 'AI/ML', 'Web Dev', 'Data', 'Systems', 'DevOps'];

const roadmaps = [
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    desc: 'Master Python, NumPy, ML algorithms, deep learning with TensorFlow and PyTorch.',
    icon: Brain,
    color: '#7c3aed',
    bg: '#7c3aed15',
    category: 'AI/ML',
    level: 'Intermediate',
    duration: '6 months',
    modules: 14,
    students: 12500,
    rating: 4.9,
    skills: ['Python', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    desc: 'Learn statistics, data visualization, SQL, and machine learning for data analysis.',
    icon: TrendingUp,
    color: '#0891b2',
    bg: '#0891b215',
    category: 'Data',
    level: 'Intermediate',
    duration: '5 months',
    modules: 12,
    students: 9800,
    rating: 4.8,
    skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Statistics'],
  },
  {
    id: 'python',
    title: 'Python Programming',
    desc: 'Complete Python from basics to advanced — OOP, file I/O, APIs, and automation.',
    icon: Code2,
    color: '#059669',
    bg: '#05966915',
    category: 'Systems',
    level: 'Beginner',
    duration: '3 months',
    modules: 10,
    students: 22000,
    rating: 4.9,
    skills: ['Python', 'OOP', 'Django', 'Flask', 'APIs'],
  },
  {
    id: 'cpp',
    title: 'C++ Programming',
    desc: 'Systems programming, competitive coding, DSA implementation in C++.',
    icon: Cpu,
    color: '#d97706',
    bg: '#d9770615',
    category: 'Systems',
    level: 'Beginner',
    duration: '4 months',
    modules: 11,
    students: 15000,
    rating: 4.7,
    skills: ['C++', 'STL', 'DSA', 'Competitive Programming', 'OOP'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    desc: 'HTML, CSS, JavaScript, and modern frameworks to build full websites.',
    icon: Globe,
    color: '#2563eb',
    bg: '#2563eb15',
    category: 'Web Dev',
    level: 'Beginner',
    duration: '4 months',
    modules: 13,
    students: 18200,
    rating: 4.8,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    desc: 'React, TypeScript, Tailwind CSS, and modern UI/UX practices.',
    icon: Layers,
    color: '#06b6d4',
    bg: '#06b6d415',
    category: 'Web Dev',
    level: 'Intermediate',
    duration: '4 months',
    modules: 11,
    students: 11300,
    rating: 4.8,
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Testing'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    desc: 'Node.js, Python FastAPI, databases, REST APIs, and microservices.',
    icon: Server,
    color: '#7c3aed',
    bg: '#7c3aed15',
    category: 'Web Dev',
    level: 'Intermediate',
    duration: '5 months',
    modules: 12,
    students: 8900,
    rating: 4.7,
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    desc: 'Complete MERN/PERN stack — from UI to database, deployment included.',
    icon: GitBranch,
    color: '#059669',
    bg: '#05966915',
    category: 'Web Dev',
    level: 'Advanced',
    duration: '8 months',
    modules: 18,
    students: 7300,
    rating: 4.9,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: 'cybersec',
    title: 'Cyber Security',
    desc: 'Ethical hacking, network security, penetration testing, and CTFs.',
    icon: Shield,
    color: '#dc2626',
    bg: '#dc262615',
    category: 'Systems',
    level: 'Intermediate',
    duration: '6 months',
    modules: 14,
    students: 5400,
    rating: 4.8,
    skills: ['Linux', 'Networking', 'Kali Linux', 'Wireshark', 'Python'],
  },
  {
    id: 'devops',
    title: 'DevOps / Cloud',
    desc: 'CI/CD, Docker, Kubernetes, AWS, Terraform, and SRE practices.',
    icon: Database,
    color: '#d97706',
    bg: '#d9770615',
    category: 'DevOps',
    level: 'Advanced',
    duration: '7 months',
    modules: 15,
    students: 4100,
    rating: 4.7,
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
  },
];

const levelColors: Record<string, string> = {
  Beginner: '#059669',
  Intermediate: '#d97706',
  Advanced: '#dc2626',
};

export function Roadmaps() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? roadmaps
    : roadmaps.filter((r) => r.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>LEARNING PATHS</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Career Roadmaps
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Step-by-step structured paths to take you from beginner to job-ready. Each roadmap includes curated YouTube resources.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              activeCategory === cat
                ? 'text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            style={activeCategory === cat ? { background: 'var(--brand-gradient)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((rm, i) => {
          const Icon = rm.icon;
          return (
            <motion.div
              key={rm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/roadmaps/${rm.id}`}
                className="flex flex-col h-full p-5 rounded-xl border border-border bg-card hover:border-[var(--brand-blue)] hover:shadow-lg transition-all group"
              >
                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: rm.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: rm.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm leading-tight mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {rm.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: levelColors[rm.level] + '20',
                        color: levelColors[rm.level],
                      }}
                    >
                      {rm.level}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{rm.desc}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {rm.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {rm.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {rm.modules} modules</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {(rm.students / 1000).toFixed(1)}k</span>
                </div>

                <div
                  className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all text-xs font-semibold"
                  style={{ color: 'var(--brand-blue)' }}
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
