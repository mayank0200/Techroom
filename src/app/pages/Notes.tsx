import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Download, Bookmark, Eye, FileText, Lock, Star, Filter } from 'lucide-react';

const categories = ['All', 'Python', 'HTML', 'CSS', 'JavaScript', 'C++', 'DSA', 'AI/ML'];

const notes = [
  { id: 1, title: 'Python Complete Notes', category: 'Python', pages: 124, size: '3.2 MB', rating: 4.9, downloads: 12500, premium: false, desc: 'Comprehensive Python notes covering syntax, OOP, modules, and advanced topics.', color: '#2563eb', thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=200&h=140&fit=crop&auto=format' },
  { id: 2, title: 'HTML & CSS Reference Sheet', category: 'HTML', pages: 48, size: '1.1 MB', rating: 4.8, downloads: 8900, premium: false, desc: 'Quick reference guide for all HTML tags and CSS properties.', color: '#d97706', thumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=140&fit=crop&auto=format' },
  { id: 3, title: 'JavaScript ES6+ Notes', category: 'JavaScript', pages: 86, size: '2.4 MB', rating: 4.9, downloads: 15200, premium: false, desc: 'Modern JavaScript features — arrow functions, promises, async/await, modules.', color: '#f59e0b', thumb: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&h=140&fit=crop&auto=format' },
  { id: 4, title: 'C++ Programming Guide', category: 'C++', pages: 98, size: '2.8 MB', rating: 4.7, downloads: 9100, premium: false, desc: 'Complete C++ reference with STL, OOP, templates and competitive programming tips.', color: '#059669', thumb: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=140&fit=crop&auto=format' },
  { id: 5, title: 'Data Structures & Algorithms', category: 'DSA', pages: 156, size: '4.5 MB', rating: 4.9, downloads: 22000, premium: false, desc: 'Arrays, linked lists, trees, graphs, sorting, searching, and DP with examples.', color: '#7c3aed', thumb: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200&h=140&fit=crop&auto=format' },
  { id: 6, title: 'Machine Learning Handbook', category: 'AI/ML', pages: 180, size: '6.2 MB', rating: 4.9, downloads: 18400, premium: true, desc: 'In-depth ML theory, algorithms, math foundations, and implementation patterns.', color: '#7c3aed', thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&h=140&fit=crop&auto=format' },
  { id: 7, title: 'CSS Advanced Techniques', category: 'CSS', pages: 72, size: '1.8 MB', rating: 4.7, downloads: 6700, premium: false, desc: 'Flexbox, Grid, animations, custom properties, and responsive design patterns.', color: '#0891b2', thumb: 'https://images.unsplash.com/photo-1433870823042-27f8da9e1f33?w=200&h=140&fit=crop&auto=format' },
  { id: 8, title: 'Deep Learning & Neural Networks', category: 'AI/ML', pages: 200, size: '7.5 MB', rating: 4.9, downloads: 14300, premium: true, desc: 'CNNs, RNNs, transformers, attention mechanisms, and training strategies.', color: '#dc2626', thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=140&fit=crop&auto=format' },
];

export function Notes() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [previewing, setPreviewing] = useState<typeof notes[0] | null>(null);

  const filtered = notes.filter((n) => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleBookmark = (id: number) =>
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>STUDY MATERIALS</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Notes Library
        </h1>
        <p className="text-muted-foreground">Download high-quality notes and study materials for every topic.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              activeCategory === cat ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            style={activeCategory === cat ? { background: 'var(--brand-gradient)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img src={note.thumb} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ background: note.color + 'bb' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <FileText className="w-8 h-8 mb-1 opacity-90" />
                <span className="text-xs opacity-80">{note.pages} pages · {note.size}</span>
              </div>
              {note.premium && (
                <div className="absolute top-2 right-2">
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-sm leading-tight flex-1 pr-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {note.title}
                </h3>
                <button onClick={() => toggleBookmark(note.id)} className={`transition-colors shrink-0 ${bookmarked.includes(note.id) ? 'text-amber-500' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Bookmark className={`w-4 h-4 ${bookmarked.includes(note.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{note.desc}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {note.rating}</span>
                <span>{(note.downloads / 1000).toFixed(1)}k downloads</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewing(note)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs text-white transition-all hover:opacity-90 ${note.premium ? 'opacity-75' : ''}`}
                  style={{ background: note.premium ? '#6b7280' : 'var(--brand-gradient)' }}
                >
                  {note.premium ? <Lock className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  {note.premium ? 'Unlock' : 'Download'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{previewing.title}</h3>
                <p className="text-xs text-muted-foreground">{previewing.pages} pages · {previewing.size}</p>
              </div>
              <button onClick={() => setPreviewing(null)} className="text-muted-foreground hover:text-foreground p-1">✕</button>
            </div>
            <div className="p-5">
              <div className="rounded-xl bg-muted h-64 flex items-center justify-center border border-border mb-4">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">PDF Preview</p>
                  <p className="text-xs mt-1">Page 1 of {previewing.pages}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{previewing.desc}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPreviewing(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  Close
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90 ${previewing.premium ? 'bg-amber-500' : ''}`}
                  style={!previewing.premium ? { background: 'var(--brand-gradient)' } : {}}
                >
                  {previewing.premium ? <><Lock className="w-4 h-4" /> Upgrade to Download</> : <><Download className="w-4 h-4" /> Download PDF</>}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
