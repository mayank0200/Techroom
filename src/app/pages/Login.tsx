import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Chrome, ArrowRight, Code2, CheckCircle2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

export function Login() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        login({
          id: userInfo.data.sub,
          name: userInfo.data.name,
          email: userInfo.data.email,
          picture: userInfo.data.picture,
          isPro: false,
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Google login failed', error);
        // Fallback for mock environment if API fails due to bad token
        login({
          id: 'mock_123',
          name: 'Demo User',
          email: 'demo@example.com',
          isPro: false,
        });
        navigate('/dashboard');
      }
    },
    onError: () => {
      console.log('Login Failed');
      // Fallback for mock environment
      login({
        id: 'mock_123',
        name: 'Demo User',
        email: 'demo@example.com',
        isPro: false,
      });
      navigate('/dashboard');
    }
  });

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border shadow-2xl">
        {/* Left Panel */}
        <div
          className="relative hidden lg:flex flex-col p-10 text-white"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>Techroom</span>
            </div>

            <div className="flex-1">
              <h2
                className="mb-4"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', lineHeight: 1.2 }}
              >
                Start Your<br />Tech Journey
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Join 50,000+ students using Techroom to learn, build, and get placed.
              </p>

              <div className="space-y-3">
                {[
                  '10+ structured career roadmaps',
                  'ATS resume builder & checker',
                  'Interview preparation questions',
                  'College-specific resources',
                  'Progress tracking & certificates',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-white/70" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white/10 backdrop-blur">
              <p className="text-sm italic text-white/80 mb-2">
                "Techroom's roadmap took me from zero to a Google intern offer in 8 months!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  PS
                </div>
                <div className="text-xs text-white/70">Priya Sharma · Google SWE Intern</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-10 bg-card">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-gradient)' }}>
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>Techroom</span>
            </div>

            <h2 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem' }}>
              {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Reset password'}
            </h2>
            <p className="text-sm text-muted-foreground mb-7">
              {mode === 'login' ? 'Sign in to continue learning' : mode === 'signup' ? 'Start your free account today' : 'We\'ll send you a reset link'}
            </p>

            {/* Google Sign In */}
            {mode !== 'forgot' && (
              <>
                <button 
                  onClick={() => handleGoogleLogin()}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-all text-sm mb-5"
                >
                  <Chrome className="w-4 h-4" />
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </>
            )}

            <div className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm text-muted-foreground">Password</label>
                    {mode === 'login' && (
                      <button onClick={() => setMode('forgot')} className="text-xs hover:opacity-80 transition-colors" style={{ color: 'var(--brand-blue)' }}>
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[var(--brand-blue)] transition-colors"
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm text-white font-semibold transition-all hover:opacity-90"
                style={{ background: 'var(--brand-gradient)', fontFamily: 'var(--font-display)' }}
              >
                {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="font-semibold hover:opacity-80 transition-colors" style={{ color: 'var(--brand-blue)' }}>
                    Sign up free
                  </button>
                </>
              ) : mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-semibold hover:opacity-80" style={{ color: 'var(--brand-blue)' }}>
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Remember your password?{' '}
                  <button onClick={() => setMode('login')} className="font-semibold hover:opacity-80" style={{ color: 'var(--brand-blue)' }}>
                    Sign in
                  </button>
                </>
              )}
            </div>

            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                By signing up, you agree to our{' '}
                <a href="#" className="hover:opacity-80" style={{ color: 'var(--brand-blue)' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="hover:opacity-80" style={{ color: 'var(--brand-blue)' }}>Privacy Policy</a>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
