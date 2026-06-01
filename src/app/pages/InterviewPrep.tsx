import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Eye, EyeOff, CheckCircle2, RotateCcw, Bookmark, Mic } from 'lucide-react';

const categories = ['All', 'HR Interview', 'Python', 'C++', 'AI/ML', 'Web Development', 'DSA', 'System Design'];

const questions: Record<string, { q: string; a: string; difficulty: string; saved?: boolean }[]> = {
  'HR Interview': [
    { q: 'Tell me about yourself.', a: 'Start with your educational background, then mention 1-2 key technical skills and projects. End with why you\'re excited about this role. Keep it 2 minutes — structured as: Who you are → What you\'ve done → Why this role.', difficulty: 'Easy' },
    { q: 'Where do you see yourself in 5 years?', a: 'Express genuine interest in growing within your domain. Mention becoming a senior engineer/tech lead, contributing to open-source, and mentoring others. Tie it to the company\'s growth and mission.', difficulty: 'Easy' },
    { q: 'Why should we hire you?', a: 'Focus on 3 unique value-adds: your technical skills, your learning ability (share an example), and your fit with the team culture. Back each claim with a brief example or metric.', difficulty: 'Easy' },
    { q: 'Tell me about a time you handled a conflict in a team.', a: 'Use the STAR method: Situation → Task → Action → Result. Describe a specific scenario, how you listened to all sides, proposed a solution, and what positive outcome resulted. Keep it concise.', difficulty: 'Medium' },
    { q: 'What are your greatest strengths and weaknesses?', a: 'Strength: Pick one technical (e.g., system design thinking) + one soft skill (e.g., clear communication). Weakness: Be genuine but show growth. E.g., "I used to struggle with delegating, but I\'ve been actively working on it by…"', difficulty: 'Easy' },
  ],
  'Python': [
    { q: 'What is the difference between a list and a tuple in Python?', a: 'List: mutable, defined with [], slower, more memory. Tuple: immutable, defined with (), faster, less memory. Use tuples for fixed data (coordinates, database records) and lists for collections that change.', difficulty: 'Easy' },
    { q: 'Explain Python\'s GIL (Global Interpreter Lock).', a: 'The GIL is a mutex that allows only one thread to execute Python bytecode at a time. This prevents true multi-threading for CPU-bound tasks. Solution: use multiprocessing for CPU tasks, asyncio or threading for I/O-bound tasks.', difficulty: 'Hard' },
    { q: 'What are decorators in Python? Give an example.', a: 'Decorators are functions that modify other functions without changing their code. They use @syntax. Example: @functools.wraps wraps inner function. Common uses: logging, timing, authentication, caching (@lru_cache).', difficulty: 'Medium' },
    { q: 'What is the difference between @staticmethod and @classmethod?', a: '@staticmethod: doesn\'t receive any implicit first arg, bound to class not instance, can\'t modify class/instance state. @classmethod: receives cls as first arg, can modify class state, often used for factory methods.', difficulty: 'Medium' },
    { q: 'How does Python manage memory?', a: 'Python uses reference counting (each object tracks how many references point to it) + cyclic garbage collector for circular references. CPython allocates memory in arenas/pools. del decrements reference count. When count hits 0, object is freed.', difficulty: 'Hard' },
  ],
  'C++': [
    { q: 'What is the difference between stack and heap memory?', a: 'Stack: auto-managed, fast, limited size, stores local variables. LIFO order. Heap: manually managed (new/delete), larger, slower, stores dynamic allocations. Stack overflow = bad recursion; heap = memory leaks if not freed.', difficulty: 'Easy' },
    { q: 'Explain virtual functions and vtable in C++.', a: 'Virtual functions enable runtime polymorphism. When a class has virtual functions, the compiler creates a vtable (virtual table) — an array of function pointers. Each object has a vptr pointing to its class\'s vtable. Virtual calls go through this table at runtime.', difficulty: 'Hard' },
    { q: 'What are smart pointers? Explain unique_ptr, shared_ptr, weak_ptr.', a: 'unique_ptr: exclusive ownership, non-copyable, auto-deleted when out of scope. shared_ptr: shared ownership via reference counting. weak_ptr: non-owning reference to shared_ptr\'s object, used to break circular references. Prefer these over raw pointers.', difficulty: 'Hard' },
    { q: 'What is the difference between struct and class in C++?', a: 'Only one difference: default access. struct defaults to public, class defaults to private. Convention: structs for POD (plain old data), classes for complex objects with methods. Both support inheritance, virtual functions, etc.', difficulty: 'Easy' },
  ],
  'AI/ML': [
    { q: 'What is overfitting and how do you prevent it?', a: 'Overfitting: model performs well on training data but poorly on new data — it memorizes instead of learning patterns. Prevention: regularization (L1/L2), dropout, early stopping, cross-validation, data augmentation, reducing model complexity.', difficulty: 'Medium' },
    { q: 'Explain the bias-variance tradeoff.', a: 'Bias: error from wrong assumptions (underfitting — high bias). Variance: error from sensitivity to fluctuations in training data (overfitting — high variance). Goal: find sweet spot. Complex models have low bias but high variance; simple models vice versa.', difficulty: 'Medium' },
    { q: 'What is gradient descent? What are its variants?', a: 'Gradient descent: iteratively adjust parameters to minimize loss by moving in direction of steepest descent. Batch GD: uses all data; Stochastic GD: one sample per update (noisy but fast); Mini-batch GD: compromise — most common in practice.', difficulty: 'Medium' },
    { q: 'Explain the attention mechanism in transformers.', a: 'Attention computes a weighted sum of values based on similarity between queries and keys (Q·K^T / √dk, then softmax). Self-attention lets each token attend to all others. Multi-head attention runs multiple attention heads in parallel to capture different relationships.', difficulty: 'Hard' },
  ],
  'Web Development': [
    { q: 'What is the difference between REST and GraphQL?', a: 'REST: multiple endpoints, over-fetching/under-fetching possible, versioned URLs. GraphQL: single endpoint, client specifies exact data shape, no over-fetching. GraphQL is better for complex UIs; REST is simpler for simple APIs.', difficulty: 'Medium' },
    { q: 'Explain the event loop in JavaScript.', a: 'JS is single-threaded. Event loop: executes sync code → empties microtask queue (Promises) → takes one task from macro-task queue (setTimeout, events) → repeats. This enables async without blocking UI thread.', difficulty: 'Hard' },
    { q: 'What are React hooks? Name and explain 5 common ones.', a: 'useState: local state. useEffect: side effects (fetch, timers). useContext: consume context. useRef: mutable ref, no re-render. useMemo/useCallback: memoization for performance. Custom hooks encapsulate reusable logic.', difficulty: 'Medium' },
    { q: 'What is CORS and how do you handle it?', a: 'Cross-Origin Resource Sharing: browser security mechanism blocking requests to different origins. Handled server-side by setting Access-Control-Allow-Origin header. In Express: use cors() middleware. Preflight requests (OPTIONS) check permissions.', difficulty: 'Medium' },
  ],
  'DSA': [
    { q: 'What is the time complexity of quicksort in best, average, and worst cases?', a: 'Best/Average: O(n log n) — pivot divides array roughly in half. Worst: O(n²) — occurs when pivot is always smallest/largest (sorted array with naive pivot). Fix with random pivot or median-of-three. Space: O(log n) average.', difficulty: 'Medium' },
    { q: 'Explain BFS vs DFS. When would you use each?', a: 'BFS (queue): explores level by level. Use for shortest path in unweighted graphs. DFS (stack/recursion): explores as deep as possible first. Use for detecting cycles, topological sort, finding connected components, backtracking problems.', difficulty: 'Medium' },
    { q: 'What is dynamic programming? Explain with an example.', a: 'DP: solve complex problems by breaking them into overlapping subproblems, storing results (memoization/tabulation). Example: Fibonacci — naive O(2^n), DP O(n). Key: optimal substructure + overlapping subproblems.', difficulty: 'Medium' },
  ],
  'System Design': [
    { q: 'How would you design a URL shortener like bit.ly?', a: 'Components: API server, URL database (store short↔long mapping), cache (Redis for hot URLs), load balancer. Short URL generation: Base62 encoding of auto-increment ID. Redirect: 301 (permanent) or 302 (temporary). Scale: DB sharding, read replicas.', difficulty: 'Hard' },
    { q: 'Explain CAP theorem.', a: 'CAP: distributed system can only guarantee 2 of 3: Consistency (all nodes see same data), Availability (every request gets response), Partition tolerance (system works despite network splits). CP systems: MongoDB, HBase. AP systems: Cassandra, CouchDB.', difficulty: 'Hard' },
  ],
};

