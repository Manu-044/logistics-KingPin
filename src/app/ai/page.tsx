'use client';
import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import Link from 'next/link';
import { aiInsights, aiMetrics } from '@/lib/data';

const modelCards = [
  {
    icon: '📦',
    title: 'Shipment Risk Predictor',
    desc: 'Analyzes weather, port congestion, carrier history & traffic to predict delays 48h in advance.',
    accuracy: 94,
    status: 'active',
    runs: '1,284 / day',
  },
  {
    icon: '🗺️',
    title: 'Route Optimizer',
    desc: 'Uses real-time fuel pricing, road closures, and customs wait-time data to find the optimal route.',
    accuracy: 98,
    status: 'active',
    runs: '340 / day',
  },
  {
    icon: '📊',
    title: 'Demand Forecaster',
    desc: 'Predicts inbound shipment volumes using historical trends, market data, and seasonal patterns.',
    accuracy: 88,
    status: 'active',
    runs: '48 / day',
  },
  {
    icon: '🤖',
    title: 'Carrier Performance AI',
    desc: 'Continuously scores all carriers on reliability, speed, and cost efficiency for smarter allocation.',
    accuracy: 91,
    status: 'training',
    runs: '12 / day',
  },
];

const recommendations = [
  { priority: 'HIGH', color: 'var(--accent-red)', action: 'Re-route LGX-2024-003 via Amsterdam hub', saving: '6h delay avoided', confidence: 87 },
  { priority: 'MEDIUM', color: 'var(--accent-orange)', action: 'Pre-book 18 carrier slots for Apr 16–18 surge', saving: '₹12,000 cost saving', confidence: 79 },
  { priority: 'LOW', color: 'var(--accent-blue)', action: 'Switch LGX-2024-005 to AirFreight Express carrier', saving: '4h faster, 91% reliability', confidence: 72 },
];

export default function AIPage() {
  const [activeModel, setActiveModel] = useState(0);
  const [appliedRecs, setAppliedRecs] = useState<number[]>([]);

  const applyRec = (i: number) => setAppliedRecs(prev => [...prev, i]);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="ai-gradient-text">✦ Kingpin AI</span>
            </h1>
            <p>Intelligent insights and predictive analytics for your operations</p>
          </div>
          <div className="topbar-actions">
            <div style={{ fontSize: 12, color: 'var(--accent-purple)', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 20, padding: '5px 14px', fontWeight: 600 }}>
              ● AI Models Online
            </div>
          </div>
        </header>

        <main className="page-content">
          {/* Header Banner */}
          <div className="ai-page-header">
            <div className="ai-page-icon">✦</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="ai-brand-badge" style={{ marginBottom: 8 }}>✦ Kingpin AI — Powered by Predictive Intelligence</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Your AI Operations Copilot</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 500 }}>
                Kingpin AI continuously monitors your entire logistics network, predicts disruptions before they happen, and automatically recommends optimizations — saving time and money.
              </p>
            </div>
            <div style={{ marginLeft: 'auto', position: 'relative', zIndex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Last model run</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-green)' }}>2 minutes ago</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Auto-refresh every 5 min</div>
            </div>
          </div>

          {/* AI Metrics */}
          <div className="ai-metric-grid">
            {aiMetrics.map((m) => (
              <div key={m.lbl} className="ai-metric-card">
                <div className="ai-metric-val">{m.val}</div>
                <div className="ai-metric-lbl">{m.lbl}</div>
              </div>
            ))}
          </div>

          <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Live Insights */}
            <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(139,92,246,0.2)' }}>
              <div className="ai-insights-header">
                <span style={{ fontSize: 18 }}>✦</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Live Predictive Alerts</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>Updated 2m ago</span>
              </div>
              {aiInsights.map((insight, i) => (
                <div key={i} className={`ai-insight-item ${insight.type}`}>
                  <div className="ai-insight-label">
                    <span>{insight.emoji}</span>
                    <span>{insight.label}</span>
                    <span className="ai-confidence" style={{
                      color: insight.type === 'alert' ? 'var(--accent-red)'
                        : insight.type === 'success' ? 'var(--accent-green)'
                        : insight.type === 'warning' ? 'var(--accent-orange)'
                        : 'var(--accent-blue)'
                    }}>{insight.confidence}%</span>
                  </div>
                  <div className="ai-insight-sub">{insight.sub}</div>
                </div>
              ))}
            </div>

            {/* AI Recommendations */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="ai-insights-header">
                <span style={{ fontSize: 18 }}>🎯</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>AI Recommendations</span>
              </div>
              {recommendations.map((rec, i) => (
                <div key={i} style={{ padding: '14px', borderRadius: 10, background: 'var(--bg-glass)', border: '1px solid var(--border)', marginBottom: 10, transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: `${rec.color}20`, color: rec.color, border: `1px solid ${rec.color}40` }}>{rec.priority}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Confidence: {rec.confidence}%</span>
                    {appliedRecs.includes(i) && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--accent-green)', fontWeight: 600 }}>✓ Applied</span>}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{rec.action}</p>
                  <p style={{ fontSize: 12, color: 'var(--accent-green)' }}>💡 {rec.saving}</p>
                  {!appliedRecs.includes(i) && (
                    <button
                      onClick={() => applyRec(i)}
                      className="btn btn-sm"
                      style={{ marginTop: 10, background: 'rgba(139,92,246,0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(139,92,246,0.3)', fontSize: 12 }}
                    >
                      ✦ Apply Recommendation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Models */}
          <div className="glass-card">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>✦ AI Models</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>4 models active · Auto-retraining enabled</div>
            </div>
            <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
              {modelCards.map((m, i) => (
                <div
                  key={i}
                  onClick={() => setActiveModel(i)}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    background: activeModel === i ? 'rgba(139,92,246,0.06)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ fontSize: 32, flexShrink: 0 }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{m.title}</div>
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: m.status === 'active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: m.status === 'active' ? 'var(--accent-green)' : 'var(--accent-orange)', fontWeight: 600, border: `1px solid ${m.status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
                          {m.status === 'active' ? '● Active' : '◉ Training'}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{m.desc}</p>
                      <div style={{ display: 'flex', gap: 18 }}>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Accuracy</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-purple)' }}>{m.accuracy}%</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Daily Runs</div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{m.runs}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Performance</div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${m.accuracy}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Link to Copilot */}
          <div style={{ marginTop: 20, padding: '20px 24px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.06))', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>✦ Have a question? Ask Kingpin AI</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Use the AI Copilot (✦ button, bottom right) to ask anything about your shipments, routes, and operations.</p>
            </div>
            <Link href="/simulation" className="btn btn-primary">
              🗺️ AI Route Optimizer →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
