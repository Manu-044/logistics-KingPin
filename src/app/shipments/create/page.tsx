'use client';
import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { useRouter } from 'next/navigation';

export default function CreateShipmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    origin: '', destination: '', customer: '', carrier: '', weight: '', description: '', priority: 'standard',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setSubmitted(true);
      setTimeout(() => router.push('/shipments'), 2000);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>Create Shipment</h1>
            <p>Fill in the details to dispatch a new shipment</p>
          </div>
        </header>

        <main className="page-content">
          {submitted ? (
            <div className="glass-card" style={{ padding: 60, textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Shipment Created!</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Your shipment has been dispatched. Redirecting to shipments list…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="glass-card" style={{ padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  🗺️ Route Information
                </h2>
                <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="origin">Origin City</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">📍</span>
                      <input id="origin" className="input-field" placeholder="e.g. Mumbai, India" value={form.origin} onChange={update('origin')} required />
                    </div>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="destination">Destination City</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">🏁</span>
                      <input id="destination" className="input-field" placeholder="e.g. Dubai, UAE" value={form.destination} onChange={update('destination')} required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  📦 Cargo Details
                </h2>
                <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="customer">Customer Name</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">👤</span>
                      <input id="customer" className="input-field" placeholder="Full name" value={form.customer} onChange={update('customer')} required />
                    </div>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="weight">Weight (kg)</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">⚖️</span>
                      <input id="weight" type="number" className="input-field" placeholder="e.g. 450" value={form.weight} onChange={update('weight')} required />
                    </div>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="carrier">Carrier</label>
                    <select id="carrier" className="input-field" value={form.carrier} onChange={update('carrier')} required>
                      <option value="">Select carrier</option>
                      <option>AirFreight Express</option>
                      <option>SeaLink Global</option>
                      <option>SkyRoute Cargo</option>
                      <option>TransOcean Freight</option>
                      <option>PacificRoute</option>
                      <option>Railway Cargo</option>
                      <option>National TruckingCo</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="priority">Priority</label>
                    <select id="priority" className="input-field" value={form.priority} onChange={update('priority')}>
                      <option value="standard">Standard</option>
                      <option value="express">Express</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ margin: '16px 0 0' }}>
                  <label className="form-label" htmlFor="description">Description (Optional)</label>
                  <textarea id="description" className="input-field" placeholder="Describe the cargo contents..." rows={3} value={form.description} onChange={update('description')}
                    style={{ resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Dispatching...' : '🚀 Dispatch Shipment'}
                </button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => router.back()}>Cancel</button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
