'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Dashboard/Sidebar';

export interface WarehouseData {
  id: string;
  name: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  capacityItems: number;
  currentStorage: number;
  lat: number;
  lng: number;
  productsHeld: { name: string; quantity: number; storageChargePerUnit: number }[];
}

const mockWarehouses: WarehouseData[] = [
  { id: 'W-01', name: 'West Coast MegaHub', city: 'Mumbai', address: 'Plot 42, Nhava Sheva Port Tech Park, Mumbai 400707', manager: 'Anil Desai', phone: '+91 98765 11111', capacityItems: 50000, currentStorage: 42500, lat: 19.0760, lng: 72.8777, productsHeld: [{ name: 'Electronics', quantity: 20000, storageChargePerUnit: 45 }, { name: 'Auto Parts', quantity: 22500, storageChargePerUnit: 30 }] },
  { id: 'W-02', name: 'Capital Logistics Center', city: 'Delhi', address: 'Sector 8, Dwarka Freight Corridor, New Delhi 110075', manager: 'Meera Singh', phone: '+91 98765 22222', capacityItems: 35000, currentStorage: 18000, lat: 28.7041, lng: 77.1025, productsHeld: [{ name: 'Textiles', quantity: 18000, storageChargePerUnit: 15 }] },
  { id: 'W-03', name: 'Southern Gateway', city: 'Chennai', address: 'Ennore Port Highway, Block D, Chennai 600057', manager: 'Karthik Raj', phone: '+91 98765 33333', capacityItems: 25000, currentStorage: 23100, lat: 13.0827, lng: 80.2707, productsHeld: [{ name: 'Pharmaceuticals', quantity: 10000, storageChargePerUnit: 120 }, { name: 'Raw Materials', quantity: 13100, storageChargePerUnit: 10 }] },
  { id: 'W-04', name: 'Deccan Regional Hub', city: 'Hyderabad', address: 'Shamshabad Air Freight Sector, Hyderabad 500108', manager: 'Omar Al-Fayed', phone: '+91 98765 44444', capacityItems: 120000, currentStorage: 81000, lat: 17.3850, lng: 78.4867, productsHeld: [{ name: 'Consumer Goods', quantity: 40000, storageChargePerUnit: 25 }, { name: 'IT Equipment', quantity: 41000, storageChargePerUnit: 60 }] },
  { id: 'W-05', name: 'Tech City Depot', city: 'Bangalore', address: 'Electronic City Phase II, Logistics Park, Bangalore 560100', manager: 'Hans Mueller', phone: '+91 98765 55555', capacityItems: 45000, currentStorage: 28000, lat: 12.9716, lng: 77.5946, productsHeld: [{ name: 'Servers & Racks', quantity: 15000, storageChargePerUnit: 150 }, { name: 'Apparel', quantity: 13000, storageChargePerUnit: 12 }] },
];

