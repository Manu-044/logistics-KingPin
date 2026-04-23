'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { mockShipments } from '@/lib/data';

const cityCoords: { [key: string]: { left: number; top: number } } = {
  Mumbai: { left: 16.5, top: 61.4 },
  Delhi: { left: 31.1, top: 29.6 },
  Ahmedabad: { left: 15.5, top: 48.2 },
  Chennai: { left: 41.6, top: 81.4 },
  Kolkata: { left: 69.0, top: 49.7 },
  Bangalore: { left: 32.5, top: 81.7 },
  Pune: { left: 19.8, top: 63.2 },
  Hubballi: { left: 24.1, top: 73.8 },
  Jaipur: { left: 26.3, top: 35.3 },
  Gurugram: { left: 30.5, top: 30.1 },
  Guwahati: { left: 80.4, top: 37.8 },
  Siliguri: { left: 69.2, top: 35.9 },
  Hyderabad: { left: 35.5, top: 67.0 },
  Kochi: { left: 28.0, top: 91.9 },
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get('id');

  const [query, setQuery] = useState(idFromQuery || 'LGX-2024-001');
  const [selected, setSelected] = useState(
    mockShipments.find(s => s.trackingNumber === idFromQuery) || mockShipments[0]
  );

  useEffect(() => {
    if (idFromQuery) {
      const found = mockShipments.find(s => s.trackingNumber === idFromQuery);
      if (found) {
        setSelected(found);
        setQuery(found.trackingNumber);
      }
    }
  }, [idFromQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockShipments.find(s => s.trackingNumber.toLowerCase() === query.toLowerCase());
    if (found) setSelected(found);
  };

  const originCity = selected.origin.split(',')[0];
  const currentCity = selected.currentLocation.split(',')[0];
  const destCity = selected.destination.split(',')[0];

  const originPos = cityCoords[originCity] || { left: 20, top: 50 };
  const currentPos = currentCity === 'Cancelled' ? originPos : (cityCoords[currentCity] || { left: 50, top: 50 });
  const destPos = cityCoords[destCity] || { left: 80, top: 50 };

  const calcLine = (p1: {left: number, top: number}, p2: {left: number, top: number}) => {
    const l = Math.sqrt(Math.pow(p2.left - p1.left, 2) + Math.pow(p2.top - p1.top, 2));
    const a = Math.atan2(p2.top - p1.top, p2.left - p1.left) * (180 / Math.PI);
    return { left: `${p1.left}%`, top: `${p1.top}%`, width: `${l}%`, transform: `rotate(${a}deg)`, position: 'absolute' as any, height: 2, transformOrigin: '0 50%', background: 'var(--accent-blue)', boxShadow: '0 0 8px var(--accent-blue)' };
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>Live Tracking</h1>
            <p>Real-time shipment location monitoring across India</p>
          </div>
          <div className="topbar-actions">
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
              <input className="input-field" placeholder="Enter tracking number..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: 240 }} id="tracking-search" />
              <button type="submit" className="btn btn-primary btn-sm">Track</button>
            </form>
          </div>
        </header>

        <main className="page-content">
          <div className="layout-grid-sidebar" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
            {/* Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="glass-card" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '100%', maxWidth: 450, position: 'relative', aspectRatio: '0.983', backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/4/41/India_location_map.svg")', backgroundSize: '100% 100%', opacity: 0.15, filter: 'invert(1) hue-rotate(180deg)' }} />
                
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 450, position: 'relative', aspectRatio: '0.983' }}>
                    {/* Origin */}
                    <div className="map-dot" style={{ left: `${originPos.left}%`, top: `${originPos.top}%`, background: 'var(--accent-green)', boxShadow: '0 0 12px var(--accent-green)' }} />
                    <span style={{ position: 'absolute', left: `${originPos.left}%`, top: `calc(${originPos.top}% + 12px)`, transform: 'translateX(-50%)', fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, whiteSpace: 'nowrap' }}>{originCity}</span>

                    {/* Destination */}
                    <div className="map-dot" style={{ left: `${destPos.left}%`, top: `${destPos.top}%`, background: 'rgba(255,255,255,0.4)', boxShadow: 'none' }} />
                    <span style={{ position: 'absolute', left: `${destPos.left}%`, top: `calc(${destPos.top}% + 12px)`, transform: 'translateX(-50%)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>{destCity}</span>

                    {/* Current */}
                    {currentCity !== 'Cancelled' && (
                      <>
                        <div className="map-dot" style={{ left: `${currentPos.left}%`, top: `${currentPos.top}%`, background: 'var(--accent-blue)', boxShadow: '0 0 12px var(--accent-blue)' }} />
                        <span style={{ position: 'absolute', left: `${currentPos.left}%`, top: `calc(${currentPos.top}% - 22px)`, transform: 'translateX(-50%)', fontSize: 11, color: 'var(--accent-blue)', fontWeight: 600, whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 4 }}>{currentCity} ← Here</span>
                      </>
                    )}

                    {/* Route line */}
                    {currentCity !== 'Cancelled' && currentCity !== originCity && (
                      <div style={calcLine(originPos, currentPos)} />
                    )}
                    {currentCity !== 'Cancelled' && (
                      <div style={{ ...calcLine(currentPos, destPos), background: 'rgba(255,255,255,0.2)', boxShadow: 'none', borderTop: '2px dashed rgba(255,255,255,0.4)', height: 0 }} />
                    )}
                  </div>
                </div>

                <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(5,11,24,0.8)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', fontSize: 12 }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: 6 }}>●</span> Live India Route — Updated 1 min ago
                </div>
              </div>

              {/* Shipment Details */}
              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Tracking Number</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: 'var(--accent-blue)' }}>{selected.trackingNumber}</div>
                  </div>
                  <span className={`badge badge-${selected.status}`}>{selected.status.replace('_', ' ')}</span>
                </div>

                <div className="stats-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[
                    { label: 'Origin', value: selected.origin },
                    { label: 'Destination', value: selected.destination },
                    { label: 'Current Location', value: selected.currentLocation },
                    { label: 'Carrier', value: selected.carrier },
                    { label: 'Weight', value: `${selected.weight} kg` },
                    { label: 'ETA', value: selected.estimatedDelivery },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Delivery Progress</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{selected.progress}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${selected.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* All shipments list */}
              <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Active Shipments</div>
                {mockShipments.filter(s => s.status !== 'cancelled').map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelected(s)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 8,
                      marginBottom: 6,
                      cursor: 'pointer',
                      background: selected.id === s.id ? 'rgba(59,130,246,0.12)' : 'transparent',
                      border: `1px solid ${selected.id === s.id ? 'rgba(59,130,246,0.3)' : 'transparent'}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>{s.trackingNumber}</span>
                      <span className={`badge badge-${s.status}`} style={{ fontSize: 10, padding: '2px 7px' }}>{s.status.replace('_', ' ')}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{s.origin} → {s.destination}</div>
                    <div className="progress-bar" style={{ marginTop: 6 }}>
                      <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Route Timeline */}
              <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Route Timeline</div>
                <div className="timeline">
                  {[
                    { city: selected.origin.split(',')[0], country: selected.origin.split(',')[1] || '', timestamp: 'Started', status: 'completed' },
                    { city: selected.currentLocation.split(',')[0] === 'Cancelled' ? 'Cancelled' : selected.currentLocation.split(',')[0], country: selected.currentLocation.split(',')[1] || '', timestamp: 'Current', status: 'current' },
                    { city: selected.destination.split(',')[0], country: selected.destination.split(',')[1] || '', timestamp: 'ETA: ' + selected.estimatedDelivery, status: 'upcoming' },
                  ].map((stop, i, arr) => (
                    <div key={stop.city + i} className="timeline-item">
                      <div className="timeline-dot-col">
                        <div className={`timeline-dot ${stop.status}`} />
                        {i < arr.length - 1 && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-content">
                        <div className="city">{stop.city}</div>
                        <div className="country">{stop.country}</div>
                        <div className="ts">{stop.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading Tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
