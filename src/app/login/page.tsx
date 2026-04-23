'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', { email, password, redirect: false });
    
    if (res?.ok) {
      const session = await getSession();
      if ((session?.user as any)?.role === 'EMPLOYEE') {
        router.push('/dashboard');
      } else {
        router.push('/user');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb" style={{ width: 500, height: 500, background: 'rgba(59,130,246,0.08)', top: -150, left: -150 }} />
      <div className="auth-bg-orb" style={{ width: 400, height: 400, background: 'rgba(6,182,212,0.06)', bottom: -100, right: -100 }} />

      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🚚</div>
          <div style={{ fontWeight: 800, fontSize: 20, display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            Kingpin
            <span style={{ fontSize: '13px', color: 'var(--accent-blue)', marginTop: '-2px' }}>Logistics</span>
          </div>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Login to access your logistics command center</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-icon-wrap">
              <span className="input-icon">📧</span>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-icon-wrap">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>



          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <a href="#" style={{ color: 'var(--accent-blue)', fontSize: 13 }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 0', fontSize: 15, fontWeight: 600 }}>
            Login →
          </button>
        </form>

        <div className="form-divider"><span>or continue with</span></div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            type="button"
            className="btn btn-secondary" 
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => signIn('google', { callbackUrl: '/user' })}
          >
            🌐 Google
          </button>
          <button 
            type="button"
            className="btn btn-secondary" 
            style={{ flex: 1, justifyContent: 'center' }}
          >
            🐙 GitHub
          </button>
        </div>

        <p className="auth-footer">
          Don&apos;t have an account? <Link href="/signup">Create one →</Link>
        </p>
      </div>
    </div>
  );
}