export default function WarehousesPage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null);

  const getUtilizationColor = (percent: number) => {
    if (percent >= 90) return 'var(--accent-red)';
    if (percent >= 70) return 'var(--accent-orange)';
    return 'var(--accent-green)';
  };

  const IndiaMap = useMemo(() => dynamic(
    () => import('@/components/Map/IndiaMap'),
    { ssr: false, loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div> }
  ), []);

  return (
    <div className="app-layout" style={{ position: 'relative' }}>
      <Sidebar />
      <div className="main-content">
        <header className="topbar" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <div className="topbar-left" style={{ flex: '1 1 300px' }}>
            <h1>Warehouses</h1>
            <p>Monitor storage capacity and logistics hubs across India</p>
          </div>
          <div className="topbar-actions">
            <div style={{ display: 'flex', background: 'rgba(59,130,246,0.1)', borderRadius: 8, padding: 4, border: '1px solid rgba(59,130,246,0.3)' }}>
              <button 
                onClick={() => setViewMode('map')} 
                style={{ padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, background: viewMode === 'map' ? 'var(--accent-blue)' : 'transparent', color: viewMode === 'map' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                🗺️ Map View
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                style={{ padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, background: viewMode === 'list' ? 'var(--accent-blue)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                📋 List View
              </button>
            </div>
          </div>
        </header>

        <main className="page-content">
          {viewMode === 'map' ? (
            <div className="glass-card" style={{ height: 'calc(100vh - 180px)', position: 'relative', padding: '10px' }}>
              <IndiaMap warehouses={mockWarehouses} onWarehouseClick={setSelectedWarehouse} getUtilizationColor={getUtilizationColor} />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {mockWarehouses.map((w) => {
                const util = Math.round((w.currentStorage / w.capacityItems) * 100);
                const color = getUtilizationColor(util);
                return (
                  <div key={w.id} className="glass-card" style={{ padding: 24, cursor: 'pointer', transition: 'all 0.2s', borderTop: `4px solid ${color}` }} onClick={() => setSelectedWarehouse(w)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{w.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 {w.city}</div>
                      </div>
                      <span className="badge" style={{ background: `${color}20`, color: color }}>{util}% Full</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                       <div><strong>Capacity:</strong> {w.currentStorage.toLocaleString()} / {w.capacityItems.toLocaleString()} unts</div>
                       <div><strong>Manager:</strong> {w.manager}</div>
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>View Full Details →</button>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* BIG CARD MODAL ON CLICK */}
      {selectedWarehouse && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1000,
          background: 'rgba(5, 11, 24, 0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }} onClick={() => setSelectedWarehouse(null)}>
          <div className="glass-card" onClick={e => e.stopPropagation()} style={{ 
            width: '100%', maxWidth: 550, padding: 32, animation: 'fadeInUp 0.3s ease',
            borderTop: `6px solid ${getUtilizationColor(Math.round((selectedWarehouse.currentStorage / selectedWarehouse.capacityItems) * 100))}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>{selectedWarehouse.name}</h2>
                <span style={{ fontSize: 14, color: 'var(--accent-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  🏢 Hub {selectedWarehouse.id}
                </span>
              </div>
              <button onClick={() => setSelectedWarehouse(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>

            {/* Storage Progress Section */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 12 }}>Storage Capacity Overview</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{selectedWarehouse.currentStorage.toLocaleString()} units</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-muted)' }}>{selectedWarehouse.capacityItems.toLocaleString()} Max</span>
              </div>
              <div className="progress-bar" style={{ height: 12, borderRadius: 6, marginBottom: 8, background: 'rgba(255,255,255,0.05)' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${Math.round((selectedWarehouse.currentStorage / selectedWarehouse.capacityItems) * 100)}%`, 
                    background: getUtilizationColor(Math.round((selectedWarehouse.currentStorage / selectedWarehouse.capacityItems) * 100)),
                    borderRadius: 6 
                  }} 
                />
              </div>
              <div style={{ fontSize: 13, color: getUtilizationColor(Math.round((selectedWarehouse.currentStorage / selectedWarehouse.capacityItems) * 100)), fontWeight: 600, textAlign: 'right' }}>
                {Math.round((selectedWarehouse.currentStorage / selectedWarehouse.capacityItems) * 100)}% Utilized
              </div>
            </div>

            {/* Details Grid */}
            <div className="layout-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
               <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Facility Manager</div>
                  <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>👤 {selectedWarehouse.manager}</div>
               </div>
               <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Contact Phone</div>
                  <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>📞 {selectedWarehouse.phone}</div>
               </div>
               <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Physical Address</div>
                  <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ marginTop: 2 }}>📍</span> {selectedWarehouse.address}
                  </div>
               </div>
            </div>

            {/* Holdings & Charges */}
            <div style={{ marginTop: 24, padding: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 12 }}>Products Held & Charges</div>
              <table style={{ width: '100%', fontSize: 14, textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ paddingBottom: 8 }}>Product</th>
                    <th style={{ paddingBottom: 8 }}>Quantity</th>
                    <th style={{ paddingBottom: 8 }}>Charge/Unit</th>
                    <th style={{ paddingBottom: 8, textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWarehouse.productsHeld.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px 0', fontWeight: 500 }}>{p.name}</td>
                      <td style={{ padding: '8px 0' }}>{p.quantity.toLocaleString()}</td>
                      <td style={{ padding: '8px 0' }}>₹{p.storageChargePerUnit}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: 'var(--accent-purple)' }}>₹{(p.quantity * p.storageChargePerUnit).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ paddingTop: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Total Monthly Holding Charges</td>
                    <td style={{ paddingTop: 12, textAlign: 'right', fontWeight: 800, fontSize: 18, color: 'var(--accent-red)' }}>₹{selectedWarehouse.productsHeld.reduce((s, p) => s + p.quantity * p.storageChargePerUnit, 0).toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
               <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => alert('Routing request to ' + selectedWarehouse.name)}>➕ Route Shipment Here</button>
               <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelectedWarehouse(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