const allQuestions = Object.entries(questions).flatMap(([cat, qs]) =>
  qs.map((q) => ({ ...q, category: cat }))
);

const difficultyColors: Record<string, string> = {
  Easy: '#059669',
  Medium: '#d97706',
  Hard: '#dc2626',
};

export function InterviewPrep() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [revealed, setRevealed] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);

  const displayQuestions = activeCategory === 'All'
    ? allQuestions
    : allQuestions.filter((q) => q.category === activeCategory);

  const toggleReveal = (i: number) =>
    setRevealed((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const toggleSave = (i: number) =>
    setSaved((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const practiceQuestion = displayQuestions[practiceIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>INTERVIEW PREP</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Interview Preparation
        </h1>
        <p className="text-muted-foreground">Practice real interview questions with model answers. Toggle practice mode for a focused session.</p>
      </div>

      {/* Mode Toggle + Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{displayQuestions.length} questions</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{saved.length} saved</span>
        </div>
        <button
          onClick={() => { setPracticeMode(!practiceMode); setPracticeIndex(0); setRevealed([]); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            practiceMode ? 'bg-amber-500 text-white' : ''
          }`}
          style={!practiceMode ? { background: 'var(--brand-gradient)', color: 'white', fontFamily: 'var(--font-display)' } : { fontFamily: 'var(--font-display)' }}
        >
          <Mic className="w-4 h-4" />
          {practiceMode ? 'Exit Practice Mode' : 'Practice Mode'}
        </button>
      </div>

      {/* Practice Mode */}
      {practiceMode && practiceQuestion && (
        <motion.div
          key={practiceIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 p-6 bg-card border-2 rounded-2xl"
          style={{ borderColor: 'var(--brand-blue)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground">Question {practiceIndex + 1} of {displayQuestions.length}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: difficultyColors[practiceQuestion.difficulty] + '20',
                color: difficultyColors[practiceQuestion.difficulty],
              }}
            >
              {practiceQuestion.difficulty}
            </span>
          </div>
          <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
            {practiceQuestion.q}
          </h2>
          {!revealed.includes(-1) ? (
            <button
              onClick={() => setRevealed([-1])}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <Eye className="w-4 h-4" /> Reveal Answer
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm text-muted-foreground leading-relaxed p-4 bg-muted rounded-xl">{practiceQuestion.a}</p>
            </motion.div>
          )}
          <div className="flex gap-3 mt-4">
            <button
              disabled={practiceIndex === 0}
              onClick={() => { setPracticeIndex(practiceIndex - 1); setRevealed([]); }}
              className="px-4 py-2 rounded-xl text-sm bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              disabled={practiceIndex === displayQuestions.length - 1}
              onClick={() => { setPracticeIndex(practiceIndex + 1); setRevealed([]); }}
              className="flex-1 py-2 rounded-xl text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Next Question →
            </button>
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              activeCategory === cat ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            style={activeCategory === cat ? { background: 'var(--brand-gradient)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Q&A List */}
      <div className="space-y-3">
        {displayQuestions.map((item, i) => {
          const isRevealed = revealed.includes(i);
          const isSaved = saved.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.5) }}
              className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-[var(--brand-blue)]"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: difficultyColors[item.difficulty] + '20',
                          color: difficultyColors[item.difficulty],
                        }}
                      >
                        {item.difficulty}
                      </span>
                      {activeCategory === 'All' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{item.q}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleSave(i)} className={isSaved ? 'text-amber-500' : 'text-muted-foreground hover:text-foreground transition-colors'}>
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button onClick={() => toggleReveal(i)} className="text-muted-foreground hover:text-foreground transition-colors">
                      {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--brand-blue)' }}>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Model Answer
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
