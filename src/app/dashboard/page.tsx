import Sidebar from '@/components/Dashboard/Sidebar';
import Link from 'next/link';
import { dashboardStats, mockShipments, weeklyData } from '@/lib/data';

function StatCard({ icon, label, value, change }: { icon: string; label: string; value: string; change: number }) {
  const pos = change >= 0;
  return (
    <div className="glass-card stat-card" style={{ flex: '1 1 200px', minWidth: 150 }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-change ${pos ? 'positive' : 'negative'}`}>
        {pos ? '↑' : '↓'} {Math.abs(change)}% vs last week
      </div>
    </div>
  );
}

function BarChart() {
  const maxVal = Math.max(...weeklyData.map(d => d.shipments));
  return (
    <div className="glass-card chart-wrapper" style={{ flex: '1 1 400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div className="chart-title">Weekly Shipments</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-blue)', display: 'inline-block' }} /> Total
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent-cyan)', display: 'inline-block' }} /> Delivered
          </span>
        </div>
      </div>
      <div className="bar-chart" style={{ overflowX: 'auto', display: 'flex', minWidth: '100%' }}>
        {weeklyData.map((d) => (
          <div key={d.day} className="bar-group" style={{ flex: 1, minWidth: 40 }}>
            <div className="bars">
              <div className="bar bar-a" style={{ height: `${(d.shipments / maxVal) * 130}px` }} title={`${d.shipments} shipments`} />
              <div className="bar bar-b" style={{ height: `${(d.delivered / maxVal) * 130}px` }} title={`${d.delivered} delivered`} />
            </div>
            <div className="bar-label">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const recent = mockShipments.slice(0, 4);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar" style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
          <div className="topbar-left" style={{ flex: '1 1 300px' }}>
            <h1>Dashboard</h1>
            <p>Good morning, Arjun! 👋 Here&apos;s your operations overview.</p>
          </div>
          <div className="topbar-actions" style={{ flexWrap: 'wrap' }}>
            <div className="icon-btn">🔔<div className="notif-dot" /></div>
            <Link href="/admin"><div className="icon-btn">⚙️</div></Link>
            <Link href="/shipments/create" className="btn btn-primary btn-sm">+ New Shipment</Link>
          </div>
        </header>

        <main className="page-content">
          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24 }} className="anim-fade-up">
            {dashboardStats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Chart + AI Insights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
            <BarChart />


          </div>

          {/* Recent Shipments */}
          <div className="glass-card" style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
              <div className="chart-title" style={{ margin: 0 }}>Recent Shipments</div>
              <Link href="/shipments" className="btn btn-secondary btn-sm">View All →</Link>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="data-table" style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Origin → Destination</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Progress</th>
                    <th>ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((s) => (
                    <tr key={s.id}>
                      <td><Link href={`/tracking?id=${s.trackingNumber}`}><span style={{ fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 600 }}>{s.trackingNumber}</span></Link></td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{s.origin} → {s.destination}</td>
                      <td>{s.customer}</td>
                      <td><span className={`badge badge-${s.status}`}>{s.status.replace('_', ' ')}</span></td>
                      <td>
                        <span className="badge" style={{ 
                          background: s.priority === 'Urgent' ? 'rgba(239,68,68,0.15)' : s.priority === 'Express' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)', 
                          color: s.priority === 'Urgent' ? 'var(--accent-red)' : s.priority === 'Express' ? 'var(--accent-orange)' : 'var(--accent-blue)',
                          border: `1px solid ${s.priority === 'Urgent' ? 'rgba(239,68,68,0.3)' : s.priority === 'Express' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'}`
                        }}>
                          {s.priority}
                        </span>
                      </td>
                      <td style={{ width: 120 }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.progress}%</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{s.estimatedDelivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Feedback */}
          <div className="glass-card" style={{ width: '100%', overflow: 'hidden', marginTop: 24 }}>
            <div style={{ padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
              <div className="chart-title" style={{ margin: 0 }}>Recent User Feedback</div>
            </div>
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {[
                { name: 'Ravi Menon', text: 'Tracking UI is very smooth. Could use an export to PDF option for shipments.', date: 'Today, 10:45 AM', rating: '⭐️⭐️⭐️⭐️⭐️' },
                { name: 'Priya Sharma', text: 'Delays on the Delhi route. Need better notifications regarding cargo holding.', date: 'Yesterday', rating: '⭐️⭐️⭐️' }
              ].map((fb, i) => (
                <div key={i} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-glass)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                     <span style={{ fontWeight: 600 }}>{fb.name}</span>
                     <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{fb.date}</span>
                   </div>
                   <div style={{ fontSize: 13, marginBottom: 8 }}>{fb.rating}</div>
                   <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>"{fb.text}"</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
