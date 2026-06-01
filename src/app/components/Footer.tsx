import { Link } from 'react-router';
import { Code2, Twitter, Github, Linkedin, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Roadmaps', href: '/roadmaps' },
    { label: 'Courses', href: '/courses' },
    { label: 'Notes Library', href: '/notes' },
    { label: 'Projects', href: '/projects' },
  ],
  Tools: [
    { label: 'Resume Builder', href: '/resume-builder' },
    { label: 'ATS Checker', href: '/ats-checker' },
    { label: 'Interview Prep', href: '/interview-prep' },
    { label: 'College Hub', href: '/college-hub' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-gradient)' }}>
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>
                Tech<span style={{ color: 'var(--brand-blue)' }}>room</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Empowering students with free, structured learning paths, curated YouTube courses, and career-ready tools.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Mail, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm text-foreground mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Techroom. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
