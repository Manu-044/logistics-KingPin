'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import Link from 'next/link';
import { ShipmentStatus } from '@/types';

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Pending', value: 'pending' },
  { label: 'Delayed', value: 'delayed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'newest' | 'eta'>('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shipments')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setShipments(data);
        setLoading(false);
      })
      .catch((e) => {
         console.error(e);
         setLoading(false);
      });
  }, []);

  const filtered = shipments.filter((s) => {
    const matchStatus = filter === 'all' || s.status === filter;
    const srch = search.toLowerCase();
    const matchSearch = !search || 
      s.trackingNumber?.toLowerCase().includes(srch) || 
      s.customer?.toLowerCase().includes(srch) || 
      s.destination?.toLowerCase().includes(srch);
    return matchStatus && matchSearch;
  });

  if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'eta') {
    filtered.sort((a, b) => new Date(a.estimatedDelivery).getTime() - new Date(b.estimatedDelivery).getTime());
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>Shipments</h1>
            <p>Manage and monitor all your shipments</p>
          </div>
          <div className="topbar-actions">
            <Link href="/shipments/create" className="btn btn-primary">+ New Shipment</Link>
          </div>
        </header>

        <main className="page-content">
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Total', value: shipments.length, color: 'var(--accent-blue)' },
              { label: 'In Transit', value: shipments.filter(s => s.status === 'in_transit').length, color: 'var(--accent-blue)' },
              { label: 'Delivered', value: shipments.filter(s => s.status === 'delivered').length, color: 'var(--accent-green)' },
              { label: 'Delayed', value: shipments.filter(s => s.status === 'delayed').length, color: 'var(--accent-orange)' },
            ].map((item) => (
              <div key={item.label} className="glass-card" style={{ padding: '14px 22px', flex: 1, minWidth: 120, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                className="input-field"
                style={{ maxWidth: 220 }}
                placeholder="🔍  Search by tracking #..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select 
                className="input-field" 
                style={{ maxWidth: 140 }} 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="default">Sort by: Default</option>
                <option value="newest">Sort by: Newest</option>
                <option value="eta">Sort by: ETA</option>
              </select>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {statusFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)' }}>
                {filtered.length} shipment{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Route</th>
                    <th>Customer</th>
                    <th>Carrier</th>
                    <th>Weight</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>ETA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                        Loading shipments...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
                        No shipments found
                      </td>
                    </tr>
                  ) : filtered.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <span style={{ fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 600, fontSize: 13 }}>
                          {s.trackingNumber}
                        </span>
                      </td>
                      <td style={{ fontSize: 13 }}>
                        <div style={{ fontWeight: 500 }}>{s.origin}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>→ {s.destination}</div>
                      </td>
                      <td style={{ fontSize: 13 }}>{s.customer}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.carrier}</td>
                      <td style={{ fontSize: 13 }}>{s.weight} kg</td>
                      <td><span className={`badge badge-${s.status}`}>{s.status.replace('_', ' ')}</span></td>
                      <td style={{ width: 110 }}>
                        <div className="progress-bar" style={{ marginBottom: 3 }}>
                          <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.progress}%</span>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.estimatedDelivery}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Link href={`/tracking?id=${s.trackingNumber}`} className="btn btn-secondary btn-sm">Track</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
