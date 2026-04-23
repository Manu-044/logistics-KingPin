'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { href: '/shipments', icon: '📦', label: 'Shipments', badge: '6' },
  { href: '/warehouses', icon: '🏭', label: 'Warehouses' },
  { href: '/tracking', icon: '📡', label: 'Live Tracking' },
  { href: '/simulation', icon: '🗺️', label: 'Route Simulation' },
  { href: '/ai', icon: '✦', label: 'AI Insights', badge: 'NEW' },
];

const secondaryItems = [
  { href: '/admin', icon: '⚙️', label: 'Admin Panel' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🚚</div>
        <div className="sidebar-logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          Kingpin
          <span style={{ fontSize: '12px', fontWeight: 600, marginTop: '-2px' }}>Logistics</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main</div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}

        <div className="nav-section-label" style={{ marginTop: 16 }}>Account</div>
        {secondaryItems.map((item) => (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">AN</div>
          <div>
            <div className="user-name">Arjun Nair</div>
            <div className="user-role">Admin</div>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 18 }}>⋯</span>
        </div>
      </div>
    </aside>
  );
}
