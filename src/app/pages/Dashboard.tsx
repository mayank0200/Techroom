import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { BarChart2, TrendingUp, Award, Flame, BookOpen, CheckCircle2, Clock, Star, Target, ArrowRight, Zap, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../context/AuthContext';

const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1.5 },
];

const progressData = [
  { week: 'W1', score: 20 },
  { week: 'W2', score: 35 },
  { week: 'W3', score: 42 },
  { week: 'W4', score: 58 },
  { week: 'W5', score: 65 },
  { week: 'W6', score: 72 },
];

const completedCourses = [
  { title: 'Python Full Course', channel: 'freeCodeCamp', thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=60&h=40&fit=crop&auto=format', date: 'May 15, 2026', cert: true },
  { title: 'React.js Full Course', channel: 'Traversy Media', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=60&h=40&fit=crop&auto=format', date: 'May 28, 2026', cert: true },
];

const savedNotes = [
  { title: 'Python Complete Notes', pages: 124, category: 'Python' },
  { title: 'DSA Notes', pages: 156, category: 'DSA' },
  { title: 'JavaScript ES6+', pages: 86, category: 'JavaScript' },
];

const roadmapProgress = [
  { title: 'AI / Machine Learning', progress: 20, color: '#7c3aed', modules: 14, done: 2 },
  { title: 'Web Development', progress: 65, color: '#2563eb', modules: 13, done: 8 },
  { title: 'Python Programming', progress: 100, color: '#059669', modules: 10, done: 10 },
];

const badges = [
  { emoji: '🚀', label: 'First Lesson', earned: true },
  { emoji: '🔥', label: '7-Day Streak', earned: true },
  { emoji: '📚', label: 'Note Taker', earned: true },
  { emoji: '🏆', label: 'Course Complete', earned: true },
  { emoji: '⚡', label: '30-Day Streak', earned: false },
  { emoji: '🎯', label: 'Roadmap Master', earned: false },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'notes' | 'badges'>('overview');
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>MY DASHBOARD</span>
          <h1 className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Guest'} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Keep it up! You're on a 12-day learning streak.</p>
        </div>
        <Link
          to="/roadmaps"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
          style={{ background: 'var(--brand-gradient)' }}
        >
          Continue Learning <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Learning Streak', value: '12 days', icon: Flame, color: '#ef4444', bg: '#ef444415' },
          { label: 'Courses Done', value: '4', icon: CheckCircle2, color: '#059669', bg: '#05966915' },
          { label: 'Hours This Week', value: '15 hrs', icon: Clock, color: '#2563eb', bg: '#2563eb15' },
          { label: 'Certificates', value: '2', icon: Award, color: '#d97706', bg: '#d9770615' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card border border-border rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color }}>{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['overview', 'courses', 'notes', 'badges'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm transition-all capitalize ${
              activeTab === tab ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            style={activeTab === tab ? { background: 'var(--brand-gradient)' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Activity */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Weekly Learning Activity
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={weeklyActivity} barSize={24}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => [`${v} hrs`]}
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]} fill="url(#blueGrad)" />
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progress Chart */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Skill Progress (6 Weeks)
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={progressData}>
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Roadmap Progress */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Roadmap Progress
              </h3>
              <div className="space-y-4">
                {roadmapProgress.map((rm) => (
                  <div key={rm.title}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{rm.title}</span>
                      <span className="text-xs text-muted-foreground">{rm.done}/{rm.modules} modules</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rm.progress}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: rm.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Recent Certificates */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Certificates</h3>
              <div className="space-y-3">
                {completedCourses.filter((c) => c.cert).map((c) => (
                  <div key={c.title} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.date}</div>
                    </div>
                    <button className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Build Your Resume', href: '/resume-builder', icon: '📄' },
                  { label: 'Check ATS Score', href: '/ats-checker', icon: '🎯' },
                  { label: 'Interview Practice', href: '/interview-prep', icon: '🎤' },
                  { label: 'Browse Projects', href: '/projects', icon: '🚀' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium Prompt */}
            {!user?.isPro ? (
              <div
                className="p-5 rounded-2xl text-white relative overflow-hidden"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white blur-2xl" />
                </div>
                <div className="relative z-10">
                  <Zap className="w-5 h-5 mb-2" />
                  <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    Upgrade to Premium
                  </h3>
                  <p className="text-xs text-white/80 mb-3">Unlock ATS checker, premium notes, and advanced interview prep.</p>
                  <Link to="/pricing" className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-white transition-all hover:bg-white/90" style={{ color: 'var(--brand-purple)', fontFamily: 'var(--font-display)' }}>
                    Upgrade Now
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className="p-5 rounded-2xl text-white relative overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500"
              >
                <div className="relative z-10">
                  <CheckCircle2 className="w-5 h-5 mb-2" />
                  <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    Pro Active
                  </h3>
                  <p className="text-xs text-white/80 mb-1">You have full access to all features.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Completed Courses</h2>
          {completedCourses.map((c) => (
            <div key={c.title} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <img src={c.thumb} alt={c.title} className="w-14 h-10 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{c.title}</div>
                <div className="text-xs text-muted-foreground">by {c.channel} · Completed {c.date}</div>
              </div>
              {c.cert && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600">
                  <Award className="w-3 h-3" /> Certificate
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Saved Notes</h2>
          {savedNotes.map((note) => (
            <div key={note.title} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-gradient)' }}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{note.title}</div>
                <div className="text-xs text-muted-foreground">{note.pages} pages · {note.category}</div>
              </div>
              <Link to="/notes" className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-all">
                View
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div>
          <h2 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Achievements & Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className={`p-4 rounded-xl border text-center transition-all ${
                  badge.earned ? 'border-border bg-card' : 'border-dashed border-border opacity-40 bg-muted'
                }`}
              >
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <div className="text-xs" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{badge.label}</div>
                {badge.earned && (
                  <div className="mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
