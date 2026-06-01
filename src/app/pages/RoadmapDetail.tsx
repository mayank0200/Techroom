import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Circle, Clock, Users, BookOpen, Folder, ChevronRight, Play, Star, Lock } from 'lucide-react';

const roadmapData: Record<string, {
  title: string;
  desc: string;
  duration: string;
  level: string;
  students: number;
  modules: {
    title: string;
    duration: string;
    topics: string[];
    free: boolean;
    videoTitle: string;
    channel: string;
    completed?: boolean;
  }[];
  projects: { title: string; difficulty: string; stack: string[] }[];
}> = {
  'ai-ml': {
    title: 'AI / Machine Learning',
    desc: 'A complete, structured roadmap to go from Python basics to building and deploying ML models.',
    duration: '6 months',
    level: 'Intermediate',
    students: 12500,
    modules: [
      {
        title: 'Python Fundamentals',
        duration: '2 weeks',
        topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'OOP', 'File I/O'],
        free: true,
        videoTitle: 'Python Full Course for Beginners',
        channel: 'freeCodeCamp',
        completed: true,
      },
      {
        title: 'NumPy & Pandas',
        duration: '2 weeks',
        topics: ['Array Operations', 'DataFrames', 'Data Cleaning', 'Aggregation', 'Merging'],
        free: true,
        videoTitle: 'NumPy & Pandas Full Tutorial',
        channel: 'Keith Galli',
        completed: true,
      },
      {
        title: 'Data Visualization',
        duration: '1 week',
        topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Statistical Plots', 'Dashboards'],
        free: true,
        videoTitle: 'Data Visualization with Python',
        channel: 'Corey Schafer',
      },
      {
        title: 'Statistics & Probability',
        duration: '2 weeks',
        topics: ['Descriptive Statistics', 'Probability', 'Distributions', 'Hypothesis Testing', 'Bayesian'],
        free: true,
        videoTitle: 'Statistics for Data Science',
        channel: 'StatQuest',
      },
      {
        title: 'Machine Learning Basics',
        duration: '3 weeks',
        topics: ['Supervised Learning', 'Regression', 'Classification', 'Overfitting', 'Cross-validation'],
        free: true,
        videoTitle: 'Machine Learning Course — Andrew Ng',
        channel: 'Coursera / deeplearning.ai',
      },
      {
        title: 'Scikit-Learn',
        duration: '2 weeks',
        topics: ['Pipelines', 'Model Selection', 'Feature Engineering', 'Ensemble Methods', 'GridSearch'],
        free: true,
        videoTitle: 'Scikit-Learn Complete Tutorial',
        channel: 'Sentdex',
      },
      {
        title: 'Deep Learning',
        duration: '4 weeks',
        topics: ['Neural Networks', 'Backpropagation', 'CNNs', 'RNNs', 'Transfer Learning'],
        free: true,
        videoTitle: 'Deep Learning Specialization',
        channel: 'deeplearning.ai',
      },
      {
        title: 'TensorFlow & PyTorch',
        duration: '3 weeks',
        topics: ['Tensor Operations', 'Model Building', 'Training Loops', 'Custom Datasets', 'GPU Training'],
        free: true,
        videoTitle: 'PyTorch Full Course',
        channel: 'Patrick Loeber',
      },
      {
        title: 'NLP Fundamentals',
        duration: '2 weeks',
        topics: ['Text Processing', 'TF-IDF', 'Word Embeddings', 'Transformers', 'BERT'],
        free: false,
        videoTitle: 'NLP with Python — Hugging Face',
        channel: 'Hugging Face',
      },
      {
        title: 'Model Deployment',
        duration: '2 weeks',
        topics: ['Flask/FastAPI', 'Docker', 'AWS/GCP', 'MLflow', 'Model Monitoring'],
        free: false,
        videoTitle: 'Deploy ML Models to Production',
        channel: 'Nicholas Renotte',
      },
    ],
    projects: [
      { title: 'House Price Predictor', difficulty: 'Beginner', stack: ['Python', 'Scikit-learn', 'Pandas'] },
      { title: 'Sentiment Analysis App', difficulty: 'Intermediate', stack: ['Python', 'BERT', 'FastAPI'] },
      { title: 'Image Classification CNN', difficulty: 'Intermediate', stack: ['PyTorch', 'OpenCV', 'Streamlit'] },
      { title: 'Chatbot with LLM', difficulty: 'Advanced', stack: ['Python', 'LangChain', 'OpenAI API'] },
    ],
  },
  'web-dev': {
    title: 'Web Development',
    desc: 'Learn modern web development from HTML basics to full-stack React applications.',
    duration: '4 months',
    level: 'Beginner',
    students: 18200,
    modules: [
      { title: 'HTML Fundamentals', duration: '1 week', topics: ['Tags & Elements', 'Forms', 'Semantic HTML', 'Accessibility', 'SEO Basics'], free: true, videoTitle: 'HTML Full Course', channel: 'freeCodeCamp', completed: true },
      { title: 'CSS & Flexbox/Grid', duration: '2 weeks', topics: ['Box Model', 'Flexbox', 'Grid', 'Responsive Design', 'Animations'], free: true, videoTitle: 'CSS Full Course', channel: 'Kevin Powell' },
      { title: 'JavaScript Essentials', duration: '3 weeks', topics: ['Variables', 'DOM Manipulation', 'Events', 'Fetch API', 'ES6+'], free: true, videoTitle: 'JavaScript Full Course', channel: 'Akshay Saini' },
      { title: 'React.js', duration: '3 weeks', topics: ['Components', 'Hooks', 'State Management', 'Router', 'Context API'], free: true, videoTitle: 'React.js Full Course 2025', channel: 'Traversy Media' },
      { title: 'Node.js & Express', duration: '2 weeks', topics: ['Server Setup', 'REST APIs', 'Middleware', 'Authentication', 'File System'], free: true, videoTitle: 'Node.js Full Course', channel: 'Corey Schafer' },
      { title: 'Databases (SQL + NoSQL)', duration: '2 weeks', topics: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'CRUD Operations', 'Relationships'], free: false, videoTitle: 'SQL & MongoDB Complete Course', channel: 'Academind' },
    ],
    projects: [
      { title: 'Portfolio Website', difficulty: 'Beginner', stack: ['HTML', 'CSS', 'JavaScript'] },
      { title: 'Todo App with React', difficulty: 'Beginner', stack: ['React', 'LocalStorage'] },
      { title: 'Blog Platform', difficulty: 'Intermediate', stack: ['React', 'Node.js', 'MongoDB'] },
      { title: 'E-Commerce Store', difficulty: 'Advanced', stack: ['Next.js', 'PostgreSQL', 'Stripe'] },
    ],
  },
};

