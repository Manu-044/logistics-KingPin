'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) {
        const error = await res.json();
        alert(error.message || 'Registration failed');
        return;
      }

      const signRes = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false
      });

      if (signRes?.ok) {
        router.push('/user');
      } else {
        alert('Could not auto-login after registration');
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred during signup.');
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-bg-orb" style={{ width: 500, height: 500, background: 'rgba(139,92,246,0.07)', top: -100, right: -100 }} />
      <div className="auth-bg-orb" style={{ width: 350, height: 350, background: 'rgba(59,130,246,0.07)', bottom: -100, left: -100 }} />

      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div className="auth-logo">
          <div className="auth-logo-icon">🚚</div>
          <div style={{ fontWeight: 800, fontSize: 20, display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            Kingpin
            <span style={{ fontSize: '13px', color: 'var(--accent-blue)', marginTop: '-2px' }}>Logistics</span>
          </div>
        </div>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start your 14-day free trial — no credit card required</p>

        <form onSubmit={handleSubmit}>
          <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 0 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <input id="name" type="text" className="input-field" placeholder="Arjun Nair" value={form.name} onChange={update('name')} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="company">Company</label>
              <div className="input-icon-wrap">
                <span className="input-icon">🏢</span>
                <input id="company" type="text" className="input-field" placeholder="LogiCorp Ltd" value={form.company} onChange={update('company')} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Work Email</label>
            <div className="input-icon-wrap">
              <span className="input-icon">📧</span>
              <input id="email" type="email" className="input-field" placeholder="you@company.com" value={form.email} onChange={update('email')} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-icon-wrap">
              <span className="input-icon">🔒</span>
              <input id="password" type="password" className="input-field" placeholder="Min. 8 characters" value={form.password} onChange={update('password')} required />
            </div>
          </div>



          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>
            By signing up, you agree to our <a href="#" style={{ color: 'var(--accent-blue)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--accent-blue)' }}>Privacy Policy</a>.
          </p>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 0', fontSize: 15, fontWeight: 600 }}>
            Create Account 🚀
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

        <p className="auth-footer" style={{ marginTop: 20 }}>
          Already have an account? <Link href="/login">Login →</Link>
        </p>
      </div>
    </div>
  );
}
