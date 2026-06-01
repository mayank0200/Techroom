import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Github, Code2, Star, Clock, ChevronRight } from 'lucide-react';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const techFilters = ['All', 'Python', 'React', 'Node.js', 'ML', 'Full Stack'];

const projects = [
  {
    id: 1,
    title: 'Weather Dashboard App',
    desc: 'Build a real-time weather dashboard using OpenWeather API with charts and geolocation.',
    difficulty: 'Beginner',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    techCategory: 'React',
    duration: '3-5 days',
    stars: 4.7,
    thumb: 'https://images.unsplash.com/photo-1504608524841-42584120d035?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['API integration', 'DOM manipulation', 'Responsive design'],
  },
  {
    id: 2,
    title: 'Todo App with React',
    desc: 'A feature-rich todo application with drag-and-drop, priority levels, and local storage.',
    difficulty: 'Beginner',
    tech: ['React', 'TypeScript', 'Tailwind'],
    techCategory: 'React',
    duration: '2-3 days',
    stars: 4.8,
    thumb: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['React hooks', 'State management', 'TypeScript basics'],
  },
  {
    id: 3,
    title: 'House Price Predictor',
    desc: 'ML model to predict house prices using linear regression and feature engineering.',
    difficulty: 'Intermediate',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    techCategory: 'ML',
    duration: '5-7 days',
    stars: 4.9,
    thumb: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['Data preprocessing', 'Model training', 'Streamlit deployment'],
  },
  {
    id: 4,
    title: 'Blog Platform (MERN Stack)',
    desc: 'Full-featured blog platform with authentication, CRUD, comments, and rich text editor.',
    difficulty: 'Intermediate',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    techCategory: 'Full Stack',
    duration: '2-3 weeks',
    stars: 4.8,
    thumb: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['JWT auth', 'RESTful API', 'MongoDB CRUD'],
  },
  {
    id: 5,
    title: 'Sentiment Analysis API',
    desc: 'Build a REST API that analyzes text sentiment using BERT and FastAPI.',
    difficulty: 'Advanced',
    tech: ['Python', 'FastAPI', 'BERT', 'Docker'],
    techCategory: 'ML',
    duration: '1-2 weeks',
    stars: 4.9,
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['Transformers', 'FastAPI', 'Docker containerization'],
  },
  {
    id: 6,
    title: 'E-Commerce Store',
    desc: 'Complete e-commerce platform with cart, payments via Razorpay, and admin dashboard.',
    difficulty: 'Advanced',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Razorpay'],
    techCategory: 'Full Stack',
    duration: '3-4 weeks',
    stars: 4.9,
    thumb: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['Payment integration', 'SSR with Next.js', 'PostgreSQL with Prisma'],
  },
  {
    id: 7,
    title: 'CLI Task Manager',
    desc: 'Command-line task manager in Python with SQLite, rich formatting, and priority queues.',
    difficulty: 'Beginner',
    tech: ['Python', 'SQLite', 'Rich'],
    techCategory: 'Python',
    duration: '2-3 days',
    stars: 4.6,
    thumb: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['Python OOP', 'SQLite', 'CLI design'],
  },
  {
    id: 8,
    title: 'Real-Time Chat App',
    desc: 'Socket.io chat application with rooms, typing indicators, and message history.',
    difficulty: 'Intermediate',
    tech: ['Node.js', 'Socket.io', 'React', 'Redis'],
    techCategory: 'Node.js',
    duration: '1-2 weeks',
    stars: 4.8,
    thumb: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=220&fit=crop&auto=format',
    githubUrl: '#',
    videoUrl: '#',
    outcomes: ['WebSockets', 'Redis pub/sub', 'Real-time UX'],
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: '#059669',
  Intermediate: '#d97706',
  Advanced: '#dc2626',
};

export function Projects() {
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [activeTech, setActiveTech] = useState('All');

  const filtered = projects.filter((p) => {
    const matchDiff = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
    const matchTech = activeTech === 'All' || p.techCategory === activeTech;
    return matchDiff && matchTech;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>BUILD & LEARN</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Project Ideas
        </h1>
        <p className="text-muted-foreground">Real-world projects to build for your portfolio. Each project builds practical, hireable skills.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center mr-1">Difficulty:</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDifficulty(d)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeDifficulty === d ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              style={activeDifficulty === d ? { background: 'var(--brand-gradient)' } : {}}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center mr-1">Tech:</span>
          {techFilters.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTech(t)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeTech === t ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              style={activeTech === t ? { background: 'var(--brand-gradient)' } : {}}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img src={project.thumb} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all" />
              <span
                className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: difficultyColors[project.difficulty] }}
              >
                {project.difficulty}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-sm leading-tight mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{project.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">+{project.tech.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {project.duration}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {project.stars}</span>
              </div>

              <div className="flex gap-2">
                <a
                  href={project.githubUrl}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  <Github className="w-3.5 h-3.5" /> Code
                </a>
                <a
                  href={project.videoUrl}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Play className="w-3.5 h-3.5" /> Tutorial
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
