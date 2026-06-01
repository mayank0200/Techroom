import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Moon, Sun, Menu, X, Code2, BookOpen, Map, FolderOpen, FileText, Mic, Building2, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { label: 'Roadmaps', href: '/roadmaps', icon: Map },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Notes', href: '/notes', icon: FolderOpen },
  { label: 'Projects', href: '/projects', icon: Code2 },
  { label: 'Resume', href: '/resume-builder', icon: FileText },
  { label: 'Interview', href: '/interview-prep', icon: Mic },
  { label: 'Colleges', href: '/college-hub', icon: Building2 },
];

export function Navbar() {
  const { dark, setDark } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-gradient)' }}>
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>
            Tech<span style={{ color: 'var(--brand-blue)' }}>room</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              style={isActive(link.href) ? { background: 'var(--brand-gradient)' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* Login or User Profile */}
          {user ? (
            <div className="hidden sm:flex items-center gap-3 ml-2 border-l border-border pl-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold leading-tight">{user.name}</span>
                {user.isPro ? (
                  <span className="text-[10px] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-1.5 py-0.5 rounded uppercase font-bold">Pro</span>
                ) : (
                  <Link to="/pricing" className="text-[10px] text-muted-foreground hover:text-blue-500 transition-colors">Upgrade</Link>
                )}
              </div>
              <img src={user.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format'} alt={user.name} className="w-8 h-8 rounded-full border border-border" />
              <button onClick={logout} className="text-xs text-muted-foreground hover:text-red-500 ml-2">Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm text-white transition-all hover:opacity-90"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Get Started
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    style={isActive(link.href) ? { background: 'var(--brand-gradient)' } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-border my-2" />
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-muted text-foreground"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
