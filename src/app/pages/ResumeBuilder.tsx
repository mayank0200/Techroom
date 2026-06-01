import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Eye, FileText, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Lock } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern Blue', desc: 'Clean, ATS-friendly', premium: false, color: '#2563eb', preview: '🔵' },
  { id: 'minimal', name: 'Minimal Gray', desc: 'Simple, professional', premium: false, color: '#6b7280', preview: '⬛' },
  { id: 'elegant', name: 'Elegant Purple', desc: 'Creative roles', premium: true, color: '#7c3aed', preview: '🟣' },
  { id: 'executive', name: 'Executive Dark', desc: 'Senior positions', premium: true, color: '#0f172a', preview: '⚫' },
  { id: 'tech', name: 'Tech Resume', desc: 'SWE & Dev roles', premium: false, color: '#059669', preview: '🟢' },
  { id: 'intern', name: 'Fresher / Intern', desc: 'Entry-level students', premium: false, color: '#d97706', preview: '🟡' },
];

type Section = { title: string; company: string; period: string; desc: string };

export function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [form, setForm] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Jaipur, Rajasthan',
    linkedin: 'linkedin.com/in/rahulsharma',
    github: 'github.com/rahulsharma',
    summary: 'Final year B.Tech CSE student at JECRC College with strong background in Python, ML, and web development. Looking for internship and full-time SWE opportunities.',
    skills: 'Python, React, Node.js, SQL, Machine Learning, Git, Docker',
  });
  const [education, setEducation] = useState([
    { degree: 'B.Tech Computer Science', institution: 'JECRC College, Jaipur', year: '2022–2026', gpa: '8.6 CGPA' },
  ]);
  const [experience, setExperience] = useState<Section[]>([
    { title: 'Full Stack Developer Intern', company: 'TechStartup Pvt. Ltd.', period: 'Jun–Aug 2025', desc: 'Built REST APIs with Node.js and React dashboard, improving load time by 40%. Deployed on AWS EC2.' },
  ]);
  const [projects, setProjects] = useState<Section[]>([
    { title: 'House Price Predictor', company: 'Python · Scikit-learn · Streamlit', period: '2024', desc: 'ML model with 92% accuracy using XGBoost. Live Streamlit app with 500+ monthly users.' },
  ]);

  const template = templates.find((t) => t.id === selectedTemplate)!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>CAREER TOOLS</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          Resume Builder
        </h1>
        <p className="text-muted-foreground">Create ATS-optimized resumes that get past filters and land interviews.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left: Templates + Form */}
        <div className="xl:col-span-2 space-y-6">
          {/* Template Selector */}
          <div className="p-5 bg-card border border-border rounded-xl">
            <h2 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Choose Template</h2>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => !t.premium && setSelectedTemplate(t.id)}
                  className={`relative p-3 rounded-xl border-2 transition-all text-center ${
                    selectedTemplate === t.id ? '' : 'border-border hover:border-[var(--brand-blue)]'
                  } ${t.premium ? 'opacity-60' : ''}`}
                  style={selectedTemplate === t.id ? { borderColor: t.color, background: t.color + '10' } : {}}
                >
                  <div className="text-xl mb-1">{t.preview}</div>
                  <div className="text-xs leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                  {t.premium && (
                    <div className="absolute top-1 right-1">
                      <Lock className="w-3 h-3 text-amber-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-5 bg-card border border-border rounded-xl space-y-4">
            <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Personal Information</h2>
            {[
              { key: 'name', label: 'Full Name' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'location', label: 'Location' },
              { key: 'linkedin', label: 'LinkedIn URL' },
              { key: 'github', label: 'GitHub URL' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs text-muted-foreground mb-1">{label}</label>
                <input
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Professional Summary</label>
              <textarea
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm outline-none resize-none focus:border-[var(--brand-blue)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Skills (comma-separated)</label>
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="p-5 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Experience</h2>
              <button
                onClick={() => setExperience([...experience, { title: '', company: '', period: '', desc: '' }])}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all text-white"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="border border-border rounded-lg p-3 mb-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Job Title" value={exp.title} onChange={(e) => { const x = [...experience]; x[i].title = e.target.value; setExperience(x); }} className="px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none focus:border-[var(--brand-blue)] transition-colors" />
                  <input placeholder="Company" value={exp.company} onChange={(e) => { const x = [...experience]; x[i].company = e.target.value; setExperience(x); }} className="px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none focus:border-[var(--brand-blue)] transition-colors" />
                </div>
                <input placeholder="Period (e.g. Jun–Aug 2025)" value={exp.period} onChange={(e) => { const x = [...experience]; x[i].period = e.target.value; setExperience(x); }} className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none focus:border-[var(--brand-blue)] transition-colors" />
                <textarea placeholder="Description (use bullet points)" value={exp.desc} onChange={(e) => { const x = [...experience]; x[i].desc = e.target.value; setExperience(x); }} rows={2} className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none resize-none focus:border-[var(--brand-blue)] transition-colors" />
                <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="p-5 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Projects</h2>
              <button
                onClick={() => setProjects([...projects, { title: '', company: '', period: '', desc: '' }])}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg text-white"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {projects.map((proj, i) => (
              <div key={i} className="border border-border rounded-lg p-3 mb-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Project Name" value={proj.title} onChange={(e) => { const x = [...projects]; x[i].title = e.target.value; setProjects(x); }} className="px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none focus:border-[var(--brand-blue)] transition-colors" />
                  <input placeholder="Tech Stack" value={proj.company} onChange={(e) => { const x = [...projects]; x[i].company = e.target.value; setProjects(x); }} className="px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none focus:border-[var(--brand-blue)] transition-colors" />
                </div>
                <textarea placeholder="Description & impact" value={proj.desc} onChange={(e) => { const x = [...projects]; x[i].desc = e.target.value; setProjects(x); }} rows={2} className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted text-xs outline-none resize-none focus:border-[var(--brand-blue)] transition-colors" />
                <button onClick={() => setProjects(projects.filter((_, j) => j !== i))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
              </div>
            ))}
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm text-white font-semibold transition-all hover:opacity-90"
            style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)' }}
          >
            <Download className="w-4 h-4" /> Download PDF Resume
          </button>
        </div>

        {/* Right: Live Preview */}
        <div className="xl:col-span-2">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Live Preview</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--brand-purple)' }} />
                ATS-Optimized
              </div>
            </div>

            {/* Resume Preview */}
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-lg text-gray-900 p-8 min-h-[700px]" style={{ fontFamily: 'Georgia, serif' }}>
              {/* Header */}
              <div className="border-b-2 pb-4 mb-4" style={{ borderColor: template.color }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: template.color }}>
                  {form.name}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
                  <span>{form.email}</span>
                  <span>|</span>
                  <span>{form.phone}</span>
                  <span>|</span>
                  <span>{form.location}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs mt-1" style={{ color: template.color }}>
                  <span>{form.linkedin}</span>
                  <span>|</span>
                  <span>{form.github}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h2 className="text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: template.color }}>Summary</h2>
                <p className="text-xs leading-relaxed text-gray-700">{form.summary}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h2 className="text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: template.color }}>Technical Skills</h2>
                <p className="text-xs text-gray-700">{form.skills}</p>
              </div>

              {/* Education */}
              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h2 className="text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: template.color }}>Education</h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{edu.degree}</div>
                      <div className="text-xs text-gray-600">{edu.institution}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div>{edu.year}</div>
                      <div>{edu.gpa}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Experience */}
              {experience.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: template.color }}>Experience</h2>
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{exp.title}</div>
                          <div className="text-xs text-gray-600">{exp.company}</div>
                        </div>
                        <div className="text-xs text-gray-500">{exp.period}</div>
                      </div>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-wider mb-2 font-bold" style={{ color: template.color }}>Projects</h2>
                  {projects.map((proj, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-bold text-gray-900">{proj.title}</span>
                          {proj.company && <span className="text-xs text-gray-500 ml-2">| {proj.company}</span>}
                        </div>
                        <div className="text-xs text-gray-500">{proj.period}</div>
                      </div>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