const fallbackRoadmap = roadmapData['ai-ml'];

const difficultyColors: Record<string, string> = {
  Beginner: '#059669',
  Intermediate: '#d97706',
  Advanced: '#dc2626',
};

export function RoadmapDetail() {
  const { id } = useParams<{ id: string }>();
  const roadmap = roadmapData[id ?? ''] ?? fallbackRoadmap;
  const completedCount = roadmap.modules.filter((m) => m.completed).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link to="/roadmaps" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Roadmaps
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          {roadmap.title} Roadmap
        </h1>
        <p className="text-muted-foreground mb-4">{roadmap.desc}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {roadmap.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {roadmap.modules.length} modules</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {roadmap.students.toLocaleString()} enrolled</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-5 rounded-xl bg-card border border-border mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Your Progress</span>
          <span className="text-sm text-muted-foreground">{completedCount}/{roadmap.modules.length} modules</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / roadmap.modules.length) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'var(--brand-gradient)' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {Math.round((completedCount / roadmap.modules.length) * 100)}% complete — keep going!
        </p>
      </div>

      {/* Modules */}
      <div className="mb-10">
        <h2 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Learning Path</h2>
        <div className="space-y-3">
          {roadmap.modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                mod.completed
                  ? 'border-green-500/30 bg-green-500/5'
                  : mod.free
                  ? 'border-border bg-card hover:border-[var(--brand-blue)]'
                  : 'border-border bg-card opacity-75'
              }`}
            >
              {/* Step number / check */}
              <div className="shrink-0 mt-0.5">
                {mod.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {i + 1}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {mod.title}
                  </h3>
                  {!mod.free && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                      <Lock className="w-3 h-3" /> Premium
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">{mod.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {mod.topics.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Play className="w-3.5 h-3.5" style={{ color: 'var(--brand-blue)' }} />
                  <span className="text-muted-foreground">{mod.videoTitle}</span>
                  <span className="text-muted-foreground">·</span>
                  <span style={{ color: 'var(--brand-blue)' }}>{mod.channel}</span>
                </div>
              </div>

              <Link
                to="/courses"
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs text-white transition-all hover:opacity-90"
                style={{ background: mod.free ? 'var(--brand-gradient)' : '#6b7280' }}
              >
                {mod.completed ? 'Review' : mod.free ? 'Start' : 'Unlock'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Projects */}
      <div>
        <h2 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Recommended Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadmap.projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl border border-border bg-card hover:border-[var(--brand-blue)] transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{proj.title}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: difficultyColors[proj.difficulty] + '20',
                    color: difficultyColors[proj.difficulty],
                  }}
                >
                  {proj.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
