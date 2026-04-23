'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function UserPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!trackingNumber.trim()) return;
    
    setLoading(true);
    setError('');
    setShipment(null);
    
    try {
      const res = await fetch(`/api/shipments/${trackingNumber.trim()}`);
      if (!res.ok) {
        throw new Error('Shipment not found. Please verify the tracking number.');
      }
      const data = await res.json();
      setShipment(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px', background: 'var(--bg-primary)' }}>
      {/* Top Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid var(--border)', marginBottom: 40, flexWrap: 'wrap', gap: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚚</div>
          <div style={{ fontWeight: 800, fontSize: 20, display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            Kingpin
            <span style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '-2px' }}>Logistics</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Welcome, Customer</span>
          <Link href="/login" className="btn btn-secondary btn-sm">Sign Out</Link>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>My Logistics Portal</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>Track your shipments, view history, and manage your account.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>
          
          {/* Track a package section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="glass-card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🔍</span> Track a Shipment
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Enter your Tracking Number below to instantly locate your cargo.
                </p>
                
                <form onSubmit={handleTrack}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. LGX-2024-XXXX" 
                      value={trackingNumber} 
                      onChange={(e) => setTrackingNumber(e.target.value)} 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Locating...' : 'Track Now →'}
                  </button>
                </form>
              </div>
            </div>

            {/* Display Shipment Results */}
            {error && (
               <div style={{ padding: 15, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: 'var(--accent-red)', fontSize: 14 }}>
                 ⚠️ {error}
               </div>
            )}

            {shipment && (
              <div className="glass-card" style={{ padding: 24, border: '1px solid rgba(59,130,246,0.4)', animation: 'fadeInUp 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Shipment Details</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className={`badge badge-${shipment.status}`}>{shipment.status.replace('_', ' ')}</span>
                    <span className="badge" style={{ 
                      background: shipment.priority === 'Urgent' ? 'rgba(239,68,68,0.15)' : shipment.priority === 'Express' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)', 
                      color: shipment.priority === 'Urgent' ? 'var(--accent-red)' : shipment.priority === 'Express' ? 'var(--accent-orange)' : 'var(--accent-blue)',
                      border: `1px solid ${shipment.priority === 'Urgent' ? 'rgba(239,68,68,0.3)' : shipment.priority === 'Express' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'}`
                    }}>
                      {shipment.priority || 'Standard'}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Tracking #</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{shipment.trackingNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Route</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{shipment.origin} → {shipment.destination}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Est. Delivery</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{shipment.estimatedDelivery}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Carrier</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{shipment.carrier}</span>
                  </div>
                </div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Delivery Progress</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{shipment.progress}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${shipment.progress}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions & Recent Orders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {/* Request Pickup */}
              <div className="glass-card" style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                 <div style={{ fontSize: 24, marginBottom: 8 }}>📦</div>
                 <div style={{ fontSize: 15, fontWeight: 600 }}>Request Pickup</div>
                 <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Schedule a home or warehouse pickup online.</div>
              </div>

              {/* Cost Calculator */}
              <div className="glass-card" style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                 <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
                 <div style={{ fontSize: 15, fontWeight: 600 }}>Get an Estimate</div>
                 <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Calculate shipping costs and check ETAs.</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 24 }}>
               <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>My Recent Shipments</h3>
               <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>No recent shipments found for your account.</p>
               <button className="btn btn-secondary btn-sm">View All History</button>
            </div>

            {/* Feedback Widget */}
            <div className="glass-card" style={{ padding: 24, borderColor: 'rgba(59,130,246,0.3)' }}>
               <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>💬 Support & Feedback</h3>
               <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Help us improve! Send your feedback directly to the administration.</p>
               <textarea className="input-field" placeholder="Type your feedback..." rows={3} style={{ width: '100%', marginBottom: 12, resize: 'none' }}></textarea>
               <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Feedback submitted!')}>Submit Feedback</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
