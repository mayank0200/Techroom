import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Play, Clock, BookOpen, ChevronDown, X, ExternalLink, Bookmark, CheckCircle2, Loader2 } from 'lucide-react';
import { searchYouTubeCourses, YouTubeCourse } from '../services/youtubeService';

const categories = ['All', 'Python', 'AI/ML', 'Web Dev', 'React', 'DSA', 'C++', 'DevOps'];
const levelColors: Record<string, string> = { Beginner: '#059669', Intermediate: '#d97706', Advanced: '#dc2626' };

export function Courses() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [courses, setCourses] = useState<YouTubeCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<YouTubeCourse | null>(null);
  const [note, setNote] = useState('');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const data = await searchYouTubeCourses(search, activeCategory);
      setCourses(data);
      setIsLoading(false);
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, activeCategory]);

  const toggleBookmark = (id: string) =>
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleComplete = (id: string) =>
    setCompleted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>FREE COURSES</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Course Library
        </h1>
        <p className="text-muted-foreground">Best free YouTube courses, curated and organized for students.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${
                activeCategory === cat ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              style={activeCategory === cat ? { background: 'var(--brand-gradient)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Course Player */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-border bg-card overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Video */}
            <div className="lg:col-span-3 bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedCourse.videoId}?autoplay=1`}
                title={selectedCourse.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-2 p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-3">
                  <h2 className="text-sm leading-tight mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {selectedCourse.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">by {selectedCourse.channel}</p>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{selectedCourse.description}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Learning Outcomes</p>
                {selectedCourse.outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {o}
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-auto">
                <p className="text-xs font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>My Notes</p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full p-2.5 rounded-lg border border-border bg-muted text-xs outline-none resize-none h-20 focus:border-[var(--brand-blue)] transition-colors"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleComplete(selectedCourse.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                      completed.includes(selectedCourse.id)
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {completed.includes(selectedCourse.id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                  <button
                    onClick={() => toggleBookmark(selectedCourse.id)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      bookmarked.includes(selectedCourse.id) ? 'text-amber-500' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked.includes(selectedCourse.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-blue)]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course)}>
              <img src={course.thumb} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              {completed.includes(course.id) && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 drop-shadow" />
                </div>
              )}
              <span
                className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-md text-white"
                style={{ backgroundColor: levelColors[course.level] }}
              >
                {course.level}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-sm leading-tight mb-1 cursor-pointer hover:text-[var(--brand-blue)] transition-colors" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} onClick={() => setSelectedCourse(course)}>
                {course.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">by {course.channel} · {course.duration}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">({(course.students / 1000).toFixed(0)}k)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => toggleBookmark(course.id)} className={`transition-colors ${bookmarked.includes(course.id) ? 'text-amber-500' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Bookmark className={`w-4 h-4 ${bookmarked.includes(course.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-3 py-1 rounded-lg text-xs text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
}
