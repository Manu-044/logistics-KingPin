import Link from 'next/link';

const features = [
  {
    icon: '📡',
    color: 'rgba(59,130,246,0.15)',
    title: 'Real-Time Tracking',
    desc: 'Monitor every shipment\'s position live with GPS precision. Get instant status updates and alerts as cargo moves across the globe.',
  },
  {
    icon: '🗺️',
    color: 'rgba(6,182,212,0.15)',
    title: 'Route Simulation',
    desc: 'Simulate and optimize delivery routes before dispatch. Predict ETAs and identify potential bottlenecks proactively.',
  },
  {
    icon: '📊',
    color: 'rgba(139,92,246,0.15)',
    title: 'Advanced Analytics',
    desc: 'Powerful dashboards with KPIs, delivery trends, carrier performance, and revenue insights — all in one view.',
  },
  {
    icon: '🤖',
    color: 'rgba(245,158,11,0.15)',
    title: 'AI-Powered ETA',
    desc: 'Machine learning models factor in traffic, weather, and historical data to deliver accurate arrival predictions.',
  },
  {
    icon: '🔔',
    color: 'rgba(16,185,129,0.15)',
    title: 'Smart Notifications',
    desc: 'Automated alerts for delays, arrivals, and anomalies delivered via email, SMS, or in-app push notifications.',
  },
  {
    icon: '🔐',
    color: 'rgba(239,68,68,0.15)',
    title: 'Enterprise Security',
    desc: 'End-to-end encryption, role-based access control, and full audit trails to keep your operations secure and compliant.',
  },
];

const stats = [
  { val: '98.7%', lbl: 'On-Time Delivery' },
  { val: '2.4M+', lbl: 'Shipments Tracked' },
  { val: '140+', lbl: 'Countries Covered' },
  { val: '< 2s', lbl: 'Live Update Latency' },
];

export default function LandingPage() {
  return (
    <>
      {/* NAV */}
      <nav className="landing-nav">
        <div className="landing-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
          }}>🚚</div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>KINGPIN</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: 2.5, marginTop: 2 }}>LOGISTICS</span>
          </div>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Platform</a>
          <a href="#cta">Pricing</a>
          <a href="#cta">Docs</a>
        </div>
        <div className="landing-nav-actions">
          <Link href="/login" className="btn btn-secondary btn-sm">Login</Link>
          <Link href="/signup" className="btn btn-primary btn-sm">Sign Up →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-orb" style={{ width: 600, height: 600, background: 'rgba(59,130,246,0.08)', top: -200, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="hero-orb" style={{ width: 300, height: 300, background: 'rgba(6,182,212,0.06)', bottom: 0, right: '10%' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10vh' }}>
          <h1 style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1, background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', color: 'transparent', margin: 0, textShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
            KINGPIN
          </h1>
          <h2 style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.5em', marginTop: 16 }}>
            LOGISTICS
          </h2>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-tag">Platform Features</div>
        <h2 className="section-title">Everything you need to<br />dominate logistics</h2>
        <p className="section-sub">From first-mile pickup to last-mile delivery — Kingpin Logistics covers every step of your supply chain.</p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title">Ready to transform<br />your logistics?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 36, maxWidth: 400, margin: '12px auto 36px' }}>
            Join thousands of operations teams who trust Kingpin Logistics to run smarter, faster supply chains.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn btn-primary btn-lg">Sign Up</Link>
            <Link href="/login" className="btn btn-secondary btn-lg">Login</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '28px 40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>🚚</span>
          <div style={{ fontWeight: 800, fontSize: 16, display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            Kingpin
            <span style={{ fontSize: '10px', color: 'var(--accent-blue)', marginTop: '-2px' }}>Logistics</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2024 Kingpin Logistics. Intelligent logistics at scale.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Support'].map((l) => (
            <a key={l} href="#" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
