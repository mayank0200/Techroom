import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Search, ArrowRight, Star, Users, BookOpen, Trophy,
  Map, Code2, Brain, Globe, Shield, Server, Layers, Cpu,
  ChevronRight, Play, Zap, Award, TrendingUp, CheckCircle2
} from 'lucide-react';

const stats = [
  { label: 'Active Learners', value: '50,000+', icon: Users },
  { label: 'Free Courses', value: '200+', icon: BookOpen },
  { label: 'Roadmaps', value: '10+', icon: Map },
  { label: 'Students Placed', value: '5,000+', icon: Trophy },
];

const roadmaps = [
  { id: 'ai-ml', title: 'AI / Machine Learning', icon: Brain, color: '#7c3aed', level: 'Intermediate', duration: '6 months', students: 12500 },
  { id: 'web-dev', title: 'Web Development', icon: Globe, color: '#2563eb', level: 'Beginner', duration: '4 months', students: 18200 },
  { id: 'data-science', title: 'Data Science', icon: TrendingUp, color: '#0891b2', level: 'Intermediate', duration: '5 months', students: 9800 },
  { id: 'fullstack', title: 'Full Stack Dev', icon: Layers, color: '#059669', level: 'Advanced', duration: '8 months', students: 7300 },
  { id: 'cybersec', title: 'Cyber Security', icon: Shield, color: '#dc2626', level: 'Intermediate', duration: '6 months', students: 5400 },
  { id: 'devops', title: 'DevOps / Cloud', icon: Server, color: '#d97706', level: 'Advanced', duration: '7 months', students: 4100 },
];

const courses = [
  {
    title: 'Complete Python Bootcamp',
    channel: 'freeCodeCamp',
    duration: '12 hrs',
    rating: 4.9,
    students: 45000,
    thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=220&fit=crop&auto=format',
    tag: 'Python',
    tagColor: '#2563eb',
  },
  {
    title: 'Machine Learning Course',
    channel: 'Andrew Ng',
    duration: '20 hrs',
    rating: 4.9,
    students: 62000,
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop&auto=format',
    tag: 'AI/ML',
    tagColor: '#7c3aed',
  },
  {
    title: 'React.js Full Course 2025',
    channel: 'Traversy Media',
    duration: '8 hrs',
    rating: 4.8,
    students: 38000,
    thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop&auto=format',
    tag: 'React',
    tagColor: '#0891b2',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    college: 'Poornima University',
    role: 'SWE Intern @ Google',
    text: 'Techroom\'s AI/ML roadmap helped me land my dream internship. The structured path and curated videos saved me months of confusion.',
    avatar: 'PS',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    college: 'JECRC College',
    role: 'Full Stack Developer',
    text: 'The resume builder and ATS checker alone are worth it. My interview calls jumped 3x after using Techroom\'s career tools.',
    avatar: 'RV',
    rating: 5,
  },
  {
    name: 'Ananya Singh',
    college: 'Arya College',
    role: 'Data Analyst @ Infosys',
    text: 'From zero to placed in 6 months using only Techroom. The college hub gave me access to previous year papers too!',
    avatar: 'AS',
    rating: 5,
  },
];

const features = [
  { icon: Map, title: 'Structured Roadmaps', desc: 'Step-by-step career paths from beginner to job-ready' },
  { icon: Play, title: 'Curated YouTube Courses', desc: 'Best free video courses organized by topic and difficulty' },
  { icon: Award, title: 'ATS Resume Builder', desc: 'Beat applicant tracking systems with optimized templates' },
  { icon: Zap, title: 'Interview Preparation', desc: 'Practice 500+ real interview questions with mock mode' },
  { icon: CheckCircle2, title: 'Progress Tracking', desc: 'Track completion, streaks, and certificates in one place' },
  { icon: Users, title: 'College Hub', desc: 'College-specific resources, placements, and past papers' },
];

export function Home() {
  const [search, setSearch] = useState('');

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: 'var(--brand-gradient)' }}
          />
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'var(--brand-blue)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: 'var(--brand-purple)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-white mb-6"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <Zap className="w-3.5 h-3.5" />
              Free Learning Platform for Students
            </span>

            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              }}
            >
              Your Tech Career Starts{' '}
              <span
                style={{
                  background: 'var(--brand-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Right Here
              </span>
            </h1>

            <p
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Structured roadmaps, curated free YouTube courses, ATS resume tools, and interview prep — everything a student needs to get placed.
            </p>

            {/* Search Bar */}
            <div className="flex items-center max-w-xl mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden mb-8">
              <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search courses, roadmaps, notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button
                className="m-1.5 px-5 py-2.5 rounded-lg text-sm text-white transition-all hover:opacity-90"
                style={{ background: 'var(--brand-gradient)' }}
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/roadmaps"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'var(--brand-gradient)' }}
              >
                Explore Roadmaps <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm border border-border bg-card text-foreground hover:bg-muted transition-all"
              >
                <Play className="w-4 h-4" /> Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div
                  className="text-2xl md:text-3xl mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    background: 'var(--brand-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>LEARNING PATHS</span>
            <h2 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Popular Roadmaps
            </h2>
          </div>
          <Link
            to="/roadmaps"
            className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--brand-blue)' }}
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmaps.map((rm, i) => {
            const Icon = rm.icon;
            return (
              <motion.div
                key={rm.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/roadmaps/${rm.id}`}
                  className="flex flex-col p-5 rounded-xl border border-border bg-card hover:border-[var(--brand-blue)] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: rm.color + '20' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: rm.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {rm.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">{rm.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span>⏱ {rm.duration}</span>
                    <span>{rm.students.toLocaleString()} students</span>
                  </div>
                  <div
                    className="mt-3 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    style={{ background: 'var(--brand-gradient)' }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>EVERYTHING YOU NEED</span>
            <h2 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              One Platform. Endless Possibilities.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-[var(--brand-blue)] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>FREE COURSES</span>
            <h2 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Featured Courses
            </h2>
          </div>
          <Link to="/courses" className="flex items-center gap-1 text-sm hover:opacity-80" style={{ color: 'var(--brand-blue)' }}>
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img src={course.thumb} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs text-white"
                  style={{ backgroundColor: course.tagColor }}
                >
                  {course.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">by {course.channel} · {course.duration}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-foreground">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.students.toLocaleString()})</span>
                  </div>
                  <Link to="/courses" className="text-xs hover:opacity-80 transition-all" style={{ color: 'var(--brand-blue)' }}>
                    Start →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>STUDENT STORIES</span>
            <h2 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Students Who Got Placed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                    style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-10 md:p-16 text-center text-white"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2
              className="mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Start Your Journey Today — It's Free
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Join 50,000+ students learning with Techroom. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/login"
                className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-white/90 transition-all"
                style={{ color: 'var(--brand-purple)', fontFamily: 'var(--font-display)' }}
              >
                Create Free Account
              </Link>
              <Link
                to="/roadmaps"
                className="px-8 py-3.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Browse Roadmaps
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
