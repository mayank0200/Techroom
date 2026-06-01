import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, ChevronRight, Sparkles, Lock, RefreshCw } from 'lucide-react';

const mockResult = {
  score: 72,
  sections: [
    { label: 'Contact Information', status: 'pass', note: 'Name, email, phone all detected' },
    { label: 'Work Experience', status: 'pass', note: '2 positions found with proper date format' },
    { label: 'Education', status: 'pass', note: 'Degree, institution, GPA detected' },
    { label: 'Skills Section', status: 'warn', note: 'Skills section present but consider adding more keywords' },
    { label: 'Summary / Objective', status: 'pass', note: 'Professional summary detected' },
    { label: 'Action Verbs', status: 'warn', note: 'Found 4/10 recommended action verbs' },
    { label: 'Quantified Impact', status: 'fail', note: 'Add numbers/metrics to achievements (e.g., "improved by 40%")' },
    { label: 'File Format', status: 'pass', note: 'PDF format detected — ATS-friendly' },
    { label: 'Font & Formatting', status: 'warn', note: 'Avoid tables/columns — some ATS cannot parse them' },
    { label: 'Length', status: 'pass', note: '1 page — ideal for freshers' },
  ],
  missingKeywords: ['TypeScript', 'REST API', 'Agile', 'Git', 'CI/CD', 'Unit Testing', 'Problem-solving'],
  improvements: [
    'Add measurable results to at least 3 bullet points (e.g., "Reduced load time by 30%")',
    'Include "TypeScript" and "REST API" in your skills or experience section',
    'Replace tables/text boxes with simple paragraphs for better ATS parsing',
    'Add a "Certifications" section to boost credibility',
    'Use more action verbs: "Developed", "Optimized", "Designed", "Led", "Implemented"',
    'Add LinkedIn profile URL for easy recruiter follow-up',
  ],
};

type Status = 'pass' | 'warn' | 'fail';

const statusConfig: Record<Status, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  pass: { icon: CheckCircle2, color: '#059669', bg: '#05966915' },
  warn: { icon: AlertCircle, color: '#d97706', bg: '#d9770615' },
  fail: { icon: XCircle, color: '#dc2626', bg: '#dc262615' },
};

export function ATSChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const analyze = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(mockResult);
    }, 2500);
  };

  const scoreColor = result
    ? result.score >= 80 ? '#059669' : result.score >= 60 ? '#d97706' : '#dc2626'
    : '#2563eb';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>CAREER TOOLS</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          ATS Resume Checker
        </h1>
        <p className="text-muted-foreground">Upload your resume and get an instant ATS compatibility score with actionable improvements.</p>
      </div>

      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all mb-6 ${
          dragOver ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5' : 'border-border bg-card hover:border-[var(--brand-blue)]'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <Upload className="w-6 h-6 text-white" />
        </div>
        {file ? (
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <FileText className="w-5 h-5" style={{ color: 'var(--brand-blue)' }} />
              <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{file.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB · Ready to analyze</p>
          </div>
        ) : (
          <div>
            <p className="text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Drop your resume here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX · Max 10MB</p>
          </div>
        )}
      </div>

      {file && !result && (
        <button
          onClick={analyze}
          disabled={analyzing}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm text-white font-semibold transition-all hover:opacity-90 disabled:opacity-70 mb-8"
          style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)' }}
        >
          {analyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Analyze Resume
            </>
          )}
        </button>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="p-6 bg-card border border-border rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Circle Score */}
                <div className="relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--muted)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke={scoreColor} strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${result.score * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: scoreColor }}>
                      {result.score}
                    </span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                    {result.score >= 80 ? '🎉 Excellent!' : result.score >= 60 ? '⚠️ Needs Improvement' : '❌ Poor ATS Score'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {result.score >= 80
                      ? 'Your resume is well-optimized for ATS systems.'
                      : result.score >= 60
                      ? 'A few improvements can significantly increase your interview rate.'
                      : 'Major changes needed. Follow the suggestions below.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600">
                      <CheckCircle2 className="w-3 h-3" />
                      {result.sections.filter((s) => s.status === 'pass').length} Passed
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600">
                      <AlertCircle className="w-3 h-3" />
                      {result.sections.filter((s) => s.status === 'warn').length} Warnings
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-600">
                      <XCircle className="w-3 h-3" />
                      {result.sections.filter((s) => s.status === 'fail').length} Failed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Analysis */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Section Analysis</h3>
              </div>
              <div className="divide-y divide-border">
                {result.sections.map((sec) => {
                  const { icon: Icon, color, bg } = statusConfig[sec.status as Status];
                  return (
                    <div key={sec.label} className="flex items-center gap-3 p-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{sec.label}</div>
                        <div className="text-xs text-muted-foreground">{sec.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw) => (
                  <span key={kw} className="text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Improvement Suggestions
              </h3>
              <div className="space-y-3">
                {result.improvements.map((imp, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white shrink-0 mt-0.5"
                      style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)', fontWeight: 700 }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{imp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl text-sm text-white font-semibold hover:opacity-90 transition-all"
                style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)' }}
              >
                Fix & Rebuild Resume
              </button>
              <button
                onClick={() => { setFile(null); setResult(null); }}
                className="px-4 py-3 rounded-xl text-sm bg-muted text-muted-foreground hover:text-foreground transition-all"
              >
                Check Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
