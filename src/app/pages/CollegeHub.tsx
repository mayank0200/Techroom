import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, FileText, BookOpen, Briefcase, ExternalLink, Download, Star, ChevronRight } from 'lucide-react';

const colleges = [
  {
    id: 'arya',
    name: 'Arya College',
    location: 'Jaipur, Rajasthan',
    ranking: 'Top 5 in Rajasthan',
    students: 8500,
    placementRate: '78%',
    avgPackage: '5.2 LPA',
    logo: 'AC',
    color: '#2563eb',
  },
  {
    id: 'poornima',
    name: 'Poornima University',
    location: 'Jaipur, Rajasthan',
    ranking: 'NAAC A Grade',
    students: 12000,
    placementRate: '82%',
    avgPackage: '6.1 LPA',
    logo: 'PU',
    color: '#7c3aed',
  },
  {
    id: 'jecrc',
    name: 'JECRC College',
    location: 'Jaipur, Rajasthan',
    ranking: 'NBA Accredited',
    students: 9200,
    placementRate: '75%',
    avgPackage: '5.8 LPA',
    logo: 'JC',
    color: '#059669',
  },
  {
    id: 'skit',
    name: 'SKIT College',
    location: 'Jaipur, Rajasthan',
    ranking: 'Top Engineering College',
    students: 7800,
    placementRate: '72%',
    avgPackage: '4.9 LPA',
    logo: 'SK',
    color: '#d97706',
  },
];

const resourceTabs = ['Placement Resources', 'Previous Year Papers', 'Important Notes', 'Internship Opportunities'];

const resources: Record<string, Record<string, { title: string; type: string; size?: string; company?: string; stipend?: string; link: string }[]>> = {
  arya: {
    'Placement Resources': [
      { title: 'Arya College Placement Brochure 2025', type: 'PDF', size: '2.1 MB', link: '#' },
      { title: 'Interview Experience — TCS Drive', type: 'PDF', size: '0.8 MB', link: '#' },
      { title: 'Campus Placement Guide', type: 'PDF', size: '1.5 MB', link: '#' },
    ],
    'Previous Year Papers': [
      { title: 'Data Structures (CS301) — 2024', type: 'PDF', size: '1.2 MB', link: '#' },
      { title: 'Algorithms (CS401) — 2024', type: 'PDF', size: '0.9 MB', link: '#' },
      { title: 'DBMS (CS302) — 2024', type: 'PDF', size: '1.1 MB', link: '#' },
      { title: 'Operating Systems (CS303) — 2023', type: 'PDF', size: '0.8 MB', link: '#' },
    ],
    'Important Notes': [
      { title: 'Compiler Design Notes', type: 'PDF', size: '3.2 MB', link: '#' },
      { title: 'Computer Networks Short Notes', type: 'PDF', size: '1.8 MB', link: '#' },
      { title: 'Software Engineering Notes', type: 'PDF', size: '2.4 MB', link: '#' },
    ],
    'Internship Opportunities': [
      { title: 'TCS Campus Internship 2026', type: 'Link', company: 'TCS', stipend: '₹15,000/mo', link: '#' },
      { title: 'Infosys InfyTQ Program', type: 'Link', company: 'Infosys', stipend: '₹12,000/mo', link: '#' },
      { title: 'Wipro Campus Connect', type: 'Link', company: 'Wipro', stipend: '₹10,000/mo', link: '#' },
    ],
  },
};

// Default resources for colleges without specific data
const defaultResources: Record<string, { title: string; type: string; size?: string; company?: string; stipend?: string; link: string }[]> = {
  'Placement Resources': [
    { title: 'College Placement Brochure 2025', type: 'PDF', size: '2.1 MB', link: '#' },
    { title: 'Interview Preparation Guide', type: 'PDF', size: '1.3 MB', link: '#' },
  ],
  'Previous Year Papers': [
    { title: 'Data Structures — 2024', type: 'PDF', size: '1.2 MB', link: '#' },
    { title: 'Algorithms — 2024', type: 'PDF', size: '0.9 MB', link: '#' },
  ],
  'Important Notes': [
    { title: 'Computer Networks Notes', type: 'PDF', size: '2.0 MB', link: '#' },
    { title: 'DBMS Notes', type: 'PDF', size: '1.5 MB', link: '#' },
  ],
  'Internship Opportunities': [
    { title: 'TCS Campus Internship 2026', type: 'Link', company: 'TCS', stipend: '₹15,000/mo', link: '#' },
    { title: 'Wipro Campus Connect', type: 'Link', company: 'Wipro', stipend: '₹10,000/mo', link: '#' },
  ],
};

export function CollegeHub() {
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]);
  const [activeTab, setActiveTab] = useState(resourceTabs[0]);

  const collegeResources = resources[selectedCollege.id] ?? Object.fromEntries(resourceTabs.map((t) => [t, defaultResources[t] ?? []]));
  const tabResources = collegeResources[activeTab] ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-sm font-semibold" style={{ color: 'var(--brand-blue)' }}>COLLEGE HUB</span>
        <h1 className="mt-1 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>
          College Hub
        </h1>
        <p className="text-muted-foreground">Access placement resources, past papers, and internship opportunities specific to your college.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* College Selector */}
        <div className="lg:col-span-1">
          <h2 className="text-sm mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Select Your College</h2>
          <div className="space-y-2">
            {colleges.map((college) => (
              <button
                key={college.id}
                onClick={() => setSelectedCollege(college)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  selectedCollege.id === college.id
                    ? 'border-[var(--brand-blue)]'
                    : 'border-border hover:border-[var(--brand-blue)] bg-card'
                }`}
                style={selectedCollege.id === college.id ? { background: college.color + '10', borderColor: college.color } : {}}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs shrink-0"
                  style={{ background: college.color, fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {college.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{college.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{college.location}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* College Content */}
        <div className="lg:col-span-3">
          {/* College Header */}
          <motion.div
            key={selectedCollege.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-card border border-border rounded-2xl mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{ background: selectedCollege.color, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}
              >
                {selectedCollege.logo}
              </div>
              <div className="flex-1">
                <h2 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem' }}>
                  {selectedCollege.name}
                </h2>
                <p className="text-sm text-muted-foreground">{selectedCollege.location} · {selectedCollege.ranking}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
              {[
                { label: 'Students', value: selectedCollege.students.toLocaleString() },
                { label: 'Placement Rate', value: selectedCollege.placementRate },
                { label: 'Avg Package', value: selectedCollege.avgPackage },
              ].map(({ label, value }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-muted">
                  <div className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: selectedCollege.color }}>
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {resourceTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  activeTab === tab ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
                style={activeTab === tab ? { background: 'var(--brand-gradient)' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Resources */}
          <motion.div
            key={activeTab + selectedCollege.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {tabResources.map((resource, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-[var(--brand-blue)] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: selectedCollege.color + '20' }}
                >
                  {resource.type === 'PDF'
                    ? <FileText className="w-5 h-5" style={{ color: selectedCollege.color }} />
                    : <Briefcase className="w-5 h-5" style={{ color: selectedCollege.color }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {resource.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {resource.type === 'PDF' ? resource.size : `${resource.company} · ${resource.stipend}`}
                  </div>
                </div>
                <a
                  href={resource.link}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white transition-all hover:opacity-90 shrink-0"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  {resource.type === 'PDF' ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  {resource.type === 'PDF' ? 'Download' : 'Apply'}
                </a>
              </div>
            ))}

            {tabResources.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Building2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No resources available yet for this section.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
